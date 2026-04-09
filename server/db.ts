import { eq, desc, like, or, and, sql, inArray, gte, lte, ne } from "drizzle-orm";
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
    .orderBy(
      // Pedidos abertos ("Aberto") aparecem primeiro
      sql`CASE WHEN ${pedidos.status} = 'Aberto' THEN 0 ELSE 1 END`,
      // Depois ordena por ID descendente (mais recentes primeiro)
      desc(pedidos.id)
    );
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

export async function duplicarPedido(pedidoId: number, novoNumero: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // 1. Buscar o pedido original
  const [pedidoOriginal] = await db.select().from(pedidos).where(eq(pedidos.id, pedidoId)).limit(1);
  if (!pedidoOriginal) throw new Error("Pedido nao encontrado");
  
  // 2. Criar novo pedido com os mesmos dados (exceto ID e numero)
  const novoPedidoData: InsertPedido = {
    numero: novoNumero,
    clienteId: pedidoOriginal.clienteId,
    status: "aberto",
    dataCriacao: new Date(),
    dataFinalizacao: null,
  };
  
  await db.insert(pedidos).values(novoPedidoData);
  
  // 3. Buscar o novo pedido criado
  const [novoPedido] = await db.select().from(pedidos).where(eq(pedidos.numero, novoNumero)).limit(1);
  if (!novoPedido) throw new Error("Falha ao criar novo pedido");
  
  // 4. Buscar todos os cartuchos do pedido original
  const cartuchosOriginais = await db.select({
    cartuchodId: pedidoCartuchos.cartuchodId,
    codigo: pedidoCartuchos.codigo,
    pesoCheagada: pedidoCartuchos.pesoCheagada,
    pesoSaida: pedidoCartuchos.pesoSaida,
    protegido: pedidoCartuchos.protegido,
    observacoes: pedidoCartuchos.observacoes,
  })
    .from(pedidoCartuchos)
    .where(eq(pedidoCartuchos.pedidoId, pedidoId));
  
  // 5. Adicionar os cartuchos ao novo pedido
  for (const cartucho of cartuchosOriginais) {
    await db.insert(pedidoCartuchos).values({
      pedidoId: novoPedido.id,
      cartuchodId: cartucho.cartuchodId,
      codigo: cartucho.codigo,
      pesoCheagada: cartucho.pesoCheagada,
      pesoSaida: cartucho.pesoSaida,
      protegido: cartucho.protegido,
      status: "em_espera",
      observacoes: cartucho.observacoes,
      dataInclusao: new Date(),
    });
  }
  
  return novoPedido;
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
  if (!db) return { pedidos: [], cartuchos: [], clientes: [] };
  
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
    return { pedidos: [], cartuchos, clientes: [] };
  }

  if (tipo === "cliente") {
    const clientesList = await db.select({
      id: clientes.id,
      nome: clientes.nome,
      telefone: clientes.telefone,
      cpf: clientes.cpf,
      cnpj: clientes.cnpj,
      commercialProfile: clientes.commercialProfile,
    })
      .from(clientes)
      .where(like(unaccent(clientes.nome), likeTermoPattern))
      .orderBy(clientes.nome);
    return { pedidos: [], cartuchos: [], clientes: clientesList };
  }

  if (tipo === "telefone") {
    const clientesList = await db.select({
      id: clientes.id,
      nome: clientes.nome,
      telefone: clientes.telefone,
      cpf: clientes.cpf,
      cnpj: clientes.cnpj,
      commercialProfile: clientes.commercialProfile,
    })
      .from(clientes)
      .where(like(unaccent(clientes.telefone), likeTermoPattern))
      .orderBy(clientes.nome);
    return { pedidos: [], cartuchos: [], clientes: clientesList };
  }

  if (tipo === "cpf") {
    const clientesList = await db.select({
      id: clientes.id,
      nome: clientes.nome,
      telefone: clientes.telefone,
      cpf: clientes.cpf,
      cnpj: clientes.cnpj,
      commercialProfile: clientes.commercialProfile,
    })
      .from(clientes)
      .where(like(clientes.cpf, likeTermoPattern))
      .orderBy(clientes.nome);
    return { pedidos: [], cartuchos: [], clientes: clientesList };
  }

  if (tipo === "cnpj") {
    const clientesList = await db.select({
      id: clientes.id,
      nome: clientes.nome,
      telefone: clientes.telefone,
      cpf: clientes.cpf,
      cnpj: clientes.cnpj,
      commercialProfile: clientes.commercialProfile,
    })
      .from(clientes)
      .where(like(clientes.cnpj, likeTermoPattern))
      .orderBy(clientes.nome);
    return { pedidos: [], cartuchos: [], clientes: clientesList };
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
    return { pedidos: pedidosList, cartuchos: [], clientes: [] };
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

  // Busca geral: também buscar clientes diretamente
  const clientesGeralList = await db.select({
    id: clientes.id,
    nome: clientes.nome,
    telefone: clientes.telefone,
    cpf: clientes.cpf,
    cnpj: clientes.cnpj,
    commercialProfile: clientes.commercialProfile,
  })
    .from(clientes)
    .where(or(
      like(unaccent(clientes.nome), likeTermoPattern),
      like(clientes.telefone, likeTermoPattern),
      like(clientes.cpf, likeTermoPattern),
      like(clientes.cnpj, likeTermoPattern)
    ))
    .orderBy(clientes.nome);

  return { pedidos: pedidosList, cartuchos: cartuchosList, clientes: clientesGeralList };
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
    .orderBy(
      // Pedidos abertos ("Aberto") aparecem primeiro
      sql`CASE WHEN ${remanOrders.status} = 'Aberto' THEN 0 ELSE 1 END`,
      // Depois ordena por ID descendente (mais recentes primeiro)
      desc(remanOrders.id)
    );
}

export async function buscarRemanOrder(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select({
    id: remanOrders.id,
    orderNumber: remanOrders.orderNumber,
    clienteId: remanOrders.clienteId,
    clienteNome: clientes.nome,
    clienteEndereco: clientes.endereco,
    clienteTelefone: clientes.telefone,
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
    // modelo01 prioriza descriptionSnapshot (nome completo do cartucho)
    modelo01: remanOrderItems.descriptionSnapshot,
    // modelo02 eh sempre o codigo abreviado
    modelo02: remanOrderItems.modelCodeSnapshot,
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
    modelo01: cartuchodCadastro.modelo01,
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

// ============================================================
// Gerar Pedido Reman a partir do Pedido Normal Finalizado
// ============================================================
export async function gerarRemanAPartirDoPedido(pedidoId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // 1. Buscar o pedido normal e o cliente
  const [pedido] = await db.select({
    id: pedidos.id,
    numero: pedidos.numero,
    clienteId: pedidos.clienteId,
  }).from(pedidos).where(eq(pedidos.id, pedidoId)).limit(1);
  if (!pedido) throw new Error("Pedido não encontrado");

  const [cliente] = await db.select().from(clientes).where(eq(clientes.id, pedido.clienteId)).limit(1);
  if (!cliente) throw new Error("Cliente não encontrado");

  // 2. Verificar se já existe um pedido reman para este pedido normal
  // Procurar na nota do pedido reman que contém o número do pedido normal
  const [existingRemanOrder] = await db.select()
    .from(remanOrders)
    .where(like(remanOrders.notes, `%Pedido #${pedido.numero}%`))
    .limit(1);

  // Se já existe, deletar itens e unidades antigos para recriá-los com dados atualizados
  let remanOrder = existingRemanOrder;
  if (remanOrder) {
    // Deletar unidades antigas
    await db.delete(remanOrderUnits).where(
      inArray(remanOrderUnits.orderItemId,
        db.select({ id: remanOrderItems.id })
          .from(remanOrderItems)
          .where(eq(remanOrderItems.orderId, remanOrder.id))
      )
    );
    // Deletar itens antigos
    await db.delete(remanOrderItems).where(eq(remanOrderItems.orderId, remanOrder.id));
  } else {
    // Criar novo pedido reman usando o número do pedido como base
    // Isso garante que PD001 sempre gera REM-PD001 (mesma numeração)
    const orderNumber = `REM-${pedido.numero}`;
    const profile = cliente.commercialProfile || "CLIENTE_FINAL";

    await db.insert(remanOrders).values({
      orderNumber,
      clienteId: pedido.clienteId,
      commercialProfileSnapshot: profile,
      status: "finalizado",
      subtotal: "0",
      discount: "0",
      total: "0",
      notes: `Gerado automaticamente a partir do Pedido #${pedido.numero}`,
    });

    const [novoRemanOrder] = await db.select().from(remanOrders).where(eq(remanOrders.orderNumber, orderNumber)).limit(1);
    if (!novoRemanOrder) throw new Error("Erro ao criar pedido de remanufatura");
    remanOrder = novoRemanOrder;
  }

  // 2. Buscar todos os cartuchos do pedido com dados do modelo
  const cartuchosDoPedido = await db.select({
    id: pedidoCartuchos.id,
    cartuchodId: pedidoCartuchos.cartuchodId,
    codigo: pedidoCartuchos.codigo,
    pesoSaida: pedidoCartuchos.pesoSaida,
    status: pedidoCartuchos.status,
    modelo01: cartuchodCadastro.modelo01,
    modelo02: cartuchodCadastro.modelo02,
    priceFinalCustomer: cartuchodCadastro.priceFinalCustomer,
    priceReseller: cartuchodCadastro.priceReseller,
  })
    .from(pedidoCartuchos)
    .leftJoin(cartuchodCadastro, eq(pedidoCartuchos.cartuchodId, cartuchodCadastro.id))
    .where(eq(pedidoCartuchos.pedidoId, pedidoId));

  // 3. Separar funcionando vs com defeito
  const funcionando = cartuchosDoPedido.filter(c => c.status === "funcionando");
  const comDefeito = cartuchosDoPedido.filter(c => c.status === "circuito_queimado" || c.status === "defeito_cabeca");

  // 5. Determinar perfil comercial e preço
  const profile = cliente.commercialProfile || "CLIENTE_FINAL";



  // 7. Agrupar cartuchos funcionando por modelo (cartuchodId)
  const modeloMap = new Map<number, {
    cartuchodId: number;
    modelo01: string | null;
    modelo02: string | null;
    priceFinalCustomer: string | null;
    priceReseller: string | null;
    quantidade: number;
    codigos: { codigo: string | null; pesoSaida: string | null }[];
  }>();

  for (const c of funcionando) {
    const key = c.cartuchodId || 0;
    if (!modeloMap.has(key)) {
      modeloMap.set(key, {
        cartuchodId: key,
        modelo01: c.modelo01,
        modelo02: c.modelo02,
        priceFinalCustomer: c.priceFinalCustomer,
        priceReseller: c.priceReseller,
        quantidade: 0,
        codigos: [],
      });
    }
    const entry = modeloMap.get(key)!;
    entry.quantidade++;
    entry.codigos.push({ codigo: c.codigo, pesoSaida: c.pesoSaida });
  }

  // 8. Criar reman_order_items (um por modelo agrupado) e reman_order_units (um por cartucho)
  let subtotal = 0;

  for (const [, grupo] of Array.from(modeloMap)) {
    const unitPrice = profile === "REVENDA"
      ? parseFloat(grupo.priceReseller || "0")
      : parseFloat(grupo.priceFinalCustomer || "0");
    const lineTotal = unitPrice * grupo.quantidade;
    subtotal += lineTotal;

    // Criar o item (linha de produto)
    await db.insert(remanOrderItems).values({
      orderId: remanOrder.id,
      cartuchoId: grupo.cartuchodId,
      modelCodeSnapshot: grupo.modelo01 || "",
      descriptionSnapshot: grupo.modelo02 || grupo.modelo01 || "SEM MODELO",
      quantity: grupo.quantidade,
      unitPrice: String(unitPrice),
      priceSource: profile as "CLIENTE_FINAL" | "REVENDA",
      lineTotal: String(lineTotal),
    });

    // Buscar o item recém-criado para pegar o ID
    const [novoItem] = await db.select({ id: remanOrderItems.id })
      .from(remanOrderItems)
      .where(and(
        eq(remanOrderItems.orderId, remanOrder.id),
        eq(remanOrderItems.cartuchoId, grupo.cartuchodId)
      ))
      .orderBy(desc(remanOrderItems.id))
      .limit(1);

    // Criar unidades individuais (cartuchos funcionando)
    for (const cod of grupo.codigos) {
      await db.insert(remanOrderUnits).values({
        orderItemId: novoItem.id,
        cartuchoId: grupo.cartuchodId,
        unitCode: cod.codigo || "SEM-CODIGO",
        status: "FUNCIONANDO",
        outputWeight: cod.pesoSaida || null,
      });
    }
  }

  // 9. Criar unidades para cartuchos com defeito
  // Precisamos de um item "genérico" para cada modelo com defeito
  const defeitoModeloMap = new Map<number, {
    cartuchodId: number;
    modelo01: string | null;
    modelo02: string | null;
    codigos: { codigo: string | null; status: string }[];
  }>();

  for (const c of comDefeito) {
    const key = c.cartuchodId || 0;
    if (!defeitoModeloMap.has(key)) {
      defeitoModeloMap.set(key, {
        cartuchodId: key,
        modelo01: c.modelo01,
        modelo02: c.modelo02,
        codigos: [],
      });
    }
    const entry = defeitoModeloMap.get(key)!;
    entry.codigos.push({ codigo: c.codigo, status: c.status });
  }

  for (const [, grupo] of Array.from(defeitoModeloMap)) {
    // Verificar se já existe um item para esse modelo (do agrupamento funcionando)
    let [existingItem] = await db.select({ id: remanOrderItems.id })
      .from(remanOrderItems)
      .where(and(
        eq(remanOrderItems.orderId, remanOrder.id),
        eq(remanOrderItems.cartuchoId, grupo.cartuchodId)
      ))
      .limit(1);

    let itemId: number;
    if (existingItem) {
      itemId = existingItem.id;
    } else {
      // Criar item com quantidade 0 e preço 0 (não conta como produto, só para vincular unidades)
      await db.insert(remanOrderItems).values({
        orderId: remanOrder.id,
        cartuchoId: grupo.cartuchodId,
        modelCodeSnapshot: grupo.modelo01 || "",
        descriptionSnapshot: grupo.modelo02 || grupo.modelo01 || "SEM MODELO",
        quantity: 0,
        unitPrice: "0",
        priceSource: profile as "CLIENTE_FINAL" | "REVENDA",
        lineTotal: "0",
      });
      const [novoItem] = await db.select({ id: remanOrderItems.id })
        .from(remanOrderItems)
        .where(and(
          eq(remanOrderItems.orderId, remanOrder.id),
          eq(remanOrderItems.cartuchoId, grupo.cartuchodId)
        ))
        .orderBy(desc(remanOrderItems.id))
        .limit(1);
      itemId = novoItem.id;
    }

    // Criar unidades com defeito
    for (const cod of grupo.codigos) {
      const defectType = cod.status === "circuito_queimado" ? "CIRCUITO QUEIMADO" : "DEFEITO NA CABEÇA";
      await db.insert(remanOrderUnits).values({
        orderItemId: itemId,
        cartuchoId: grupo.cartuchodId,
        unitCode: cod.codigo || "SEM-CODIGO",
        status: "COM_PROBLEMA",
        defectType,
      });
    }
  }

  // 10. Atualizar totais do pedido reman
  await db.update(remanOrders).set({
    subtotal: String(subtotal),
    total: String(subtotal),
  }).where(eq(remanOrders.id, remanOrder.id));

  return { remanOrderId: remanOrder.id, orderNumber: remanOrder.orderNumber };
}


// ============================================================
// Análise de Dados - Dashboard
// ============================================================

export async function obterPedidosPorPeriodo(dataInicio: Date, dataFim: Date) {
  const db = await getDb();
  if (!db) return [];

  try {
    const resultado = await db.select({
      data: sql<string>`DATE(${pedidos.dataCriacao})`,
      total: sql<number>`COUNT(DISTINCT ${pedidos.id})`,
    })
      .from(pedidos)
      .where(and(
        gte(pedidos.dataCriacao, dataInicio),
        lte(pedidos.dataCriacao, dataFim)
      ))
      .groupBy(sql`CAST(DATE(${pedidos.dataCriacao}) AS CHAR)`)
      .orderBy(sql`DATE(${pedidos.dataCriacao})`);

    return resultado as Array<{ data: string; total: number }>;
  } catch (error) {
    console.error('Erro ao obter pedidos por período:', error);
    return [];
  }
}

export async function obterClientesMaisAtivos(limite: number = 10) {
  const db = await getDb();
  if (!db) return [];

  const resultado = await db.select({
    clienteId: clientes.id,
    nomeCliente: clientes.nome,
    totalPedidos: sql<number>`COUNT(DISTINCT ${pedidos.id})`,
  })
    .from(clientes)
    .leftJoin(pedidos, eq(clientes.id, pedidos.clienteId))
    .groupBy(clientes.id, clientes.nome)
    .orderBy(sql<number>`COUNT(DISTINCT ${pedidos.id}) DESC`)
    .limit(limite);

  return resultado;
}

export async function obterModelosMaisSolicitados(limite: number = 10) {
  const db = await getDb();
  if (!db) return [];

  const resultado = await db.select({
    cartuchodId: cartuchodCadastro.id,
    modelo01: cartuchodCadastro.modelo01,
    modelo02: cartuchodCadastro.modelo02,
    totalSolicitacoes: sql<number>`COUNT(${pedidoCartuchos.id})`,
  })
    .from(cartuchodCadastro)
    .leftJoin(pedidoCartuchos, eq(cartuchodCadastro.id, pedidoCartuchos.cartuchodId))
    .groupBy(cartuchodCadastro.id)
    .orderBy(sql<number>`COUNT(${pedidoCartuchos.id}) DESC`)
    .limit(limite);

  return resultado;
}

export async function obterStatusPedidos() {
  const db = await getDb();
  if (!db) return [];

  const resultado = await db.select({
    status: pedidos.status,
    total: sql<number>`COUNT(*)`,
  })
    .from(pedidos)
    .groupBy(pedidos.status);

  return resultado;
}

export async function obterReceitaPorPeriodo(dataInicio: Date, dataFim: Date) {
  const db = await getDb();
  if (!db) return [];

  const resultado = await db.select({
    data: sql<string>`DATE(${pedidos.dataCriacao})`,
    totalPedidos: sql<number>`COUNT(DISTINCT ${pedidos.id})`,
  })
    .from(pedidos)
    .where(and(
      gte(pedidos.dataCriacao, dataInicio),
      lte(pedidos.dataCriacao, dataFim),
      eq(pedidos.status, "finalizado")
    ))
    .groupBy(sql<string>`DATE(${pedidos.dataCriacao})`)
    .orderBy(sql<string>`DATE(${pedidos.dataCriacao})`);

  return resultado;
}

export async function obterResumoGeral() {
  const db = await getDb();
  if (!db) return { totalPedidos: 0, totalClientes: 0, totalReceita: "0", pedidosPendentes: 0 };

  const [totalPedidosResult] = await db.select({ total: sql<number>`COUNT(*)` }).from(pedidos);
  const [totalClientesResult] = await db.select({ total: sql<number>`COUNT(*)` }).from(clientes);
  const [pedidosFinalizadosResult] = await db.select({ 
    total: sql<number>`COUNT(*)` 
  }).from(pedidos).where(eq(pedidos.status, "finalizado"));
  const [pedidosPendentesResult] = await db.select({ 
    total: sql<number>`COUNT(*)` 
  }).from(pedidos).where(ne(pedidos.status, "finalizado"));

  return {
    totalPedidos: totalPedidosResult?.total || 0,
    totalClientes: totalClientesResult?.total || 0,
    pedidosFinalizados: pedidosFinalizadosResult?.total || 0,
    pedidosPendentes: pedidosPendentesResult?.total || 0,
  };
}
