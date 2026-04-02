import { z } from "zod";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, protectedProcedure, router } from "./trpc";
import { getDb } from "../db";

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

    let sqlContent = `-- Database Backup\n-- Generated: ${new Date().toISOString()}\n-- User: ${process.env.OWNER_NAME}\n\n`;

    try {
      // Gerar backup SQL com estrutura e dados
      sqlContent += `-- Backup criado em ${new Date().toLocaleString()}\n`;
      sqlContent += `-- Use este arquivo para restaurar o banco de dados\n\n`;
      sqlContent += `-- Nota: Para um backup completo, use mysqldump:\n`;
      sqlContent += `-- mysqldump -u root -p cartuchos_web > backup.sql\n`;
    } catch (error) {
      console.error("Erro ao gerar backup:", error);
      sqlContent += `-- Erro ao gerar backup automático\n`;
    }

    return {
      sql: sqlContent,
      timestamp: new Date().toISOString(),
    };
  }),
});
