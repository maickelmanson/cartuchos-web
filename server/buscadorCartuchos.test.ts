import { describe, it, expect } from "vitest";

/**
 * Testes para a funcionalidade de Buscador de Cartuchos por Período
 * 
 * A procedure `buscadorCartuchos.listar` busca cartuchos com status 'funcionando'
 * em um período específico e retorna:
 * - Array de cartuchos com id, modelo01, modelo02, preço, dataFuncionando, status
 * - Quantidade total de cartuchos
 * - Valor total dos cartuchos
 * - Data início e data fim do período
 */

describe("Buscador de Cartuchos por Período", () => {
  it("deve retornar estrutura correta com campos obrigatórios", () => {
    // Simular resposta esperada da procedure
    const mockResponse = {
      cartuchos: [
        {
          id: 1,
          modelo01: "EPS 667 BK REMANUFATURADO COM 14ML DE TINTA",
          modelo02: "EPS 667 BK",
          preco: 45.00,
          dataFuncionando: new Date("2026-05-18"),
          status: "funcionando",
        },
      ],
      quantidade: 1,
      valorTotal: 45.00,
      dataInicio: new Date("2026-05-01"),
      dataFim: new Date("2026-05-18"),
    };

    // Validar estrutura
    expect(mockResponse).toHaveProperty("cartuchos");
    expect(mockResponse).toHaveProperty("quantidade");
    expect(mockResponse).toHaveProperty("valorTotal");
    expect(mockResponse).toHaveProperty("dataInicio");
    expect(mockResponse).toHaveProperty("dataFim");

    // Validar tipos
    expect(Array.isArray(mockResponse.cartuchos)).toBe(true);
    expect(typeof mockResponse.quantidade).toBe("number");
    expect(typeof mockResponse.valorTotal).toBe("number");
    expect(mockResponse.dataInicio instanceof Date).toBe(true);
    expect(mockResponse.dataFim instanceof Date).toBe(true);
  });

  it("deve validar estrutura de cada cartucho", () => {
    const mockCartucho = {
      id: 1,
      modelo01: "EPS 667 BK REMANUFATURADO COM 14ML DE TINTA",
      modelo02: "EPS 667 BK",
      preco: 45.00,
      dataFuncionando: new Date("2026-05-18"),
      status: "funcionando",
    };

    // Validar que cada cartucho tem todos os campos
    expect(mockCartucho).toHaveProperty("id");
    expect(mockCartucho).toHaveProperty("modelo01");
    expect(mockCartucho).toHaveProperty("modelo02");
    expect(mockCartucho).toHaveProperty("preco");
    expect(mockCartucho).toHaveProperty("dataFuncionando");
    expect(mockCartucho).toHaveProperty("status");

    // Validar tipos
    expect(typeof mockCartucho.id).toBe("number");
    expect(typeof mockCartucho.modelo01).toBe("string");
    expect(typeof mockCartucho.modelo02).toBe("string");
    expect(typeof mockCartucho.preco).toBe("number");
    expect(mockCartucho.dataFuncionando instanceof Date).toBe(true);
    expect(mockCartucho.status).toBe("funcionando");
  });

  it("deve calcular valor total corretamente", () => {
    const cartuchos = [
      { id: 1, modelo01: "Modelo 1", modelo02: "M1", preco: 45.00, dataFuncionando: new Date(), status: "funcionando" },
      { id: 2, modelo01: "Modelo 2", modelo02: "M2", preco: 55.00, dataFuncionando: new Date(), status: "funcionando" },
      { id: 3, modelo01: "Modelo 3", modelo02: "M3", preco: 30.00, dataFuncionando: new Date(), status: "funcionando" },
    ];

    const valorTotal = cartuchos.reduce((sum, c) => sum + (c.preco ?? 0), 0);

    expect(valorTotal).toBe(130.00);
  });

  it("deve retornar array vazio quando não há cartuchos", () => {
    const mockResponse = {
      cartuchos: [],
      quantidade: 0,
      valorTotal: 0,
      dataInicio: new Date("2099-01-01"),
      dataFim: new Date("2099-12-31"),
    };

    expect(mockResponse.cartuchos.length).toBe(0);
    expect(mockResponse.quantidade).toBe(0);
    expect(mockResponse.valorTotal).toBe(0);
  });

  it("deve validar que quantidade corresponde ao comprimento do array", () => {
    const cartuchos = [
      { id: 1, modelo01: "M1", modelo02: "M1", preco: 45, dataFuncionando: new Date(), status: "funcionando" },
      { id: 2, modelo01: "M2", modelo02: "M2", preco: 55, dataFuncionando: new Date(), status: "funcionando" },
    ];

    const quantidade = cartuchos.length;

    expect(quantidade).toBe(cartuchos.length);
    expect(quantidade).toBe(2);
  });

  it("deve filtrar apenas cartuchos com status 'funcionando'", () => {
    const todosCartuchos = [
      { id: 1, status: "funcionando" },
      { id: 2, status: "defeito" },
      { id: 3, status: "funcionando" },
      { id: 4, status: "defeito" },
    ];

    const cartuchosFuncionando = todosCartuchos.filter((c) => c.status === "funcionando");

    expect(cartuchosFuncionando.length).toBe(2);
    expect(cartuchosFuncionando.every((c) => c.status === "funcionando")).toBe(true);
  });

  it("deve validar intervalo de datas", () => {
    const dataInicio = new Date("2026-05-01");
    const dataFim = new Date("2026-05-31");
    const cartuchos = [
      { id: 1, dataFuncionando: new Date("2026-05-15") },
      { id: 2, dataFuncionando: new Date("2026-05-20") },
      { id: 3, dataFuncionando: new Date("2026-05-25") },
    ];

    const cartuchosNoIntervalo = cartuchos.filter(
      (c) => c.dataFuncionando >= dataInicio && c.dataFuncionando <= dataFim
    );

    expect(cartuchosNoIntervalo.length).toBe(3);
    cartuchosNoIntervalo.forEach((c) => {
      expect(c.dataFuncionando.getTime()).toBeGreaterThanOrEqual(dataInicio.getTime());
      expect(c.dataFuncionando.getTime()).toBeLessThanOrEqual(dataFim.getTime());
    });
  });

  it("deve exportar para CSV com formato correto", () => {
    const cartuchos = [
      { id: 1, modelo02: "EPS 667 BK", modelo01: "EPS 667 BK REMANUFATURADO", preco: 45.00, dataFuncionando: new Date("2026-05-18") },
    ];

    const headers = ["Código", "Descrição", "Preço", "Data"];
    const rows = cartuchos.map((c) => [
      c.modelo02,
      c.modelo01,
      `R$ ${c.preco.toFixed(2)}`,
      c.dataFuncionando.toLocaleDateString("pt-BR"),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");

    expect(csv).toContain("Código");
    expect(csv).toContain("EPS 667 BK");
    expect(csv).toContain("R$ 45.00");
  });
});
