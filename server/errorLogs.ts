import { getDb } from "./db";
import { errorLogs, InsertErrorLog } from "../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

/**
 * Registrar um erro no sistema
 */
export async function registrarErro(data: InsertErrorLog) {
  const db = await getDb();
  if (!db) {
    console.error("[ErrorLogs] Database not available");
    return null;
  }

  try {
    const result = await db.insert(errorLogs).values(data);
    return result;
  } catch (error) {
    console.error("[ErrorLogs] Erro ao registrar erro:", error);
    return null;
  }
}

/**
 * Obter erros recentes (últimos 30 dias)
 */
export async function obterErrosRecentes(limite: number = 50) {
  const db = await getDb();
  if (!db) return [];

  try {
    const trinta_dias_atras = new Date();
    trinta_dias_atras.setDate(trinta_dias_atras.getDate() - 30);

    return await db.select()
      .from(errorLogs)
      .where(
        and(
          // Opcional: filtrar por data se quiser
        )
      )
      .orderBy(desc(errorLogs.criadoEm))
      .limit(limite);
  } catch (error) {
    console.error("[ErrorLogs] Erro ao buscar erros recentes:", error);
    return [];
  }
}

/**
 * Obter estatísticas de erros por tipo
 */
export async function obterEstatisticasErros() {
  const db = await getDb();
  if (!db) return [];

  try {
    // Query raw para agrupar por tipo e contar
    const result = await db.select({
      errorType: errorLogs.errorType,
      count: sql`COUNT(*) as count`,
      severity: errorLogs.severity,
      lastOccurrence: sql`MAX(criado_em) as lastOccurrence`,
    })
      .from(errorLogs)
      .groupBy(errorLogs.errorType, errorLogs.severity)
      .orderBy(sql`count DESC`);

    return result;
  } catch (error) {
    console.error("[ErrorLogs] Erro ao obter estatísticas:", error);
    return [];
  }
}

/**
 * Obter erros não resolvidos
 */
export async function obterErrosNaoResolvidos() {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select()
      .from(errorLogs)
      .where(eq(errorLogs.resolved, false))
      .orderBy(desc(errorLogs.criadoEm));
  } catch (error) {
    console.error("[ErrorLogs] Erro ao buscar erros não resolvidos:", error);
    return [];
  }
}

/**
 * Marcar erro como resolvido
 */
export async function marcarErroResolvido(
  erroId: number,
  resolverId: number,
  notes?: string
) {
  const db = await getDb();
  if (!db) return null;

  try {
    return await db.update(errorLogs)
      .set({
        resolved: true,
        resolvedAt: new Date(),
        resolvedBy: resolverId,
        notes: notes || null,
      })
      .where(eq(errorLogs.id, erroId));
  } catch (error) {
    console.error("[ErrorLogs] Erro ao marcar como resolvido:", error);
    return null;
  }
}

/**
 * Obter resumo de erros por severidade
 */
export async function obterResumoErros() {
  const db = await getDb();
  if (!db) return { critica: 0, alta: 0, media: 0, baixa: 0, total: 0 };

  try {
    const result = await db.select({
      severity: errorLogs.severity,
      count: sql`COUNT(*) as count`,
    })
      .from(errorLogs)
      .where(eq(errorLogs.resolved, false))
      .groupBy(errorLogs.severity);

    const resumo = {
      critica: 0,
      alta: 0,
      media: 0,
      baixa: 0,
      total: 0,
    };

    for (const row of result) {
      const count = typeof row.count === 'string' ? parseInt(row.count as string) : Number(row.count);
      if (row.severity === "critica") resumo.critica = count;
      if (row.severity === "alta") resumo.alta = count;
      if (row.severity === "media") resumo.media = count;
      if (row.severity === "baixa") resumo.baixa = count;
      resumo.total += count;
    }

    return resumo;
  } catch (error) {
    console.error("[ErrorLogs] Erro ao obter resumo:", error);
    return { critica: 0, alta: 0, media: 0, baixa: 0, total: 0 };
  }
}
