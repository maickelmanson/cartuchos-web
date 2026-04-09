import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  listarCartuchos, criarCartucho, atualizarCartucho, deletarCartucho,
  buscarCartuchoPorId,
  listarClientes, buscarCliente, criarCliente, atualizarCliente, deletarCliente,
  listarPedidos, buscarPedido, listarPedidosPorCliente, obterProximoNumeroPedido, criarPedido, finalizarPedido, deletarPedido, duplicarPedido,
  listarCartuchosDoPedido, adicionarCartucho, atualizarCartuchodoPedido, removerCartuchodoPedido,
  buscaAvancada,
  obterProximoNumeroRemanOrder, listarRemanOrders, buscarRemanOrder, criarRemanOrder, atualizarRemanOrder, deletarRemanOrder,
  listarRemanOrderItems, criarRemanOrderItem, atualizarRemanOrderItem, deletarRemanOrderItem,
  listarRemanOrderUnits, criarRemanOrderUnit, atualizarRemanOrderUnit, deletarRemanOrderUnit,
  obterRelatorioRemanOrder,
  obterDadosEmpresa, salvarDadosEmpresa,
  gerarRemanAPartirDoPedido,
  obterPedidosPorPeriodo, obterClientesMaisAtivos, obterModelosMaisSolicitados, obterStatusPedidos, obterReceitaPorPeriodo, obterResumoGeral,
} from "./db";
import { obterResumoErros, obterEstatisticasErros, obterErrosNaoResolvidos, obterErrosRecentes, marcarErroResolvido } from "./errorLogs";
import { getDb } from "./db";
import { clientes } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================================
  // Dados da Empresa
  // ============================================================
  empresa: router({
    obter: protectedProcedure.query(async () => {
      return obterDadosEmpresa();
    }),

    salvar: protectedProcedure
      .input(z.object({
        empresa: z.string().optional(),
        cep: z.string().optional(),
        endereco: z.string().optional(),
        numero: z.string().optional(),
        bairro: z.string().optional(),
        cidade: z.string().optional(),
        estado: z.string().optional(),
        cnpjCpf: z.string().optional(),
        telefone: z.string().optional(),
        celular: z.string().optional(),
        email: z.string().optional(),
        nome: z.string().optional(),
        logoUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await salvarDadosEmpresa(input);
        return obterDadosEmpresa();
      }),
  }),

  // ============================================================
  // Cartuchos Cadastro (tabela unificada)
  // ============================================================
  cartuchos: router({
    listar: protectedProcedure.query(async () => {
      return listarCartuchos();
    }),

    buscar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return buscarCartuchoPorId(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        modelo01: z.string().min(1),
        modelo02: z.string().min(1),
        priceFinalCustomer: z.string().optional(),
        priceReseller: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return criarCartucho({
          modelo01: input.modelo01,
          modelo02: input.modelo02,
          priceFinalCustomer: input.priceFinalCustomer && input.priceFinalCustomer.trim() !== '' ? input.priceFinalCustomer : null,
          priceReseller: input.priceReseller && input.priceReseller.trim() !== '' ? input.priceReseller : null,
        });
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        modelo01: z.string().min(1),
        modelo02: z.string().min(1),
        priceFinalCustomer: z.string().optional(),
        priceReseller: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return atualizarCartucho(input.id, {
          modelo01: input.modelo01,
          modelo02: input.modelo02,
          priceFinalCustomer: input.priceFinalCustomer && input.priceFinalCustomer.trim() !== '' ? input.priceFinalCustomer : null,
          priceReseller: input.priceReseller && input.priceReseller.trim() !== '' ? input.priceReseller : null,
        });
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarCartucho(input);
      }),
  }),

  // ============================================================
  // Clientes
  // ============================================================
  clientes: router({
    listar: protectedProcedure.query(async () => {
      return listarClientes();
    }),

    buscar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return buscarCliente(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        nome: z.string().min(1),
        telefone: z.string().optional(),
        telefone2: z.string().optional(),
        endereco: z.string().optional(),
        cpf: z.string().optional(),
        cnpj: z.string().optional(),
        inscricaoEstadual: z.string().optional(),
        commercialProfile: z.enum(["CLIENTE_FINAL", "REVENDA"]).optional().default("CLIENTE_FINAL"),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Validar duplicidade: mesmo nome
        const db = await getDb();
        if (db && input.nome) {
          const existente = await db.select().from(clientes)
            .where(eq(clientes.nome, input.nome))
            .limit(1);
          if (existente.length > 0) {
            throw new Error(`Cliente com nome "${input.nome}" já existe no sistema.`);
          }
        }
        return criarCliente(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        nome: z.string().min(1),
        telefone: z.string().optional(),
        telefone2: z.string().optional(),
        endereco: z.string().optional(),
        cpf: z.string().optional(),
        cnpj: z.string().optional(),
        inscricaoEstadual: z.string().optional(),
        commercialProfile: z.enum(["CLIENTE_FINAL", "REVENDA"]).optional(),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return atualizarCliente(id, data);
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarCliente(input);
      }),
  }),

  // ============================================================
  // Pedidos
  // ============================================================
  pedidos: router({
    listar: protectedProcedure.query(async () => {
      return listarPedidos();
    }),

    buscar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return buscarPedido(input);
      }),

    porCliente: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return listarPedidosPorCliente(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        clienteId: z.number(),
        cartuchos: z.array(z.object({
          cartuchodId: z.string().optional(),
          codigo: z.string(),
          pesoCheagada: z.string().optional(),
          pesoSaida: z.string().optional(),
          protegido: z.boolean().optional(),
          observacoes: z.string().optional(),
        })).optional(),
      }))
      .mutation(async ({ input }) => {
        const numero = await obterProximoNumeroPedido();
        const pedido = await criarPedido({
          numero,
          clienteId: input.clienteId,
        });
        
        // Salvar cartuchos do pedido se fornecidos
        if (input.cartuchos && input.cartuchos.length > 0 && pedido.id) {
          for (const cartucho of input.cartuchos) {
            await adicionarCartucho({
              pedidoId: pedido.id,
              cartuchodId: cartucho.cartuchodId ? parseInt(cartucho.cartuchodId) : undefined,
              codigo: cartucho.codigo,
              pesoCheagada: cartucho.pesoCheagada,
              pesoSaida: cartucho.pesoSaida,
              protegido: cartucho.protegido ? 1 : 0,
              observacoes: cartucho.observacoes,
            });
          }
        }
        
        return pedido;
      }),

    finalizar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        // 1. Finalizar o pedido normal
        await finalizarPedido(input);
        // 2. Gerar automaticamente o pedido de remanufatura
        const result = await gerarRemanAPartirDoPedido(input);
        return { success: true, remanOrderId: result.remanOrderId, orderNumber: result.orderNumber };
      }),

    reabrir: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { pedidos: pedidosTable } = await import("../drizzle/schema");
        return db.update(pedidosTable).set({ status: "aberto", dataFinalizacao: null }).where(eq(pedidosTable.id, input));
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarPedido(input);
      }),

    duplicar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const numero = await obterProximoNumeroPedido();
        return duplicarPedido(input, numero);
      }),
  }),

  // ============================================================
  // Pedido Cartuchos
  // ============================================================
  pedidoCartuchos: router({
    listar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return listarCartuchosDoPedido(input);
      }),

    adicionar: protectedProcedure
      .input(z.object({
        pedidoId: z.number(),
        cartuchodId: z.number().nullable(),
        codigo: z.string().optional(),
        pesoCheagada: z.number().optional(),
        pesoSaida: z.number().optional(),
        protegido: z.boolean().default(false),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return adicionarCartucho({
          pedidoId: input.pedidoId,
          cartuchodId: input.cartuchodId,
          codigo: input.codigo,
          pesoCheagada: input.pesoCheagada ? input.pesoCheagada.toString() : undefined,
          pesoSaida: input.pesoSaida ? input.pesoSaida.toString() : undefined,
          protegido: input.protegido ? 1 : 0,
          observacoes: input.observacoes,
        });
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        cartuchodId: z.number().nullable(),
        codigo: z.string().optional(),
        pesoCheagada: z.number().optional(),
        pesoSaida: z.number().optional(),
        protegido: z.boolean().default(false),
        observacoes: z.string().optional(),
        status: z.enum(["em_espera", "em_andamento", "processo", "funcionando", "circuito_queimado", "defeito_cabeca"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return atualizarCartuchodoPedido(id, {
          cartuchodId: data.cartuchodId,
          codigo: data.codigo,
          pesoCheagada: data.pesoCheagada ? data.pesoCheagada.toString() : undefined,
          pesoSaida: data.pesoSaida ? data.pesoSaida.toString() : undefined,
          protegido: data.protegido ? 1 : 0,
          observacoes: data.observacoes,
          status: data.status,
        });
      }),

    remover: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return removerCartuchodoPedido(input);
      }),
  }),

  // ============================================================
  // Busca Avançada
  // ============================================================
  busca: router({
    avancada: protectedProcedure
      .input(z.object({
        tipo: z.enum(["geral", "codigo", "cliente", "telefone", "cpf", "cnpj", "pedido"]),
        termo: z.string(),
      }))
      .query(async ({ input }) => {
        return buscaAvancada(input.tipo, input.termo);
      }),
  }),

  // ============================================================
  // Módulo de Remanufatura - Pedidos Reman
  // ============================================================
  remanOrders: router({
    listar: protectedProcedure.query(async () => {
      return listarRemanOrders();
    }),

    buscar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return buscarRemanOrder(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        clienteId: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Buscar o cliente para copiar o commercialProfile
        const clienteResult = await db
          .select({ commercialProfile: clientes.commercialProfile })
          .from(clientes)
          .where(eq(clientes.id, input.clienteId))
          .limit(1);

        if (clienteResult.length === 0) throw new Error("Cliente não encontrado");
        const commercialProfileSnapshot = clienteResult[0].commercialProfile;

        const orderNumber = await obterProximoNumeroRemanOrder();
        const result = await criarRemanOrder({
          orderNumber,
          clienteId: input.clienteId,
          commercialProfileSnapshot,
          notes: input.notes,
        });
        return result;
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["aberto", "em_processamento", "finalizado", "cancelado"]).optional(),
        discount: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        // Se discount foi alterado, recalcular total
        if (data.discount !== undefined) {
          const db = await getDb();
          if (!db) throw new Error("Database not available");
          const order = await buscarRemanOrder(id);
          if (order) {
            const subtotal = parseFloat(order.subtotal || "0");
            const discount = parseFloat(data.discount || "0");
            const total = Math.max(0, subtotal - discount).toFixed(2);
            await atualizarRemanOrder(id, { ...data, total });
            return buscarRemanOrder(id);
          }
        }
        return atualizarRemanOrder(id, data);
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarRemanOrder(input);
      }),

    reabrir: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { remanOrders: remanOrdersTable } = await import("../drizzle/schema");
        await db.update(remanOrdersTable).set({ status: "aberto" }).where(eq(remanOrdersTable.id, input));
        return buscarRemanOrder(input);
      }),

    relatorio: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return obterRelatorioRemanOrder(input);
      }),
  }),

  // ============================================================
  // Módulo de Remanufatura - Itens do Pedido
  // ============================================================
  remanOrderItems: router({
    listar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return listarRemanOrderItems(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        orderId: z.number(),
        cartuchoId: z.number(),
        quantity: z.number().min(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Buscar o pedido para saber o perfil comercial
        const order = await buscarRemanOrder(input.orderId);
        if (!order) throw new Error("Pedido não encontrado");

        // Buscar o modelo de cartucho na tabela unificada
        const modelo = await buscarCartuchoPorId(input.cartuchoId);
        if (!modelo) throw new Error("Modelo de cartucho não encontrado");

        // Determinar preço baseado no perfil comercial
        const priceSource = order.commercialProfileSnapshot === "REVENDA" ? "REVENDA" : "CLIENTE_FINAL";
        const unitPrice = priceSource === "REVENDA"
          ? (modelo.priceReseller || "0")
          : (modelo.priceFinalCustomer || "0");

        const lineTotal = (parseFloat(unitPrice) * input.quantity).toFixed(2);

        await criarRemanOrderItem({
          orderId: input.orderId,
          cartuchoId: input.cartuchoId,
          descriptionSnapshot: modelo.modelo01,
          modelCodeSnapshot: modelo.modelo02,
          quantity: input.quantity,
          unitPrice,
          priceSource,
          lineTotal,
        });

        return listarRemanOrderItems(input.orderId);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        orderId: z.number(),
        quantity: z.number().min(1),
        unitPrice: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Buscar item atual
        const items = await listarRemanOrderItems(input.orderId);
        const item = items.find(i => i.id === input.id);
        if (!item) throw new Error("Item não encontrado");

        const unitPrice = input.unitPrice || item.unitPrice;
        const lineTotal = (parseFloat(unitPrice) * input.quantity).toFixed(2);

        await atualizarRemanOrderItem(input.id, {
          quantity: input.quantity,
          unitPrice,
          lineTotal,
        });

        return listarRemanOrderItems(input.orderId);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
        orderId: z.number(),
      }))
      .mutation(async ({ input }) => {
        await deletarRemanOrderItem(input.id);
        return listarRemanOrderItems(input.orderId);
      }),
  }),

  // ============================================================
  // Módulo de Remanufatura - Unidades Físicas
  // ============================================================
  remanOrderUnits: router({
    listar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return listarRemanOrderUnits(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        orderItemId: z.number(),
        cartuchoId: z.number(),
        unitCode: z.string().min(1),
        status: z.enum(["FUNCIONANDO", "COM_PROBLEMA"]),
        defectType: z.string().optional(),
        outputWeight: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Validações condicionais
        if (input.status === "FUNCIONANDO" && !input.outputWeight) {
          throw new Error("Peso de saída é obrigatório para cartuchos FUNCIONANDO");
        }
        if (input.status === "COM_PROBLEMA" && !input.defectType) {
          throw new Error("Tipo de defeito é obrigatório para cartuchos COM_PROBLEMA");
        }

        return criarRemanOrderUnit({
          orderItemId: input.orderItemId,
          cartuchoId: input.cartuchoId,
          unitCode: input.unitCode,
          status: input.status,
          defectType: input.defectType,
          outputWeight: input.outputWeight,
          notes: input.notes,
        });
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        unitCode: z.string().min(1).optional(),
        status: z.enum(["FUNCIONANDO", "COM_PROBLEMA"]).optional(),
        defectType: z.string().optional(),
        outputWeight: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;

        // Validações condicionais
        if (data.status === "FUNCIONANDO" && !data.outputWeight) {
          throw new Error("Peso de saída é obrigatório para cartuchos FUNCIONANDO");
        }
        if (data.status === "COM_PROBLEMA" && !data.defectType) {
          throw new Error("Tipo de defeito é obrigatório para cartuchos COM_PROBLEMA");
        }

        return atualizarRemanOrderUnit(id, data);
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarRemanOrderUnit(input);
      }),
  }),

  analise: router({
    pedidosPorPeriodo: protectedProcedure
      .input(z.object({
        dataInicio: z.date(),
        dataFim: z.date(),
      }))
      .query(async ({ input }) => {
        return obterPedidosPorPeriodo(input.dataInicio, input.dataFim);
      }),

    clientesMaisAtivos: protectedProcedure
      .input(z.object({
        limite: z.number().default(10),
      }))
      .query(async ({ input }) => {
        return obterClientesMaisAtivos(input.limite);
      }),

    modelosMaisSolicitados: protectedProcedure
      .input(z.object({
        limite: z.number().default(10),
      }))
      .query(async ({ input }) => {
        return obterModelosMaisSolicitados(input.limite);
      }),

    statusPedidos: protectedProcedure
      .query(async () => {
        return obterStatusPedidos();
      }),

    receitaPorPeriodo: protectedProcedure
      .input(z.object({
        dataInicio: z.date(),
        dataFim: z.date(),
      }))
      .query(async ({ input }) => {
        return obterReceitaPorPeriodo(input.dataInicio, input.dataFim);
      }),

    resumoGeral: protectedProcedure
      .query(async () => {
        return obterResumoGeral();
      }),
  }),

  // ============================================================
  // Rastreamento de Erros
  // ============================================================
  erros: router({
    obterResumo: protectedProcedure
      .query(async () => {
        return obterResumoErros();
      }),

    obterEstatisticas: protectedProcedure
      .query(async () => {
        return obterEstatisticasErros();
      }),

    obterNaoResolvidos: protectedProcedure
      .query(async () => {
        return obterErrosNaoResolvidos();
      }),

    obterRecentes: protectedProcedure
      .input(z.object({
        limite: z.number().default(50),
      }))
      .query(async ({ input }) => {
        return obterErrosRecentes(input.limite);
      }),

    marcarResolvido: protectedProcedure
      .input(z.object({
        erroId: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return marcarErroResolvido(input.erroId, ctx.user.id, input.notes);
      }),
  }),
});
