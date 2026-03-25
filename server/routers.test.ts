import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "admin",
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
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
    });
  });
});

describe("auth.me", () => {
  it("returns user when authenticated", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeDefined();
    expect(result?.openId).toBe("sample-user");
    expect(result?.name).toBe("Sample User");
    expect(result?.email).toBe("sample@example.com");
  });

  it("returns null when not authenticated", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeNull();
  });
});

describe("router structure", () => {
  it("has all expected router namespaces", () => {
    const routerKeys = Object.keys(appRouter._def.procedures);
    
    // Verificar que os routers principais existem
    expect(routerKeys).toContain("auth.me");
    expect(routerKeys).toContain("auth.logout");
    
    // Routers de cartuchos
    expect(routerKeys).toContain("cartuchos.listar");
    expect(routerKeys).toContain("cartuchos.criar");
    expect(routerKeys).toContain("cartuchos.atualizar");
    expect(routerKeys).toContain("cartuchos.deletar");
    
    // Routers de clientes
    expect(routerKeys).toContain("clientes.listar");
    expect(routerKeys).toContain("clientes.buscar");
    expect(routerKeys).toContain("clientes.criar");
    expect(routerKeys).toContain("clientes.atualizar");
    expect(routerKeys).toContain("clientes.deletar");
    
    // Routers de pedidos
    expect(routerKeys).toContain("pedidos.listar");
    expect(routerKeys).toContain("pedidos.buscar");
    expect(routerKeys).toContain("pedidos.porCliente");
    expect(routerKeys).toContain("pedidos.criar");
    expect(routerKeys).toContain("pedidos.finalizar");
    expect(routerKeys).toContain("pedidos.deletar");
    
    // Routers de pedido cartuchos
    expect(routerKeys).toContain("pedidoCartuchos.listar");
    expect(routerKeys).toContain("pedidoCartuchos.adicionar");
    expect(routerKeys).toContain("pedidoCartuchos.atualizar");
    expect(routerKeys).toContain("pedidoCartuchos.remover");
    
    // Busca avançada
    expect(routerKeys).toContain("busca.avancada");
    
    // Cartuchos (tabela unificada - inclui buscar para uso no reman)
    expect(routerKeys).toContain("cartuchos.buscar");
    
    // Módulo de Remanufatura - Pedidos
    expect(routerKeys).toContain("remanOrders.listar");
    expect(routerKeys).toContain("remanOrders.buscar");
    expect(routerKeys).toContain("remanOrders.criar");
    expect(routerKeys).toContain("remanOrders.atualizar");
    expect(routerKeys).toContain("remanOrders.deletar");
    expect(routerKeys).toContain("remanOrders.relatorio");
    
    // Módulo de Remanufatura - Itens
    expect(routerKeys).toContain("remanOrderItems.listar");
    expect(routerKeys).toContain("remanOrderItems.criar");
    expect(routerKeys).toContain("remanOrderItems.atualizar");
    expect(routerKeys).toContain("remanOrderItems.deletar");
    
    // Módulo de Remanufatura - Unidades
    expect(routerKeys).toContain("remanOrderUnits.listar");
    expect(routerKeys).toContain("remanOrderUnits.criar");
    expect(routerKeys).toContain("remanOrderUnits.atualizar");
    expect(routerKeys).toContain("remanOrderUnits.deletar");
  });
});
