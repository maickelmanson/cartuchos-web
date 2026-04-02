#!/usr/bin/env node

/**
 * Database Export Script
 * 
 * Exporta todos os dados do banco de dados para um arquivo SQL
 * que pode ser versionado no GitHub como backup.
 * 
 * Usage:
 *   node scripts/export-database.mjs
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function getConnection() {
  // Parse DATABASE_URL if provided
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    const connectionConfig = {
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      ssl: {},
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
    };
    return mysql.createConnection(connectionConfig);
  }

  // Fallback to individual env vars
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cartuchos_web',
  };
  
  // Add SSL if needed
  if (process.env.DB_SSL === 'true') {
    connectionConfig.ssl = {};
  }
  
  return mysql.createConnection(connectionConfig);
}

async function getTables(connection) {
  const query = `
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = DATABASE()
    ORDER BY TABLE_NAME
  `;
  const [rows] = await connection.query(query);
  return rows.map(r => r.TABLE_NAME);
}

async function exportTable(connection, tableName) {
  // Get table structure
  const [structureRows] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
  const createTableSQL = structureRows[0]['Create Table'];

  // Get table data
  const [dataRows] = await connection.query(`SELECT * FROM \`${tableName}\``);

  let sql = `\n-- ============================================================\n`;
  sql += `-- Table: ${tableName}\n`;
  sql += `-- ============================================================\n\n`;

  // Add drop table if exists
  sql += `DROP TABLE IF EXISTS \`${tableName}\`;\n\n`;

  // Add create table
  sql += createTableSQL + ';\n\n';

  // Add insert statements
  if (dataRows.length > 0) {
    sql += `-- Insert data\n`;
    const columns = Object.keys(dataRows[0]);
    const columnNames = columns.map(c => `\`${c}\``).join(', ');

    for (const row of dataRows) {
      const values = columns.map(col => {
        const value = row[col];
        if (value === null) {
          return 'NULL';
        } else if (typeof value === 'string') {
          return `'${value.replace(/'/g, "''")}'`;
        } else if (typeof value === 'boolean') {
          return value ? '1' : '0';
        } else if (Buffer.isBuffer(value)) {
          return `0x${value.toString('hex')}`;
        } else {
          return value;
        }
      }).join(', ');

      sql += `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${values});\n`;
    }
    sql += '\n';
  }

  return sql;
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║           Database Export Script - Cartuchos Web          ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

  let connection;
  try {
    // Connect to database
    log('Connecting to database...', 'yellow');
    connection = await getConnection();
    log('✓ Connected\n', 'green');

    // Get tables
    log('Fetching tables...', 'yellow');
    const tables = await getTables(connection);
    log(`✓ Found ${tables.length} tables\n`, 'green');

    // Export header
    let sqlContent = `-- ============================================================\n`;
    sqlContent += `-- Database Backup: Cartuchos Web\n`;
    sqlContent += `-- Generated: ${new Date().toISOString()}\n`;
    sqlContent += `-- ============================================================\n\n`;
    sqlContent += `SET FOREIGN_KEY_CHECKS=0;\n`;
    sqlContent += `SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";\n\n`;

    // Export each table
    log('Exporting tables:', 'yellow');
    for (const table of tables) {
      process.stdout.write(`  • ${table}...`);
      const tableSQL = await exportTable(connection, table);
      sqlContent += tableSQL;
      log(' ✓', 'green');
    }

    // Export footer
    sqlContent += `\n-- ============================================================\n`;
    sqlContent += `-- End of backup\n`;
    sqlContent += `-- ============================================================\n`;
    sqlContent += `SET FOREIGN_KEY_CHECKS=1;\n`;

    // Save to file
    const timestamp = new Date().toISOString().replace(/[:-]/g, '').slice(0, 15);
    const filename = `database-backup-${timestamp}.sql`;
    const filepath = path.join(__dirname, '..', filename);

    log(`\nSaving to file: ${filename}`, 'yellow');
    fs.writeFileSync(filepath, sqlContent, 'utf8');
    const fileSize = fs.statSync(filepath).size;
    log(`✓ Backup saved (${(fileSize / 1024).toFixed(2)} KB)\n`, 'green');

    // Also save as latest
    const latestPath = path.join(__dirname, '..', 'database-backup-latest.sql');
    fs.writeFileSync(latestPath, sqlContent, 'utf8');
    log(`✓ Latest backup saved as: database-backup-latest.sql\n`, 'green');

    log('✓ Database export completed successfully!', 'green');
    log(`  Files saved to: ${path.relative(process.cwd(), filepath)}\n`, 'yellow');

  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the script
main().catch((error) => {
  log(`\n✗ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});
