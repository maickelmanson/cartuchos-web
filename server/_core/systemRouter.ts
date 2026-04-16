import { z } from "zod";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, protectedProcedure, router } from "./trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),

  gerarBackup: protectedProcedure.mutation(async () => {
    const db = getDb();

    let sqlContent = `-- ============================================================\n`;
    sqlContent += `-- Database Backup: Cartuchos Web\n`;
    sqlContent += `-- Generated: ${new Date().toISOString()}\n`;
    sqlContent += `-- User: ${process.env.OWNER_NAME || 'System'}\n`;
    sqlContent += `-- ============================================================\n\n`;
    
    sqlContent += `SET FOREIGN_KEY_CHECKS=0;\n`;
    sqlContent += `SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";\n\n`;

    try {
      // 1. Obter lista de tabelas
      const tablesResult = await db.execute(sql`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = DATABASE()
        ORDER BY TABLE_NAME
      `);
      
      const tables = (tablesResult[0] as any[]).map(r => r.TABLE_NAME);

      for (const tableName of tables) {
        sqlContent += `-- ============================================================\n`;
        sqlContent += `-- Table: ${tableName}\n`;
        sqlContent += `-- ============================================================\n\n`;

        // 2. Obter estrutura da tabela
        const structureResult = await db.execute(sql.raw(`SHOW CREATE TABLE \`${tableName}\``));
        const createTableSQL = (structureResult[0] as any[])[0]['Create Table'];

        sqlContent += `DROP TABLE IF EXISTS \`${tableName}\`;\n\n`;
        sqlContent += createTableSQL + ';\n\n';

        // 3. Obter dados da tabela
        const dataResult = await db.execute(sql.raw(`SELECT * FROM \`${tableName}\``));
        const rows = dataResult[0] as any[];

        if (rows.length > 0) {
          sqlContent += `-- Insert data\n`;
          const columns = Object.keys(rows[0]);
          const columnNames = columns.map(c => `\`${c}\``).join(', ');

          for (const row of rows) {
            const values = columns.map(col => {
              const value = row[col];
              if (value === null) {
                return 'NULL';
              } else if (typeof value === 'string') {
                // Escapar aspas simples para SQL
                return `'${value.replace(/'/g, "''")}'`;
              } else if (typeof value === 'boolean') {
                return value ? '1' : '0';
              } else if (value instanceof Date) {
                return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
              } else if (Buffer.isBuffer(value)) {
                return `0x${value.toString('hex')}`;
              } else if (typeof value === 'object') {
                // Para campos JSON
                return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
              } else {
                return value;
              }
            }).join(', ');

            sqlContent += `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${values});\n`;
          }
          sqlContent += '\n';
        }
      }

      sqlContent += `SET FOREIGN_KEY_CHECKS=1;\n`;
      sqlContent += `-- End of backup\n`;

    } catch (error) {
      console.error("Erro ao gerar backup:", error);
      sqlContent += `-- Erro ao gerar backup automático: ${error instanceof Error ? error.message : String(error)}\n`;
    }

    return {
      sql: sqlContent,
      timestamp: new Date().toISOString(),
    };
  }),
});
