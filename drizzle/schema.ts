import { int, mysqlEnum, mysqlTable, text, varchar, timestamp, decimal, tinyint } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const cartuchodCadastro = mysqlTable("cartuchos_cadastro", {
  id: int("id").autoincrement().primaryKey(),
  modelo01: text("modelo_01").notNull(),
  modelo02: text("modelo_02").notNull(),
  priceFinalCustomer: decimal("price_final_customer", { precision: 10, scale: 2 }),
  priceReseller: decimal("price_reseller", { precision: 10, scale: 2 }),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export type CartuchodCadastro = typeof cartuchodCadastro.$inferSelect;
export type InsertCartuchodCadastro = typeof cartuchodCadastro.$inferInsert;

export const clientes = mysqlTable("clientes", {
  id: int("id").autoincrement().primaryKey(),
  nome: text("nome").notNull(),
  telefone: varchar("telefone", { length: 20 }),
  endereco: text("endereco"),
  cpf: varchar("cpf", { length: 14 }),
  cnpj: varchar("cnpj", { length: 18 }),
  inscricaoEstadual: varchar("inscricao_estadual", { length: 20 }),
  commercialProfile: mysqlEnum("commercial_profile", ["CLIENTE_FINAL", "REVENDA"]).default("CLIENTE_FINAL").notNull(),
  observacoes: text("observacoes"),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export type Cliente = typeof clientes.$inferSelect;
export type InsertCliente = typeof clientes.$inferInsert;

export const pedidos = mysqlTable("pedidos", {
  id: int("id").autoincrement().primaryKey(),
  numero: varchar("numero", { length: 10 }).notNull().unique(),
  clienteId: int("cliente_id").notNull(),
  status: mysqlEnum("status", ["aberto", "finalizado"]).default("aberto").notNull(),
  dataCriacao: timestamp("data_criacao").defaultNow().notNull(),
  dataFinalizacao: timestamp("data_finalizacao"),
});

export type Pedido = typeof pedidos.$inferSelect;
export type InsertPedido = typeof pedidos.$inferInsert;

export const pedidoCartuchos = mysqlTable("pedido_cartuchos", {
  id: int("id").autoincrement().primaryKey(),
  pedidoId: int("pedido_id").notNull(),
  cartuchodId: int("cartucho_id"),
  codigo: varchar("codigo", { length: 100 }),
  pesoCheagada: varchar("peso_chegada", { length: 20 }),
  pesoSaida: varchar("peso_saida", { length: 20 }),
  protegido: tinyint("protegido").default(0).notNull(),
  status: mysqlEnum("status", ["em_espera", "em_andamento", "processo", "funcionando", "circuito_queimado", "defeito_cabeca"]).default("em_espera").notNull(),
  observacoes: text("observacoes"),
  dataInclusao: timestamp("data_inclusao").defaultNow().notNull(),
});

export type PedidoCartucho = typeof pedidoCartuchos.$inferSelect;
export type InsertPedidoCartucho = typeof pedidoCartuchos.$inferInsert;

export const pedidosRelations = relations(pedidos, ({ many, one }) => ({
  cliente: one(clientes, {
    fields: [pedidos.clienteId],
    references: [clientes.id],
  }),
  cartuchos: many(pedidoCartuchos),
}));

export const pedidoCartuchosRelations = relations(pedidoCartuchos, ({ one }) => ({
  pedido: one(pedidos, {
    fields: [pedidoCartuchos.pedidoId],
    references: [pedidos.id],
  }),
  cartucho: one(cartuchodCadastro, {
    fields: [pedidoCartuchos.cartuchodId],
    references: [cartuchodCadastro.id],
  }),
}));

// Tabelas do Módulo de Remanufatura

export const remanOrders = mysqlTable("reman_orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  clienteId: int("cliente_id").notNull(),
  commercialProfileSnapshot: varchar("commercial_profile_snapshot", { length: 20 }).notNull(),
  status: mysqlEnum("status", ["aberto", "em_processamento", "finalizado", "cancelado"]).default("aberto").notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).default("0").notNull(),
  discount: decimal("discount", { precision: 12, scale: 2 }).default("0").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).default("0").notNull(),
  notes: text("notes"),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
  atualizadoEm: timestamp("atualizado_em").defaultNow().onUpdateNow().notNull(),
});

export type RemanOrder = typeof remanOrders.$inferSelect;
export type InsertRemanOrder = typeof remanOrders.$inferInsert;

export const remanOrderItems = mysqlTable("reman_order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("order_id").notNull(),
  cartuchoId: int("cartucho_id").notNull(),
  descriptionSnapshot: text("description_snapshot"),
  modelCodeSnapshot: varchar("model_code_snapshot", { length: 50 }),
  quantity: int("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  priceSource: mysqlEnum("price_source", ["CLIENTE_FINAL", "REVENDA"]).notNull(),
  lineTotal: decimal("line_total", { precision: 12, scale: 2 }).notNull(),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
  atualizadoEm: timestamp("atualizado_em").defaultNow().onUpdateNow().notNull(),
});

export type RemanOrderItem = typeof remanOrderItems.$inferSelect;
export type InsertRemanOrderItem = typeof remanOrderItems.$inferInsert;

export const remanOrderUnits = mysqlTable("reman_order_units", {
  id: int("id").autoincrement().primaryKey(),
  orderItemId: int("order_item_id").notNull(),
  cartuchoId: int("cartucho_id").notNull(),
  unitCode: varchar("unit_code", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["FUNCIONANDO", "COM_PROBLEMA"]).notNull(),
  defectType: varchar("defect_type", { length: 100 }),
  outputWeight: decimal("output_weight", { precision: 8, scale: 2 }),
  notes: text("notes"),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
  atualizadoEm: timestamp("atualizado_em").defaultNow().onUpdateNow().notNull(),
});

export type RemanOrderUnit = typeof remanOrderUnits.$inferSelect;
export type InsertRemanOrderUnit = typeof remanOrderUnits.$inferInsert;

// Relações do Módulo de Remanufatura
export const remanOrdersRelations = relations(remanOrders, ({ many, one }) => ({
  cliente: one(clientes, {
    fields: [remanOrders.clienteId],
    references: [clientes.id],
  }),
  items: many(remanOrderItems),
}));

export const remanOrderItemsRelations = relations(remanOrderItems, ({ many, one }) => ({
  order: one(remanOrders, {
    fields: [remanOrderItems.orderId],
    references: [remanOrders.id],
  }),
  modelo: one(cartuchodCadastro, {
    fields: [remanOrderItems.cartuchoId],
    references: [cartuchodCadastro.id],
  }),
  units: many(remanOrderUnits),
}));

export const remanOrderUnitsRelations = relations(remanOrderUnits, ({ one }) => ({
  item: one(remanOrderItems, {
    fields: [remanOrderUnits.orderItemId],
    references: [remanOrderItems.id],
  }),
  modelo: one(cartuchodCadastro, {
    fields: [remanOrderUnits.cartuchoId],
    references: [cartuchodCadastro.id],
  }),
}));
