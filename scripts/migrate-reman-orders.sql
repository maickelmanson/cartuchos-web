-- ============================================================
-- Migration Script: Renumber Reman Orders to New Format
-- ============================================================
-- 
-- This script migrates reman orders from the old numbering format
-- (REM-001, REM-002, etc.) to the new format (REM-PD001, REM-PD002, etc.)
-- based on the pedido number they were generated from.
--
-- IMPORTANT: 
-- 1. Back up your database before running this script!
-- 2. This script uses transactions for safety
-- 3. Review the analysis queries first to understand the changes
--
-- ============================================================

-- Step 1: ANALYSIS - View current reman orders that need migration
-- Run this first to see what will be changed
SELECT 
  ro.id,
  ro.order_number as current_number,
  CONCAT('REM-', SUBSTRING_INDEX(ro.notes, '#', -1)) as new_number,
  ro.notes,
  ro.status,
  ro.criado_em
FROM reman_orders ro
WHERE ro.notes LIKE 'Gerado automaticamente a partir do Pedido #%'
ORDER BY ro.id ASC;

-- Step 2: ANALYSIS - Check for conflicts (if any reman order already has the new number)
SELECT 
  ro.id,
  ro.order_number,
  CONCAT('REM-', SUBSTRING_INDEX(ro.notes, '#', -1)) as would_be_number,
  COUNT(*) as count
FROM reman_orders ro
WHERE ro.notes LIKE 'Gerado automaticamente a partir do Pedido #%'
GROUP BY CONCAT('REM-', SUBSTRING_INDEX(ro.notes, '#', -1))
HAVING COUNT(*) > 1;

-- Step 3: BACKUP - Create backup table before migration
CREATE TABLE IF NOT EXISTS reman_orders_backup_before_migration AS
SELECT * FROM reman_orders;

-- Step 4: MIGRATION - Update reman order numbers to new format
-- This uses a transaction to ensure atomicity
START TRANSACTION;

-- Create temporary table to store mapping
CREATE TEMPORARY TABLE reman_migration_map (
  old_id INT PRIMARY KEY,
  old_number VARCHAR(20),
  new_number VARCHAR(20),
  pedido_number VARCHAR(20)
);

-- Populate mapping table
INSERT INTO reman_migration_map (old_id, old_number, new_number, pedido_number)
SELECT 
  ro.id,
  ro.order_number,
  CONCAT('REM-', SUBSTRING_INDEX(ro.notes, '#', -1)),
  SUBSTRING_INDEX(ro.notes, '#', -1)
FROM reman_orders ro
WHERE ro.notes LIKE 'Gerado automaticamente a partir do Pedido #%'
  AND ro.order_number NOT LIKE 'REM-PD%'
  AND ro.order_number NOT LIKE 'REM-REM%';

-- Update reman_orders with new numbers
UPDATE reman_orders ro
INNER JOIN reman_migration_map rm ON ro.id = rm.old_id
SET ro.order_number = rm.new_number,
    ro.atualizando_em = NOW()
WHERE ro.id IN (SELECT old_id FROM reman_migration_map);

-- Verify migration
SELECT 
  'Migration Summary' as step,
  COUNT(*) as affected_rows,
  COUNT(DISTINCT pedido_number) as unique_pedidos
FROM reman_migration_map;

-- Show migrated records
SELECT 
  rm.old_id,
  rm.old_number,
  rm.new_number,
  rm.pedido_number,
  ro.status,
  ro.criado_em
FROM reman_migration_map rm
INNER JOIN reman_orders ro ON rm.old_id = ro.id
ORDER BY rm.old_id ASC;

-- Commit transaction
COMMIT;

-- Step 5: VERIFICATION - Verify all reman orders have correct format
SELECT 
  COUNT(*) as total_reman_orders,
  SUM(CASE WHEN order_number LIKE 'REM-PD%' THEN 1 ELSE 0 END) as new_format_count,
  SUM(CASE WHEN order_number LIKE 'REM-REM%' THEN 1 ELSE 0 END) as old_format_count,
  SUM(CASE WHEN order_number NOT LIKE 'REM-PD%' AND order_number NOT LIKE 'REM-REM%' THEN 1 ELSE 0 END) as other_format_count
FROM reman_orders;

-- Step 6: VALIDATION - Check for any orphaned or inconsistent records
SELECT 
  ro.id,
  ro.order_number,
  ro.notes,
  COUNT(roi.id) as items_count,
  COUNT(rou.id) as units_count
FROM reman_orders ro
LEFT JOIN reman_order_items roi ON ro.id = roi.order_id
LEFT JOIN reman_order_units rou ON roi.id = rou.order_item_id
WHERE ro.notes NOT LIKE 'Gerado automaticamente a partir do Pedido #%'
GROUP BY ro.id;

-- Step 7: ROLLBACK (if needed) - Restore from backup
-- UNCOMMENT ONLY IF MIGRATION FAILED AND YOU NEED TO ROLLBACK
/*
DROP TABLE reman_orders;
RENAME TABLE reman_orders_backup_before_migration TO reman_orders;
*/

-- Step 8: CLEANUP - Remove backup table after successful migration
-- UNCOMMENT ONLY AFTER VERIFYING MIGRATION WAS SUCCESSFUL
/*
DROP TABLE reman_orders_backup_before_migration;
*/
