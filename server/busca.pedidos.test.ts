import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("busca.avancada", () => {
  it("retorna estrutura com pedidos, cartuchos e clientes para busca geral", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const resultado = await caller.busca.avancada({ tipo: "geral", termo: "teste_inexistente_xyz" });

    expect(resultado).toHaveProperty("pedidos");
    expect(resultado).toHaveProperty("cartuchos");
    expect(resultado).toHaveProperty("clientes");
    expect(Array.isArray(resultado.pedidos)).toBe(true);
    expect(Array.isArray(resultado.cartuchos)).toBe(true);
    expect(Array.isArray(resultado.clientes)).toBe(true);
  });

  it("retorna estrutura com clientes para busca por cliente", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const resultado = await caller.busca.avancada({ tipo: "cliente", termo: "teste_inexistente_xyz" });

    expect(resultado).toHaveProperty("clientes");
    expect(Array.isArray(resultado.clientes)).toBe(true);
    expect(resultado.pedidos).toHaveLength(0);
    expect(resultado.cartuchos).toHaveLength(0);
  });

  it("retorna estrutura com clientes para busca por telefone", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const resultado = await caller.busca.avancada({ tipo: "telefone", termo: "99999" });

    expect(resultado).toHaveProperty("clientes");
    expect(Array.isArray(resultado.clientes)).toBe(true);
  });

  it("retorna estrutura com cartuchos para busca por código", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const resultado = await caller.busca.avancada({ tipo: "codigo", termo: "ABC" });

    expect(resultado).toHaveProperty("cartuchos");
    expect(Array.isArray(resultado.cartuchos)).toBe(true);
    expect(resultado.pedidos).toHaveLength(0);
    expect(resultado.clientes).toHaveLength(0);
  });

  it("retorna estrutura com pedidos para busca por número de pedido", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const resultado = await caller.busca.avancada({ tipo: "pedido", termo: "PD" });

    expect(resultado).toHaveProperty("pedidos");
    expect(Array.isArray(resultado.pedidos)).toBe(true);
    expect(resultado.clientes).toHaveLength(0);
    expect(resultado.cartuchos).toHaveLength(0);
  });
});

describe("pedidos.reabrir", () => {
  it("procedimento reabrir existe no router de pedidos", () => {
    // Verifica que o procedimento está registrado no router
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    expect(typeof caller.pedidos.reabrir).toBe("function");
  });
});
