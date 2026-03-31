# Guia de Migração: Renumeração de Reman Orders

## Visão Geral

Este guia documenta o processo de migração de reman orders do formato antigo (REM-001, REM-002, etc.) para o novo formato (REM-PD001, REM-PD002, etc.) que mantém consistência com os números dos pedidos.

## Mudança de Formato

### Antes (Formato Antigo)
```
Pedido: PD001 → Reman Order: REM-001
Pedido: PD002 → Reman Order: REM-002
Pedido: PD003 → Reman Order: REM-003
```

### Depois (Novo Formato)
```
Pedido: PD001 → Reman Order: REM-PD001
Pedido: PD002 → Reman Order: REM-PD002
Pedido: PD003 → Reman Order: REM-PD003
```

## Benefícios

- **Consistência**: Reman orders têm a mesma numeração do pedido que os gerou
- **Rastreabilidade**: Fácil correlacionar pedidos e reman orders
- **Filtragem**: Queries de banco de dados mais simples e eficientes
- **Auditoria**: Histórico claro de relacionamento entre pedidos e reman orders

## Pré-requisitos

1. **Backup do banco de dados** — Sempre faça backup antes de migrar
2. **Acesso ao servidor** — Permissão para executar scripts
3. **Variáveis de ambiente** — Configurar credenciais do banco de dados:
   ```bash
   export DB_HOST=localhost
   export DB_USER=root
   export DB_PASSWORD=sua_senha
   export DB_NAME=cartuchos_web
   ```

## Opções de Migração

### Opção 1: Script Node.js (Recomendado)

O script Node.js oferece validação, backup automático e interface amigável.

#### Instalação de Dependências

```bash
npm install mysql2
# ou
pnpm add mysql2
```

#### Execução

**Modo Dry-Run (sem fazer mudanças)**
```bash
node scripts/migrate-reman-orders.mjs --dry-run
```

**Migração Completa**
```bash
node scripts/migrate-reman-orders.mjs
```

**Com Backup Automático**
```bash
node scripts/migrate-reman-orders.mjs --backup
```

**Forçar Sem Confirmação**
```bash
node scripts/migrate-reman-orders.mjs --force
```

#### Saída Esperada

```
============================================================
   Reman Orders Migration Script - New Numbering Format
============================================================

Connecting to database...
✓ Connected

============================================================
STEP 1: Analyzing Current Reman Orders
============================================================

Found 3 reman order(s) to analyze:

  ⚠ NEEDS UPDATE
    ID: 150001
    Current: REM-003 → New: REM-PD003
    Pedido: 003
    Items: 1, Units: 1

  ✓ OK
    ID: 150002
    Current: REM-002 → New: REM-PD002
    Pedido: 002
    Items: 1, Units: 1

  ⚠ NEEDS UPDATE
    ID: 180001
    Current: REM-001 → New: REM-PD001
    Pedido: 001
    Items: 2, Units: 2

============================================================
STEP 2: Creating Backup
============================================================

✓ Backup created successfully

============================================================
STEP 3: Performing Migration
============================================================

Proceed with migration of 2 reman order(s)? (yes/no): yes

✓ 150001: REM-003 → REM-PD003
✓ 180001: REM-001 → REM-PD001

Migration Results:
  ✓ Successful: 2

============================================================
STEP 4: Verification
============================================================

Total Reman Orders: 3
  ✓ New Format (REM-PD*): 3

✓ All reman orders are in the new format!

✓ Migration process completed successfully!
  Remember to test the application thoroughly before deploying to production.
```

### Opção 2: Script SQL Manual

Para controle total, execute o script SQL diretamente no banco de dados.

#### Preparação

1. **Fazer Backup**
   ```bash
   mysqldump -u root -p cartuchos_web > backup_before_migration.sql
   ```

2. **Revisar Análise**
   - Abra `scripts/migrate-reman-orders.sql`
   - Execute as queries de análise (Steps 1 e 2) primeiro
   - Revise os resultados

3. **Executar Migração**
   ```bash
   mysql -u root -p cartuchos_web < scripts/migrate-reman-orders.sql
   ```

#### Estrutura do Script SQL

O script está organizado em 8 passos:

1. **ANALYSIS** — Visualizar reman orders que precisam migração
2. **ANALYSIS** — Verificar conflitos
3. **BACKUP** — Criar tabela de backup
4. **MIGRATION** — Atualizar números
5. **VERIFICATION** — Resumo da migração
6. **VALIDATION** — Verificar registros órfãos
7. **ROLLBACK** — Restaurar backup (se necessário)
8. **CLEANUP** — Remover backup (após sucesso)

## Processo de Migração Passo a Passo

### 1. Preparação

```bash
# Configurar variáveis de ambiente
export DB_HOST=localhost
export DB_USER=root
export DB_PASSWORD=sua_senha
export DB_NAME=cartuchos_web

# Fazer backup manual
mysqldump -u root -p cartuchos_web > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Análise

```bash
# Executar em modo dry-run para ver o que será mudado
node scripts/migrate-reman-orders.mjs --dry-run
```

### 3. Migração

```bash
# Executar migração com backup automático
node scripts/migrate-reman-orders.mjs
```

### 4. Verificação

```bash
# Verificar no banco de dados
mysql -u root -p cartuchos_web -e "
  SELECT order_number, notes, status 
  FROM reman_orders 
  ORDER BY id DESC 
  LIMIT 10;
"
```

### 5. Testes

- [ ] Verificar que todos os reman orders têm o novo formato
- [ ] Testar filtragem de reman orders por número
- [ ] Testar impressão de reman orders
- [ ] Verificar relatórios
- [ ] Testar criação de novos pedidos e reman orders

## Rollback (Se Necessário)

Se algo der errado durante a migração, você pode restaurar do backup.

### Usando Script Node.js

O script cria automaticamente um backup antes de migrar. Para restaurar:

```bash
# Listar backups disponíveis
ls -la reman_orders_backup_*

# Restaurar manualmente
mysql -u root -p cartuchos_web < backup_20260331_143022.sql
```

### Usando Script SQL

Se você executou o script SQL, descomente o passo 7 (ROLLBACK):

```sql
-- Restaurar do backup
DROP TABLE reman_orders;
RENAME TABLE reman_orders_backup_before_migration TO reman_orders;
```

## Troubleshooting

### Erro: "Unknown column 'order_number'"

**Causa**: Nome da coluna está incorreto no seu banco de dados.

**Solução**: Verifique o schema:
```sql
DESCRIBE reman_orders;
```

Ajuste o script se o nome da coluna for diferente.

### Erro: "Duplicate entry for key 'order_number'"

**Causa**: Já existe um reman order com o novo número.

**Solução**: 
1. Revisar dados existentes
2. Resolver conflitos manualmente
3. Tentar novamente

### Erro: "Access denied for user"

**Causa**: Credenciais de banco de dados incorretas.

**Solução**: Verificar variáveis de ambiente:
```bash
echo $DB_HOST
echo $DB_USER
echo $DB_NAME
```

## Validação Após Migração

### Query de Verificação

```sql
-- Verificar formato de todos os reman orders
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN order_number LIKE 'REM-PD%' THEN 1 ELSE 0 END) as new_format,
  SUM(CASE WHEN order_number NOT LIKE 'REM-PD%' THEN 1 ELSE 0 END) as other_format
FROM reman_orders;

-- Resultado esperado: new_format = total, other_format = 0
```

### Testes de Aplicação

1. **Criar novo pedido**
   - Criar pedido PD004
   - Finalizar
   - Verificar que reman order é REM-PD004

2. **Reabrir e editar**
   - Reabrir pedido PD004
   - Adicionar/remover cartuchos
   - Finalizar
   - Verificar que reman order continua REM-PD004

3. **Filtragem**
   - Buscar por "PD001"
   - Verificar que encontra pedido e reman order

## Documentação Adicional

- `scripts/migrate-reman-orders.sql` — Script SQL completo
- `scripts/migrate-reman-orders.mjs` — Script Node.js com validação
- `server/db.ts` — Função `gerarRemanAPartirDoPedido()` que gera novos reman orders

## Suporte

Se encontrar problemas:

1. Verificar logs do script
2. Consultar backup
3. Revisar dados no banco de dados
4. Contactar suporte técnico

## Histórico de Mudanças

- **v1.0.0** (2026-03-31) — Migração inicial do formato de numeração
  - Mudança de REM-001 para REM-PD001
  - Backup automático
  - Validação completa
