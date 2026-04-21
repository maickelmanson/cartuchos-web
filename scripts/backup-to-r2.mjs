import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "cartuchos-web-backups";

async function runBackup() {
  console.log("🚀 Iniciando backup sincronizado...");

  if (!DATABASE_URL) {
    console.error("❌ Erro: DATABASE_URL não configurada.");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `backup-${timestamp}.sql`;
  const filepath = path.join(process.cwd(), filename);

  try {
    console.log(`📦 Gerando arquivo SQL: ${filename}...`);
    execSync(`export DATABASE_URL="${DATABASE_URL}" && node scripts/export-database.mjs`);
    fs.copyFileSync("database-backup-latest.sql", filepath);
    console.log("✅ Backup SQL gerado com sucesso.");
    console.log(`☁️ Sincronização concluída simulada para R2://${R2_BUCKET_NAME}/${filename}`);
  } catch (error) {
    console.error("❌ Falha no processo de backup:", error);
    process.exit(1);
  }
}

runBackup();
