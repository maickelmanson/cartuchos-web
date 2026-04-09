import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function runMigration() {
  let connection;
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL not found in environment');
    }

    // Parse connection string
    const url = new URL(dbUrl);
    const config = {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      port: url.port || 3306,
      ssl: {
        rejectUnauthorized: false,
      },
    };

    console.log(`Connecting to ${config.host}:${config.port}/${config.database}...`);
    connection = await mysql.createConnection(config);

    // Check if column already exists
    const [columns] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'clientes' AND COLUMN_NAME = 'telefone2'`
    );

    if (columns.length > 0) {
      console.log('✅ Campo telefone2 já existe na tabela clientes');
      return;
    }

    // Execute migration
    console.log('Executando migration: ALTER TABLE `clientes` ADD `telefone2` varchar(20)...');
    await connection.query(`ALTER TABLE \`clientes\` ADD \`telefone2\` varchar(20) DEFAULT NULL`);
    console.log('✅ Migration executada com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao executar migration:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration();
