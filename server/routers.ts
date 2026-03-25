import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  listarCartuchos, criarCartucho, atualizarCartucho, deletarCartucho,
  listarClientes, buscarCliente, criarCliente, atualizarCliente, deletarCliente,
  listarPedidos, buscarPedido, listarPedidosPorCliente, obterProximoNumeroPedido, criarPedido, finalizarPedido, deletarPedido,
  listarCartuchosDoPedido, adicionarCartucho, atualizarCartuchodoPedido, removerCartuchodoPedido,
  buscaAvancada,
  listarModelosCartucho, buscarModeloCartucho, criarModeloCartucho, atualizarModeloCartucho, deletarModeloCartucho,
  obterProximoNumeroRemanOrder, listarRemanOrders, buscarRemanOrder, criarRemanOrder, atualizarRemanOrder, deletarRemanOrder,
  listarRemanOrderItems, criarRemanOrderItem, atualizarRemanOrderItem, deletarRemanOrderItem,
  listarRemanOrderUnits, criarRemanOrderUnit, atualizarRemanOrderUnit, deletarRemanOrderUnit,
  obterRelatorioRemanOrder,
} from "./db";
import { getDb } from "./db";
import { clientes, remanOrders, remanOrderItems, cartridgeModels } from "../drizzle/schema";
import { eq, sum } from "drizzle-orm";

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
  // Cartuchos Cadastro
  // ============================================================
  cartuchos: router({
    listar: protectedProcedure.query(async () => {
      return listarCartuchos();
    }),

    criar: protectedProcedure
      .input(z.object({
        modelo01: z.string().min(1),
        modelo02: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return criarCartucho({
          modelo01: input.modelo01,
          modelo02: input.modelo02,
        });
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        modelo01: z.string().min(1),
        modelo02: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return atualizarCartucho(input.id, {
          modelo01: input.modelo01,
          modelo02: input.modelo02,
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
        endereco: z.string().optional(),
        cpf: z.string().optional(),
        cnpj: z.string().optional(),
        inscricaoEstadual: z.string().optional(),
        commercialProfile: z.enum(["CLIENTE_FINAL", "REVENDA"]).optional().default("CLIENTE_FINAL"),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return criarCliente(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        nome: z.string().min(1),
        telefone: z.string().optional(),
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
      }))
      .mutation(async ({ input }) => {
        const numero = await obterProximoNumeroPedido();
        return criarPedido({
          numero,
          clienteId: input.clienteId,
        });
      }),

    finalizar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return finalizarPedido(input);
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarPedido(input);
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
  // Módulo de Remanufatura - Modelos de Cartucho
  // ============================================================
  cartridgeModels: router({
    listar: protectedProcedure.query(async () => {
      return listarModelosCartucho();
    }),

    buscar: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return buscarModeloCartucho(input);
      }),

    criar: protectedProcedure
      .input(z.object({
        brand: z.string().min(1),
        modelCode: z.string().min(1),
        description: z.string().optional(),
        color: z.string().optional(),
        priceFinalCustomer: z.string().min(1),
        priceReseller: z.string().min(1),
        costPrice: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return criarModeloCartucho({
          brand: input.brand,
          modelCode: input.modelCode,
          description: input.description,
          color: input.color,
          priceFinalCustomer: input.priceFinalCustomer,
          priceReseller: input.priceReseller,
          costPrice: input.costPrice,
          notes: input.notes,
          active: 1,
        });
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        brand: z.string().min(1),
        modelCode: z.string().min(1),
        description: z.string().optional(),
        color: z.string().optional(),
        priceFinalCustomer: z.string().min(1),
        priceReseller: z.string().min(1),
        costPrice: z.string().optional(),
        notes: z.string().optional(),
        active: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return atualizarModeloCartucho(id, data);
      }),

    deletar: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return deletarModeloCartucho(input);
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
        cartridgeModelId: z.number(),
        quantity: z.number().min(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Buscar o pedido para saber o perfil comercial
        const order = await buscarRemanOrder(input.orderId);
        if (!order) throw new Error("Pedido não encontrado");

        // Buscar o modelo de cartucho
        const modelo = await buscarModeloCartucho(input.cartridgeModelId);
        if (!modelo) throw new Error("Modelo de cartucho não encontrado");

        // Determinar preço baseado no perfil comercial
        const priceSource = order.commercialProfileSnapshot === "REVENDA" ? "REVENDA" : "CLIENTE_FINAL";
        const unitPrice = priceSource === "REVENDA"
          ? modelo.priceReseller
          : modelo.priceFinalCustomer;

        const lineTotal = (parseFloat(unitPrice) * input.quantity).toFixed(2);

        await criarRemanOrderItem({
          orderId: input.orderId,
          cartridgeModelId: input.cartridgeModelId,
          descriptionSnapshot: modelo.description || modelo.modelCode,
          modelCodeSnapshot: modelo.modelCode,
          quantity: input.quantity,
          unitPrice,
          priceSource,
          lineTotal,
        });

        // Recalcular subtotal e total do pedido
        await recalcularTotaisRemanOrder(input.orderId);

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

        // Recalcular subtotal e total do pedido
        await recalcularTotaisRemanOrder(input.orderId);

        return listarRemanOrderItems(input.orderId);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
        orderId: z.number(),
      }))
      .mutation(async ({ input }) => {
        await deletarRemanOrderItem(input.id);
        await recalcularTotaisRemanOrder(input.orderId);
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
        cartridgeModelId: z.number(),
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
          cartridgeModelId: input.cartridgeModelId,
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
});

// ============================================================
// Helper: Recalcular totais do pedido reman
// ============================================================
async function recalcularTotaisRemanOrder(orderId: number) {
  const db = await getDb();
  if (!db) return;

  const items = await listarRemanOrderItems(orderId);
  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.lineTotal || "0"), 0);

  const order = await buscarRemanOrder(orderId);
  const discount = parseFloat(order?.discount || "0");
  const total = Math.max(0, subtotal - discount);

  await atualizarRemanOrder(orderId, {
    subtotal: subtotal.toFixed(2),
    total: total.toFixed(2),
  });
}

export type AppRouter = typeof appRouter;
