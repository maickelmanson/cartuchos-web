import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
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
import { and, gte, lte, eq } from "drizzle-orm";
import { pedidoCartuchos, clientes } from "../drizzle/schema";
import { obterResumoErros, obterEstatisticasErros, obterErrosNaoResolvidos, obterErrosRecentes, marcarErroResolvido } from "./errorLogs";
import { getDb } from "./db";

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
        telefone: z.string().optional(),
        email: z.string().optional(),
        cnpj: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return salvarDadosEmpresa(input);
      }),
  }),

  // ============================================================
  // Cartuchos
  // ============================================================
  cartuchos: router({
    listar: protectedProcedure.query(async () => {
      return listarCartuchos();
    }),

    buscarPorId: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        return buscarCartuchoPorId(input.id);
      }),

    criar: protectedProcedure
      .input(z.object({
        modelo01: z.string(),
        modelo02: z.string(),
        priceFinalCustomer: z.number().optional(),
        priceReseller: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return criarCartucho(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        modelo01: z.string().optional(),
        modelo02: z.string().optional(),
        priceFinalCustomer: z.number().optional(),
        priceReseller: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return atualizarCartucho(input);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return deletarCartucho(input.id);
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
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        return buscarCliente(input.id);
      }),

    criar: protectedProcedure
      .input(z.object({
        nome: z.string(),
        telefone: z.string().optional(),
        telefone2: z.string().optional(),
        endereco: z.string().optional(),
        cpf: z.string().optional(),
        cnpj: z.string().optional(),
        inscricaoEstadual: z.string().optional(),
        commercialProfile: z.enum(["CLIENTE_FINAL", "REVENDA"]).optional(),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Validar duplicidade
        const clienteExistente = await getDb().query.clientes.findFirst({
          where: (c, { eq, and }) =>
            and(
              eq(c.nome, input.nome),
              input.telefone ? eq(c.telefone, input.telefone) : undefined
            ),
        });

        if (clienteExistente) {
          throw new Error(`Cliente com nome "${input.nome}" e telefone "${input.telefone}" já existe`);
        }

        return criarCliente(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        nome: z.string().optional(),
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
        // Validar duplicidade ao atualizar
        if (input.nome || input.telefone) {
          const clienteExistente = await getDb().query.clientes.findFirst({
            where: (c, { eq, and, ne }) =>
              and(
                ne(c.id, input.id),
                eq(c.nome, input.nome || ''),
                input.telefone ? eq(c.telefone, input.telefone) : undefined
              ),
          });

          if (clienteExistente) {
            throw new Error(`Cliente com nome "${input.nome}" e telefone "${input.telefone}" já existe`);
          }
        }

        return atualizarCliente(input);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return deletarCliente(input.id);
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
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        return buscarPedido(input.id);
      }),

    listarPorCliente: protectedProcedure
      .input(z.object({
        clienteId: z.number(),
      }))
      .query(async ({ input }) => {
        return listarPedidosPorCliente(input.clienteId);
      }),

    obterProximoNumero: protectedProcedure.query(async () => {
      return obterProximoNumeroPedido();
    }),

    criar: protectedProcedure
      .input(z.object({
        numero: z.string(),
        clienteId: z.number(),
        cartuchos: z.array(z.object({
          cartuchodId: z.number(),
          codigo: z.string().optional(),
          pesoCheagada: z.string().optional(),
          pesoSaida: z.string().optional(),
          protegido: z.number().optional(),
          status: z.enum(["em_espera", "em_andamento", "processo", "funcionando", "circuito_queimado", "defeito_cabeca"]).optional(),
          observacoes: z.string().optional(),
        })).optional(),
      }))
      .mutation(async ({ input }) => {
        const pedido = await criarPedido({
          numero: input.numero,
          clienteId: input.clienteId,
        });

        if (input.cartuchos && input.cartuchos.length > 0) {
          for (const cartucho of input.cartuchos) {
            await adicionarCartucho({
              pedidoId: pedido.id,
              ...cartucho,
            });
          }
        }

        return pedido;
      }),

    finalizar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return finalizarPedido(input.id);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return deletarPedido(input.id);
      }),

    duplicar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return duplicarPedido(input.id);
      }),
  }),

  // ============================================================
  // Cartuchos do Pedido
  // ============================================================
  pedidoCartuchos: router({
    listar: protectedProcedure
      .input(z.object({
        pedidoId: z.number(),
      }))
      .query(async ({ input }) => {
        return listarCartuchosDoPedido(input.pedidoId);
      }),

    adicionar: protectedProcedure
      .input(z.object({
        pedidoId: z.number(),
        cartuchodId: z.number(),
        codigo: z.string().optional(),
        pesoCheagada: z.string().optional(),
        pesoSaida: z.string().optional(),
        protegido: z.number().optional(),
        status: z.enum(["em_espera", "em_andamento", "processo", "funcionando", "circuito_queimado", "defeito_cabeca"]).optional(),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return adicionarCartucho(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        pesoCheagada: z.string().optional(),
        pesoSaida: z.string().optional(),
        protegido: z.number().optional(),
        status: z.enum(["em_espera", "em_andamento", "processo", "funcionando", "circuito_queimado", "defeito_cabeca"]).optional(),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return atualizarCartuchodoPedido(input);
      }),

    remover: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return removerCartuchodoPedido(input.id);
      }),
  }),

  // ============================================================
  // Busca Avançada
  // ============================================================
  busca: router({
    avancada: protectedProcedure
      .input(z.object({
        termo: z.string(),
      }))
      .query(async ({ input }) => {
        return buscaAvancada(input.termo);
      }),
  }),

  // ============================================================
  // Reman Orders
  // ============================================================
  remanOrders: router({
    obterProximoNumero: protectedProcedure.query(async () => {
      return obterProximoNumeroRemanOrder();
    }),

    listar: protectedProcedure.query(async () => {
      return listarRemanOrders();
    }),

    buscar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        return buscarRemanOrder(input.id);
      }),

    criar: protectedProcedure
      .input(z.object({
        numero: z.string(),
        clienteId: z.number(),
      }))
      .mutation(async ({ input }) => {
        return criarRemanOrder(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        numero: z.string().optional(),
        clienteId: z.number().optional(),
        status: z.enum(["aberto", "finalizado"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return atualizarRemanOrder(input);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return deletarRemanOrder(input.id);
      }),
  }),

  // ============================================================
  // Reman Order Items
  // ============================================================
  remanOrderItems: router({
    listar: protectedProcedure
      .input(z.object({
        remanOrderId: z.number(),
      }))
      .query(async ({ input }) => {
        return listarRemanOrderItems(input.remanOrderId);
      }),

    criar: protectedProcedure
      .input(z.object({
        remanOrderId: z.number(),
        cartuchodId: z.number(),
        preco: z.number(),
      }))
      .mutation(async ({ input }) => {
        return criarRemanOrderItem(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        preco: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return atualizarRemanOrderItem(input);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return deletarRemanOrderItem(input.id);
      }),
  }),

  // ============================================================
  // Reman Order Units
  // ============================================================
  remanOrderUnits: router({
    listar: protectedProcedure
      .input(z.object({
        remanOrderItemId: z.number(),
      }))
      .query(async ({ input }) => {
        return listarRemanOrderUnits(input.remanOrderItemId);
      }),

    criar: protectedProcedure
      .input(z.object({
        remanOrderItemId: z.number(),
        numeroSerie: z.string(),
        status: z.enum(["funcionando", "defeito"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return criarRemanOrderUnit(input);
      }),

    atualizar: protectedProcedure
      .input(z.object({
        id: z.number(),
        numeroSerie: z.string().optional(),
        status: z.enum(["funcionando", "defeito"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return atualizarRemanOrderUnit(input);
      }),

    deletar: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        return deletarRemanOrderUnit(input.id);
      }),
  }),

  // ============================================================
  // Relatórios
  // ============================================================
  relatorios: router({
    remanOrder: protectedProcedure
      .input(z.object({
        remanOrderId: z.number(),
      }))
      .query(async ({ input }) => {
        return obterRelatorioRemanOrder(input.remanOrderId);
      }),

    pedidosPorPeriodo: protectedProcedure
      .input(z.object({
        dataInicio: z.date(),
        dataFim: z.date(),
      }))
      .query(async ({ input }) => {
        return obterPedidosPorPeriodo(input.dataInicio, input.dataFim);
      }),

    clientesMaisAtivos: protectedProcedure.query(async () => {
      return obterClientesMaisAtivos();
    }),

    modelosMaisSolicitados: protectedProcedure.query(async () => {
      return obterModelosMaisSolicitados();
    }),

    statusPedidos: protectedProcedure.query(async () => {
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

    resumoGeral: protectedProcedure.query(async () => {
      return obterResumoGeral();
    }),
  }),

  // ============================================================
  // Painel de Erros
  // ============================================================
  erros: router({
    obterResumo: protectedProcedure.query(async () => {
      return obterResumoErros();
    }),

    obterEstatisticas: protectedProcedure.query(async () => {
      return obterEstatisticasErros();
    }),

    obterNaoResolvidos: protectedProcedure.query(async () => {
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

  // ============================================================
  // Buscador de Cartuchos por Período (Módulo de Teste)
  // ============================================================
  buscadorCartuchos: router({
    listar: protectedProcedure
      .input(z.object({
        dataInicio: z.date(),
        dataFim: z.date(),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Buscar cartuchos com status 'funcionando' no período
        const result = await db
          .select()
          .from(pedidoCartuchos)
          .where(
            and(
              gte(pedidoCartuchos.dataInclusao, input.dataInicio),
              lte(pedidoCartuchos.dataInclusao, input.dataFim),
              eq(pedidoCartuchos.status, 'funcionando')
            )
          );

        // Buscar dados dos cartuchos
        const cartuchosComDetalhes = await Promise.all(
          result.map(async (pc: any) => {
            const cartucho = await buscarCartuchoPorId(pc.cartuchoId);
            return {
              id: pc.id,
              modelo01: cartucho?.modelo01 ?? 'N/A',
              modelo02: cartucho?.modelo02 ?? 'N/A',
              preco: parseFloat((cartucho?.priceFinalCustomer ?? '0').toString()),
              dataFuncionando: pc.dataInclusao,
              status: pc.status,
            };
          })
        );

        const valorTotal = cartuchosComDetalhes.reduce((sum: number, c: any) => sum + (c.preco ?? 0), 0);

        return {
          cartuchos: cartuchosComDetalhes,
          quantidade: cartuchosComDetalhes.length,
          valorTotal,
          dataInicio: input.dataInicio,
          dataFim: input.dataFim,
        };
      }),
  }),

  analise: router({
    resumoGeral: protectedProcedure.query(async () => {
      return await obterResumoGeral();
    }),

    pedidosPorPeriodo: protectedProcedure
      .input(z.object({
        dataInicio: z.date(),
        dataFim: z.date(),
      }))
      .query(async ({ input }) => {
        return await obterPedidosPorPeriodo(input.dataInicio, input.dataFim);
      }),

    clientesMaisAtivos: protectedProcedure.query(async () => {
      return await obterClientesMaisAtivos();
    }),

    modelosMaisSolicitados: protectedProcedure.query(async () => {
      return await obterModelosMaisSolicitados();
    }),

    statusPedidos: protectedProcedure.query(async () => {
      return await obterStatusPedidos();
    }),
  }),
});

export type AppRouter = typeof appRouter;
