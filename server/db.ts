import { eq, desc, like, or, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, cartuchodCadastro, clientes, pedidos, pedidoCartuchos, InsertCartuchodCadastro, InsertCliente, InsertPedido, InsertPedidoCartucho, remanOrders, remanOrderItems, remanOrderUnits, InsertRemanOrder, InsertRemanOrderItem, InsertRemanOrderUnit, empresaDados, InsertEmpresaDados } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================
// Dados da Empresa
// ============================================================
export async function obterDadosEmpresa() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(empresaDados).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function salvarDadosEmpresa(data: Partial<InsertEmpresaDados>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(empresaDados).limit(1);
  if (existing.length > 0) {
    return db.update(empresaDados).set(data).where(eq(empresaDados.id, existing[0].id));
  } else {
    return db.insert(empresaDados).values(data as InsertEmpresaDados);
  }
}

// ============================================================
// Cartuchos Cadastro
// ============================================================
export async function listarCartuchos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartuchodCadastro).orderBy(cartuchodCadastro.modelo01);
}

export async function criarCartucho(data: InsertCartuchodCadastro) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(cartuchodCadastro).values(data);
  return result;
}

export async function atualizarCartucho(id: number, data: Partial<InsertCartuchodCadastro>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(cartuchodCadastro).set(data).where(eq(cartuchodCadastro.id, id));
}

export async function deletarCartucho(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(cartuchodCadastro).where(eq(cartuchodCadastro.id, id));
}

// ============================================================
// Clientes
// ============================================================
export async function listarClientes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clientes).orderBy(clientes.nome);
}

export async function buscarCliente(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(clientes).where(eq(clientes.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function criarCliente(data: InsertCliente) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(clientes).values(data);
  return result;
}

export async function atualizarCliente(id: number, data: Partial<InsertCliente>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(clientes).set(data).where(eq(clientes.id, id));
}

export async function deletarCliente(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Deletar pedidos vinculados primeiro
  await db.delete(pedidoCartuchos).where(
    eq(pedidoCartuchos.pedidoId, 
      db.select({ id: pedidos.id }).from(pedidos).where(eq(pedidos.clienteId, id))
    )
  );
  await db.delete(pedidos).where(eq(pedidos.clienteId, id));
  return db.delete(clientes).where(eq(clientes.id, id));
}

// ============================================================
// Pedidos
// ============================================================
export async function listarPedidos() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: pedidos.id,
    numero: pedidos.numero,
    clienteId: pedidos.clienteId,
    clienteNome: clientes.nome,
    status: pedidos.status,
    dataCriacao: pedidos.dataCriacao,
    dataFinalizacao: pedidos.dataFinalizacao,
  })
    .from(pedidos)
    .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
    .orderBy(desc(pedidos.id));
}

export async function buscarPedido(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select({
    id: pedidos.id,
    numero: pedidos.numero,
    clienteId: pedidos.clienteId,
    clienteNome: clientes.nome,
    status: pedidos.status,
    dataCriacao: pedidos.dataCriacao,
    dataFinalizacao: pedidos.dataFinalizacao,
  })
    .from(pedidos)
    .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
    .where(eq(pedidos.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function listarPedidosPorCliente(clienteId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: pedidos.id,
    numero: pedidos.numero,
    clienteId: pedidos.clienteId,
    clienteNome: clientes.nome,
    status: pedidos.status,
    dataCriacao: pedidos.dataCriacao,
    dataFinalizacao: pedidos.dataFinalizacao,
  })
    .from(pedidos)
    .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
    .where(eq(pedidos.clienteId, clienteId))
    .orderBy(desc(pedidos.id));
}

export async function obterProximoNumeroPedido() {
  const db = await getDb();
  if (!db) return "001";
  const result = await db.select({ numero: pedidos.numero }).from(pedidos).orderBy(desc(pedidos.id)).limit(1);
  if (result.length === 0) return "001";
  const ultimoNumero = parseInt(result[0].numero) || 0;
  return String(ultimoNumero + 1).padStart(3, "0");
}

export async function criarPedido(data: InsertPedido) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pedidos).values(data);
  // Busca o pedido criado
  const [novoPedido] = await db.select().from(pedidos).where(eq(pedidos.numero, data.numero)).limit(1);
  return novoPedido;
}

export async function finalizarPedido(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(pedidos).set({ status: "finalizado", dataFinalizacao: new Date() }).where(eq(pedidos.id, id));
}

export async function deletarPedido(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(pedidoCartuchos).where(eq(pedidoCartuchos.pedidoId, id));
  return db.delete(pedidos).where(eq(pedidos.id, id));
}

// ============================================================
// Pedido Cartuchos
// ============================================================
export async function listarCartuchosDoPedido(pedidoId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: pedidoCartuchos.id,
    pedidoId: pedidoCartuchos.pedidoId,
    cartuchodId: pedidoCartuchos.cartuchodId,
    codigo: pedidoCartuchos.codigo,
    pesoCheagada: pedidoCartuchos.pesoCheagada,
    pesoSaida: pedidoCartuchos.pesoSaida,
    protegido: pedidoCartuchos.protegido,
    status: pedidoCartuchos.status,
    observacoes: pedidoCartuchos.observacoes,
    dataInclusao: pedidoCartuchos.dataInclusao,
    modelo01: cartuchodCadastro.modelo01,
    modelo02: cartuchodCadastro.modelo02,
  })
    .from(pedidoCartuchos)
    .leftJoin(cartuchodCadastro, eq(pedidoCartuchos.cartuchodId, cartuchodCadastro.id))
    .where(eq(pedidoCartuchos.pedidoId, pedidoId))
    .orderBy(pedidoCartuchos.dataInclusao);
}

export async function adicionarCartucho(data: InsertPedidoCartucho) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pedidoCartuchos).values(data);
  return result;
}

export async function atualizarCartuchodoPedido(id: number, data: Partial<InsertPedidoCartucho>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(pedidoCartuchos).set(data).where(eq(pedidoCartuchos.id, id));
}

export async function removerCartuchodoPedido(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(pedidoCartuchos).where(eq(pedidoCartuchos.id, id));
}

// ============================================================
// Busca Avançada
// ============================================================
export async function buscaAvancada(tipo: string, termo: string) {
  const db = await getDb();
  if (!db) return { pedidos: [], cartuchos: [] };
  
  // Case-insensitive + accent-insensitive search
  // Remove acentos do termo de busca para comparação
  const termoNorm = termo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const likeTermoPattern = `%${termoNorm}%`;
  // Função auxiliar para busca sem acento no MySQL (usando COLLATE)
  const unaccent = (col: any) => sql`CONVERT(${col} USING utf8mb4) COLLATE utf8mb4_general_ci`;

  if (tipo === "codigo") {
    const cartuchos = await db.select({
      id: pedidoCartuchos.id,
      codigo: pedidoCartuchos.codigo,
      modelo01: cartuchodCadastro.modelo01,
      modelo02: cartuchodCadastro.modelo02,
      pedidoNumero: pedidos.numero,
      clienteNome: clientes.nome,
      dataInclusao: pedidoCartuchos.dataInclusao,
      pedidoId: pedidoCartuchos.pedidoId,
    })
      .from(pedidoCartuchos)
      .leftJoin(cartuchodCadastro, eq(pedidoCartuchos.cartuchodId, cartuchodCadastro.id))
      .leftJoin(pedidos, eq(pedidoCartuchos.pedidoId, pedidos.id))
      .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
      .where(like(unaccent(pedidoCartuchos.codigo), likeTermoPattern))
      .orderBy(desc(pedidoCartuchos.dataInclusao));
    return { pedidos: [], cartuchos };
  }

  if (tipo === "cliente") {
    const pedidosList = await db.select({
      id: pedidos.id,
      numero: pedidos.numero,
      clienteId: pedidos.clienteId,
      clienteNome: clientes.nome,
      status: pedidos.status,
      dataCriacao: pedidos.dataCriacao,
      dataFinalizacao: pedidos.dataFinalizacao,
    })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
      .where(like(unaccent(clientes.nome), likeTermoPattern))
      .orderBy(desc(pedidos.id));
    return { pedidos: pedidosList, cartuchos: [] };
  }

  if (tipo === "telefone") {
    const pedidosList = await db.select({
      id: pedidos.id,
      numero: pedidos.numero,
      clienteId: pedidos.clienteId,
      clienteNome: clientes.nome,
      telefone: clientes.telefone,
      status: pedidos.status,
      dataCriacao: pedidos.dataCriacao,
      dataFinalizacao: pedidos.dataFinalizacao,
    })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
      .where(like(unaccent(clientes.telefone), likeTermoPattern))
      .orderBy(desc(pedidos.id));
    return { pedidos: pedidosList, cartuchos: [] };
  }

  if (tipo === "cpf") {
    const pedidosList = await db.select({
      id: pedidos.id,
      numero: pedidos.numero,
      clienteId: pedidos.clienteId,
      clienteNome: clientes.nome,
      cpf: clientes.cpf,
      status: pedidos.status,
      dataCriacao: pedidos.dataCriacao,
      dataFinalizacao: pedidos.dataFinalizacao,
    })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
      .where(like(clientes.cpf, likeTermoPattern))
      .orderBy(desc(pedidos.id));
    return { pedidos: pedidosList, cartuchos: [] };
  }

  if (tipo === "cnpj") {
    const pedidosList = await db.select({
      id: pedidos.id,
      numero: pedidos.numero,
      clienteId: pedidos.clienteId,
      clienteNome: clientes.nome,
      cnpj: clientes.cnpj,
      status: pedidos.status,
      dataCriacao: pedidos.dataCriacao,
      dataFinalizacao: pedidos.dataFinalizacao,
    })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
      .where(like(clientes.cnpj, likeTermoPattern))
      .orderBy(desc(pedidos.id));
    return { pedidos: pedidosList, cartuchos: [] };
  }

  if (tipo === "pedido") {
    const pedidosList = await db.select({
      id: pedidos.id,
      numero: pedidos.numero,
      clienteId: pedidos.clienteId,
      clienteNome: clientes.nome,
      status: pedidos.status,
      dataCriacao: pedidos.dataCriacao,
      dataFinalizacao: pedidos.dataFinalizacao,
    })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
      .where(like(pedidos.numero, likeTermoPattern))
      .orderBy(desc(pedidos.id));
    return { pedidos: pedidosList, cartuchos: [] };
  }

  // Busca geral
  const pedidosList = await db.select({
    id: pedidos.id,
    numero: pedidos.numero,
    clienteId: pedidos.clienteId,
    clienteNome: clientes.nome,
    status: pedidos.status,
    dataCriacao: pedidos.dataCriacao,
    dataFinalizacao: pedidos.dataFinalizacao,
  })
    .from(pedidos)
    .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
    .where(or(
      like(clientes.nome, likeTermoPattern),
      like(clientes.telefone, likeTermoPattern),
      like(clientes.cpf, likeTermoPattern),
      like(clientes.cnpj, likeTermoPattern),
      like(pedidos.numero, likeTermoPattern)
    ))
    .orderBy(desc(pedidos.id));

  const cartuchosList = await db.select({
    id: pedidoCartuchos.id,
    codigo: pedidoCartuchos.codigo,
    modelo01: cartuchodCadastro.modelo01,
    modelo02: cartuchodCadastro.modelo02,
    pedidoNumero: pedidos.numero,
    clienteNome: clientes.nome,
    dataInclusao: pedidoCartuchos.dataInclusao,
    pedidoId: pedidoCartuchos.pedidoId,
  })
    .from(pedidoCartuchos)
    .leftJoin(cartuchodCadastro, eq(pedidoCartuchos.cartuchodId, cartuchodCadastro.id))
    .leftJoin(pedidos, eq(pedidoCartuchos.pedidoId, pedidos.id))
    .leftJoin(clientes, eq(pedidos.clienteId, clientes.id))
    .where(or(
      like(pedidoCartuchos.codigo, likeTermoPattern),
      like(cartuchodCadastro.modelo01, likeTermoPattern),
      like(cartuchodCadastro.modelo02, likeTermoPattern)
    ))
    .orderBy(desc(pedidoCartuchos.dataInclusao));

  return { pedidos: pedidosList, cartuchos: cartuchosList };
}

// ============================================================
// Buscar Cartucho por ID (para uso no módulo Reman)
// ============================================================
export async function buscarCartuchoPorId(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(cartuchodCadastro).where(eq(cartuchodCadastro.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ============================================================
// Reman Orders
// ============================================================
export async function obterProximoNumeroRemanOrder() {
  const db = await getDb();
  if (!db) return "REM-001";
  const result = await db.select({ orderNumber: remanOrders.orderNumber }).from(remanOrders).orderBy(desc(remanOrders.id)).limit(1);
  if (result.length === 0) return "REM-001";
  const ultimoNumero = parseInt(result[0].orderNumber.split("-")[1]) || 0;
  return `REM-${String(ultimoNumero + 1).padStart(3, "0")}`;
}

export async function listarRemanOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: remanOrders.id,
    orderNumber: remanOrders.orderNumber,
    clienteId: remanOrders.clienteId,
    clienteNome: clientes.nome,
    commercialProfileSnapshot: remanOrders.commercialProfileSnapshot,
    status: remanOrders.status,
    subtotal: remanOrders.subtotal,
    discount: remanOrders.discount,
    total: remanOrders.total,
    criadoEm: remanOrders.criadoEm,
  })
    .from(remanOrders)
    .leftJoin(clientes, eq(remanOrders.clienteId, clientes.id))
    .orderBy(desc(remanOrders.id));
}

export async function buscarRemanOrder(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select({
    id: remanOrders.id,
    orderNumber: remanOrders.orderNumber,
    clienteId: remanOrders.clienteId,
    clienteNome: clientes.nome,
    commercialProfileSnapshot: remanOrders.commercialProfileSnapshot,
    status: remanOrders.status,
    subtotal: remanOrders.subtotal,
    discount: remanOrders.discount,
    total: remanOrders.total,
    notes: remanOrders.notes,
    criadoEm: remanOrders.criadoEm,
  })
    .from(remanOrders)
    .leftJoin(clientes, eq(remanOrders.clienteId, clientes.id))
    .where(eq(remanOrders.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function criarRemanOrder(data: InsertRemanOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(remanOrders).values(data);
  return result;
}

export async function atualizarRemanOrder(id: number, data: Partial<InsertRemanOrder>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(remanOrders).set(data).where(eq(remanOrders.id, id));
}

export async function deletarRemanOrder(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Deletar unidades primeiro
  const items = await db.select({ id: remanOrderItems.id }).from(remanOrderItems).where(eq(remanOrderItems.orderId, id));
  for (const item of items) {
    await db.delete(remanOrderUnits).where(eq(remanOrderUnits.orderItemId, item.id));
  }
  // Deletar itens
  await db.delete(remanOrderItems).where(eq(remanOrderItems.orderId, id));
  // Deletar pedido
  return db.delete(remanOrders).where(eq(remanOrders.id, id));
}

// ============================================================
// Reman Order Items
// ============================================================
export async function listarRemanOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: remanOrderItems.id,
    orderId: remanOrderItems.orderId,
    cartuchoId: remanOrderItems.cartuchoId,
    descriptionSnapshot: remanOrderItems.descriptionSnapshot,
    modelCodeSnapshot: remanOrderItems.modelCodeSnapshot,
    quantity: remanOrderItems.quantity,
    unitPrice: remanOrderItems.unitPrice,
    priceSource: remanOrderItems.priceSource,
    lineTotal: remanOrderItems.lineTotal,
    criadoEm: remanOrderItems.criadoEm,
  })
    .from(remanOrderItems)
    .where(eq(remanOrderItems.orderId, orderId))
    .orderBy(remanOrderItems.criadoEm);
}

export async function criarRemanOrderItem(data: InsertRemanOrderItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(remanOrderItems).values(data);
  return result;
}

export async function atualizarRemanOrderItem(id: number, data: Partial<InsertRemanOrderItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(remanOrderItems).set(data).where(eq(remanOrderItems.id, id));
}

export async function deletarRemanOrderItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Deletar unidades primeiro
  await db.delete(remanOrderUnits).where(eq(remanOrderUnits.orderItemId, id));
  // Deletar item
  return db.delete(remanOrderItems).where(eq(remanOrderItems.id, id));
}

// ============================================================
// Reman Order Units
// ============================================================
export async function listarRemanOrderUnits(orderItemId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(remanOrderUnits).where(eq(remanOrderUnits.orderItemId, orderItemId)).orderBy(remanOrderUnits.criadoEm);
}

export async function criarRemanOrderUnit(data: InsertRemanOrderUnit) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(remanOrderUnits).values(data);
  return result;
}

export async function atualizarRemanOrderUnit(id: number, data: Partial<InsertRemanOrderUnit>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(remanOrderUnits).set(data).where(eq(remanOrderUnits.id, id));
}

export async function deletarRemanOrderUnit(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(remanOrderUnits).where(eq(remanOrderUnits.id, id));
}

export async function obterRelatorioRemanOrder(orderId: number) {
  const db = await getDb();
  if (!db) return { funcionando: [], comProblema: [] };
  
  const units = await db.select({
    id: remanOrderUnits.id,
    unitCode: remanOrderUnits.unitCode,
    status: remanOrderUnits.status,
    defectType: remanOrderUnits.defectType,
    outputWeight: remanOrderUnits.outputWeight,
    notes: remanOrderUnits.notes,
    modelo02: cartuchodCadastro.modelo02,
  })
    .from(remanOrderUnits)
    .leftJoin(cartuchodCadastro, eq(remanOrderUnits.cartuchoId, cartuchodCadastro.id))
    .leftJoin(remanOrderItems, eq(remanOrderUnits.orderItemId, remanOrderItems.id))
    .where(eq(remanOrderItems.orderId, orderId));

  const funcionando = units.filter(u => u.status === "FUNCIONANDO");
  const comProblema = units.filter(u => u.status === "COM_PROBLEMA");

  return { funcionando, comProblema };
}
