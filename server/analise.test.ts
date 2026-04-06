import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  obterPedidosPorPeriodo,
  obterClientesMaisAtivos,
  obterModelosMaisSolicitados,
  obterStatusPedidos,
  obterResumoGeral,
  obterReceitaPorPeriodo,
} from "./db";

describe("Análise de Dados - Dashboard", () => {
  describe("obterResumoGeral", () => {
    it("deve retornar um objeto com propriedades de resumo", async () => {
      const resultado = await obterResumoGeral();

      expect(resultado).toBeDefined();
      expect(resultado).toHaveProperty("totalPedidos");
      expect(resultado).toHaveProperty("totalClientes");
      expect(resultado).toHaveProperty("pedidosFinalizados");
      expect(resultado).toHaveProperty("pedidosPendentes");
    });

    it("deve retornar números válidos", async () => {
      const resultado = await obterResumoGeral();

      expect(typeof resultado.totalPedidos).toBe("number");
      expect(typeof resultado.totalClientes).toBe("number");
      expect(typeof resultado.pedidosFinalizados).toBe("number");
      expect(typeof resultado.pedidosPendentes).toBe("number");

      expect(resultado.totalPedidos).toBeGreaterThanOrEqual(0);
      expect(resultado.totalClientes).toBeGreaterThanOrEqual(0);
      expect(resultado.pedidosFinalizados).toBeGreaterThanOrEqual(0);
      expect(resultado.pedidosPendentes).toBeGreaterThanOrEqual(0);
    });

    it("pedidosFinalizados + pedidosPendentes deve ser <= totalPedidos", async () => {
      const resultado = await obterResumoGeral();
      const soma = resultado.pedidosFinalizados + resultado.pedidosPendentes;
      expect(soma).toBeLessThanOrEqual(resultado.totalPedidos);
    });
  });

  describe("obterStatusPedidos", () => {
    it("deve retornar um array", async () => {
      const resultado = await obterStatusPedidos();
      expect(Array.isArray(resultado)).toBe(true);
    });

    it("cada item deve ter status e total", async () => {
      const resultado = await obterStatusPedidos();

      if (resultado.length > 0) {
        resultado.forEach((item: any) => {
          expect(item).toHaveProperty("status");
          expect(item).toHaveProperty("total");
          expect(typeof item.total).toBe("number");
          expect(item.total).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });

  describe("obterClientesMaisAtivos", () => {
    it("deve retornar um array", async () => {
      const resultado = await obterClientesMaisAtivos(10);
      expect(Array.isArray(resultado)).toBe(true);
    });

    it("deve respeitar o limite", async () => {
      const resultado = await obterClientesMaisAtivos(5);
      expect(resultado.length).toBeLessThanOrEqual(5);
    });

    it("cada cliente deve ter id, nome e totalPedidos", async () => {
      const resultado = await obterClientesMaisAtivos(10);

      if (resultado.length > 0) {
        resultado.forEach((item: any) => {
          expect(item).toHaveProperty("clienteId");
          expect(item).toHaveProperty("nomeCliente");
          expect(item).toHaveProperty("totalPedidos");
          expect(typeof item.totalPedidos).toBe("number");
        });
      }
    });
  });

  describe("obterModelosMaisSolicitados", () => {
    it("deve retornar um array", async () => {
      const resultado = await obterModelosMaisSolicitados(10);
      expect(Array.isArray(resultado)).toBe(true);
    });

    it("deve respeitar o limite", async () => {
      const resultado = await obterModelosMaisSolicitados(5);
      expect(resultado.length).toBeLessThanOrEqual(5);
    });

    it("cada modelo deve ter id, modelo01, modelo02 e totalSolicitacoes", async () => {
      const resultado = await obterModelosMaisSolicitados(10);

      if (resultado.length > 0) {
        resultado.forEach((item: any) => {
          expect(item).toHaveProperty("cartuchodId");
          expect(item).toHaveProperty("modelo01");
          expect(item).toHaveProperty("modelo02");
          expect(item).toHaveProperty("totalSolicitacoes");
          expect(typeof item.totalSolicitacoes).toBe("number");
        });
      }
    });
  });




});
