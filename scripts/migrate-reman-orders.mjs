#!/usr/bin/env node

/**
 * Migration Script: Renumber Reman Orders to New Format
 * 
 * This script migrates reman orders from the old numbering format
 * (REM-001, REM-002, etc.) to the new format (REM-PD001, REM-PD002, etc.)
 * based on the pedido number they were generated from.
 * 
 * Usage:
 *   node scripts/migrate-reman-orders.mjs [--dry-run] [--backup] [--force]
 * 
 * Options:
 *   --dry-run   : Show what would be changed without making changes
 *   --backup    : Create backup before migration (default: true)
 *   --force     : Skip confirmation prompt
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const shouldBackup = !args.includes('--no-backup');
const forceRun = args.includes('--force');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(title, 'cyan');
  log(`${'='.repeat(60)}\n`, 'cyan');
}

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cartuchos_web',
  });
  return connection;
}

async function analyzeRemanOrders(connection) {
  logSection('STEP 1: Analyzing Current Reman Orders');

  const query = `
    SELECT 
      ro.id,
      ro.order_number as current_number,
      CONCAT('REM-', SUBSTRING_INDEX(ro.notes, '#', -1)) as new_number,
      ro.notes,
      ro.status,
      ro.criado_em,
      COUNT(roi.id) as items_count,
      COUNT(rou.id) as units_count
    FROM reman_orders ro
    LEFT JOIN reman_order_items roi ON ro.id = roi.order_id
    LEFT JOIN reman_order_units rou ON roi.id = rou.order_item_id
    WHERE ro.notes LIKE 'Gerado automaticamente a partir do Pedido #%'
    GROUP BY ro.id
    ORDER BY ro.id ASC
  `;

  const [rows] = await connection.query(query);

  if (rows.length === 0) {
    log('✓ No reman orders found that need migration.', 'green');
    return [];
  }

  log(`Found ${rows.length} reman order(s) to analyze:\n`, 'yellow');

  const needsMigration = [];
  rows.forEach((row) => {
    const needsUpdate = row.current_number !== row.new_number;
    const status = needsUpdate ? '⚠ NEEDS UPDATE' : '✓ OK';
    const color = needsUpdate ? 'yellow' : 'green';

    log(`  ${status}`, color);
    log(`    ID: ${row.id}`);
    log(`    Current: ${row.current_number} → New: ${row.new_number}`);
    log(`    Pedido: ${row.notes.match(/#(\d+)/)?.[1] || 'N/A'}`);
    log(`    Items: ${row.items_count}, Units: ${row.units_count}`);
    log('');

    if (needsUpdate) {
      needsMigration.push(row);
    }
  });

  return needsMigration;
}

async function createBackup(connection) {
  logSection('STEP 2: Creating Backup');

  try {
    await connection.query(
      'CREATE TABLE IF NOT EXISTS reman_orders_backup_' +
      new Date().toISOString().replace(/[:-]/g, '').slice(0, 15) +
      ' AS SELECT * FROM reman_orders'
    );
    log('✓ Backup created successfully', 'green');
    return true;
  } catch (error) {
    log(`✗ Failed to create backup: ${error.message}`, 'red');
    return false;
  }
}

async function performMigration(connection, needsMigration) {
  logSection('STEP 3: Performing Migration');

  if (isDryRun) {
    log('DRY RUN MODE - No changes will be made\n', 'yellow');
  }

  let successCount = 0;
  let failureCount = 0;

  for (const reman of needsMigration) {
    try {
      const pedidoNumber = reman.notes.match(/#(\d+)/)?.[1];
      const newNumber = `REM-${pedidoNumber}`;

      if (!isDryRun) {
        await connection.query(
          'UPDATE reman_orders SET order_number = ?, atualizando_em = NOW() WHERE id = ?',
          [newNumber, reman.id]
        );
      }

      log(
        `✓ ${reman.id}: ${reman.current_number} → ${newNumber}`,
        'green'
      );
      successCount++;
    } catch (error) {
      log(
        `✗ ${reman.id}: Failed - ${error.message}`,
        'red'
      );
      failureCount++;
    }
  }

  log(`\nMigration Results:`, 'bright');
  log(`  ✓ Successful: ${successCount}`, 'green');
  if (failureCount > 0) {
    log(`  ✗ Failed: ${failureCount}`, 'red');
  }

  return failureCount === 0;
}

async function verifyMigration(connection) {
  logSection('STEP 4: Verification');

  const query = `
    SELECT 
      COUNT(*) as total_reman_orders,
      SUM(CASE WHEN order_number LIKE 'REM-PD%' THEN 1 ELSE 0 END) as new_format_count,
      SUM(CASE WHEN order_number LIKE 'REM-%' AND order_number NOT LIKE 'REM-PD%' THEN 1 ELSE 0 END) as old_format_count
    FROM reman_orders
  `;

  const [[stats]] = await connection.query(query);

  log(`Total Reman Orders: ${stats.total_reman_orders}`, 'bright');
  log(`  ✓ New Format (REM-PD*): ${stats.new_format_count}`, 'green');
  if (stats.old_format_count > 0) {
    log(`  ⚠ Old Format (REM-*): ${stats.old_format_count}`, 'yellow');
  }

  const isValid = stats.old_format_count === 0;
  if (isValid) {
    log('\n✓ All reman orders are in the new format!', 'green');
  } else {
    log('\n⚠ Some reman orders are still in the old format', 'yellow');
  }

  return isValid;
}

async function getUserConfirmation(message) {
  if (forceRun) {
    return true;
  }

  return new Promise((resolve) => {
    process.stdout.write(`${colors.yellow}${message} (yes/no): ${colors.reset}`);
    process.stdin.once('data', (data) => {
      const answer = data.toString().trim().toLowerCase();
      resolve(answer === 'yes' || answer === 'y');
    });
  });
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║   Reman Orders Migration Script - New Numbering Format   ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝\n', 'bright');

  if (isDryRun) {
    log('⚠ DRY RUN MODE - No changes will be made\n', 'yellow');
  }

  let connection;
  try {
    // Connect to database
    log('Connecting to database...', 'dim');
    connection = await getConnection();
    log('✓ Connected\n', 'green');

    // Analyze
    const needsMigration = await analyzeRemanOrders(connection);

    if (needsMigration.length === 0) {
      log('\n✓ Migration complete - no changes needed!', 'green');
      return;
    }

    // Ask for confirmation
    const shouldProceed = await getUserConfirmation(
      `\nProceed with migration of ${needsMigration.length} reman order(s)?`
    );

    if (!shouldProceed) {
      log('\n✗ Migration cancelled by user', 'yellow');
      return;
    }

    // Backup
    if (shouldBackup && !isDryRun) {
      const backupSuccess = await createBackup(connection);
      if (!backupSuccess) {
        const continueAnyway = await getUserConfirmation(
          'Backup failed. Continue anyway?'
        );
        if (!continueAnyway) {
          log('\n✗ Migration cancelled', 'yellow');
          return;
        }
      }
    }

    // Migrate
    const migrationSuccess = await performMigration(connection, needsMigration);

    if (!migrationSuccess && !isDryRun) {
      log('\n✗ Migration encountered errors', 'red');
      return;
    }

    // Verify
    if (!isDryRun) {
      await verifyMigration(connection);
    }

    log('\n✓ Migration process completed successfully!', 'green');
    log('  Remember to test the application thoroughly before deploying to production.\n', 'dim');

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
