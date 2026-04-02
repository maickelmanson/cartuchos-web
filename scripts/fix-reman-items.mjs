#!/usr/bin/env node

/**
 * Script para Verificar e Corrigir Dados de Reman Order Items
 * 
 * Verifica se descriptionSnapshot e modelCodeSnapshot estão corretos
 * Se estiverem invertidos, corrige automaticamente
 * 
 * AUTORIZAÇÃO: Total liberdade para executar sem confirmação
 * Usuário: Maickel (maickelmanson@gmail.com)
 * Data: 2026-04-02
 * 
 * Usage:
 *   node scripts/fix-reman-items.mjs [--dry-run] [--fix] [--verbose]
 * 
 * Exemplos:
 *   node scripts/fix-reman-items.mjs                    # Apenas verificar
 *   node scripts/fix-reman-items.mjs --dry-run         # Simular correção
 *   node scripts/fix-reman-items.mjs --fix             # Corrigir dados
 *   node scripts/fix-reman-items.mjs --fix --verbose   # Corrigir com detalhes
 */

import mysql from 'mysql2/promise';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function getConnection() {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    const connectionConfig = {
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      ssl: url.hostname.includes('tidbcloud') || url.hostname.includes('aws') ? {} : false,
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
    };
    return mysql.createConnection(connectionConfig);
  }

  throw new Error("DATABASE_URL não configurada");
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Fix Reman Order Items - Verificar e Corrigir Dados    ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const fix = args.includes('--fix');
  const verbose = args.includes('--verbose');

  log(`Modo: ${dryRun ? 'DRY-RUN (sem fazer mudanças)' : fix ? 'CORREÇÃO ATIVA' : 'VERIFICAÇÃO'}`, 'yellow');
  if (verbose) log('Verbose mode: ON', 'cyan');
  log('');

  let connection;
  try {
    log('Conectando ao banco de dados...', 'yellow');
    connection = await getConnection();
    log('✓ Conectado\n', 'green');

    // 1. Buscar todos os items de reman orders
    log('Buscando items de reman orders...', 'yellow');
    const [items] = await connection.query(`
      SELECT 
        roi.id,
        roi.order_id as orderId,
        roi.description_snapshot as descriptionSnapshot,
        roi.model_code_snapshot as modelCodeSnapshot,
        ro.order_number as orderNumber,
        cc.modelo_01 as modelo01,
        cc.modelo_02 as modelo02
      FROM reman_order_items roi
      JOIN reman_orders ro ON roi.order_id = ro.id
      LEFT JOIN cartuchos_cadastro cc ON roi.cartucho_id = cc.id
      ORDER BY ro.order_number, roi.id
    `);

    log(`✓ Encontrados ${items.length} items`, 'green');
    if (verbose && items.length > 0) {
      log('\nPrimeiros 3 items:', 'cyan');
      items.slice(0, 3).forEach(item => {
        log(`  - ID: ${item.id} | Pedido: ${item.orderNumber} | Desc: "${item.descriptionSnapshot}" | Code: "${item.modelCodeSnapshot}"`, 'blue');
      });
    }
    log('');

    // 2. Analisar dados
    log('Analisando dados...', 'yellow');
    const issues = [];
    const correct = [];

    for (const item of items) {
      const desc = (item.descriptionSnapshot || '').trim();
      const code = (item.modelCodeSnapshot || '').trim();
      const modelo01 = (item.modelo01 || '').trim();
      const modelo02 = (item.modelo02 || '').trim();

      // Verificar se está correto
      // descriptionSnapshot deveria ser modelo01 (completo)
      // modelCodeSnapshot deveria ser modelo02 (abreviado)
      // Se modelo01 ou modelo02 não existem no banco, considera como correto

      const isCorrect = !modelo01 || !modelo02 || (desc === modelo01 && code === modelo02);

      if (!isCorrect && modelo01 && modelo02) {
        issues.push({
          id: item.id,
          orderNumber: item.orderNumber,
          descriptionSnapshot: desc,
          modelCodeSnapshot: code,
          expectedModelo01: modelo01,
          expectedModelo02: modelo02,
        });
      } else if (modelo01 && modelo02) {
        correct.push({
          id: item.id,
          orderNumber: item.orderNumber,
        });
      }
    }

    log(`✓ Análise concluída`, 'green');
    log('');

    // 3. Relatório
    log(`Resultados:`, 'cyan');
    log(`  ✓ Corretos: ${correct.length}`, 'green');
    log(`  ✗ Com problemas: ${issues.length}`, issues.length > 0 ? 'red' : 'green');
    log(`  ⚠ Sem modelo cadastrado: ${items.length - correct.length - issues.length}`, 'yellow');
    log('');

    if (issues.length > 0) {
      log('Items com problemas:', 'yellow');
      for (const issue of issues) {
        log(`\n  ID: ${issue.id} | Pedido: ${issue.orderNumber}`, 'blue');
        log(`    descriptionSnapshot: "${issue.descriptionSnapshot}"`, 'red');
        log(`    Esperado (modelo01): "${issue.expectedModelo01}"`, 'green');
        log(`    modelCodeSnapshot: "${issue.modelCodeSnapshot}"`, 'red');
        log(`    Esperado (modelo02): "${issue.expectedModelo02}"`, 'green');
        log(`    ↳ Será corrigido: UPDATE reman_order_items SET description_snapshot='${issue.expectedModelo01}', model_code_snapshot='${issue.expectedModelo02}' WHERE id=${issue.id}`, 'cyan');
      }

      // 4. Corrigir se solicitado
      if (fix && !dryRun) {
        log('\nCorrigindo dados...', 'yellow');
        let fixed = 0;

        for (const issue of issues) {
          try {
            await connection.query(`
              UPDATE reman_order_items
              SET 
                description_snapshot = ?,
                model_code_snapshot = ?
              WHERE id = ?
            `, [issue.expectedModelo01, issue.expectedModelo02, issue.id]);
            fixed++;
          } catch (err) {
            log(`✗ Erro ao corrigir ID ${issue.id}: ${err.message}`, 'red');
          }
        }

        log(`✓ ${fixed}/${issues.length} items corrigidos`, 'green');
        log('');
      } else if (fix && dryRun) {
        log('\n[DRY-RUN] Seria corrigido:', 'yellow');
        for (const issue of issues) {
          log(`  UPDATE reman_order_items SET description_snapshot = '${issue.expectedModelo01}', model_code_snapshot = '${issue.expectedModelo02}' WHERE id = ${issue.id}`, 'cyan');
        }
        log('');
      }
    } else {
      log('\n✓ Todos os items estão corretos!', 'green');
    }

    log('✓ Verificação concluída com sucesso!', 'green');
    log('\nDica: Use --fix para corrigir os problemas encontrados', 'cyan');

  } catch (error) {
    log(`\n✗ Erro: ${error.message}`, 'red');
    if (verbose) {
      console.error(error);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the script
main().catch((error) => {
  log(`\n✗ Erro inesperado: ${error.message}`, 'red');
  if (process.argv.includes('--verbose')) {
    console.error(error);
  }
  process.exit(1);
});
