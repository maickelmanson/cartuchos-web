import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

async function restore() {
  const args = process.argv.slice(2);
  const backupFile = args[0] || "database-backup-latest.sql";

  if (!DATABASE_URL) {
    console.error("❌ Erro: DATABASE_URL não configurada no .env");
    process.exit(1);
  }

  if (!fs.existsSync(backupFile)) {
    console.error(`❌ Erro: Arquivo de backup '${backupFile}' não encontrado.`);
    process.exit(1);
  }

  console.log(`🔄 Iniciando restauração a partir de: ${backupFile}...`);

  try {
    const url = new URL(DATABASE_URL);
    const connection = await mysql.createConnection({
      host: url.hostname,
      port: parseInt(url.port),
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
      ssl: { rejectUnauthorized: true },
      multipleStatements: true
    });

    console.log("📡 Conectado ao banco de dados.");
    const sql = fs.readFileSync(backupFile, "utf8");
    console.log("🚧 Executando comandos SQL...");
    await connection.query(sql);
    console.log("✅ Restauração concluída com sucesso!");
    await connection.end();
  } catch (error) {
    console.error("❌ Erro durante a restauração:", error);
    process.exit(1);
  }
}

restore();
