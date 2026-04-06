#!/bin/bash

# ============================================================================
# Script de Restauração Local - Cartuchos Web
# ============================================================================
# Este script restaura o banco de dados localmente a partir de um backup
# Uso: ./scripts/restore-local.sh [arquivo-backup.sql]
# ============================================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações
BACKUP_FILE="${1:-database-backup-latest.sql}"
DB_NAME="cartuchos_local"
DB_USER="root"
DB_HOST="localhost"
DB_PORT="3306"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Restauração Local - Cartuchos Web${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Verificar se arquivo de backup existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Erro: Arquivo de backup não encontrado: $BACKUP_FILE${NC}"
    echo ""
    echo "Arquivos de backup disponíveis:"
    ls -lh database-backup-*.sql 2>/dev/null || echo "Nenhum backup encontrado"
    exit 1
fi

echo -e "${GREEN}✓ Arquivo de backup encontrado: $BACKUP_FILE${NC}"
echo -e "${GREEN}✓ Tamanho: $(du -h "$BACKUP_FILE" | cut -f1)${NC}"
echo ""

# Solicitar senha do MySQL
echo -e "${YELLOW}Digite a senha do MySQL (usuário root):${NC}"
read -s DB_PASSWORD

echo ""
echo -e "${YELLOW}Processando...${NC}"
echo ""

# Criar banco de dados
echo -e "${YELLOW}1. Criando banco de dados '$DB_NAME'...${NC}"
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" <<EOF 2>/dev/null || true
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✓ Banco de dados criado${NC}"
else
    echo -e "${RED}   ❌ Erro ao criar banco de dados${NC}"
    exit 1
fi

echo ""

# Restaurar dados
echo -e "${YELLOW}2. Restaurando dados do backup...${NC}"
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✓ Dados restaurados com sucesso${NC}"
else
    echo -e "${RED}   ❌ Erro ao restaurar dados${NC}"
    exit 1
fi

echo ""

# Verificar restauração
echo -e "${YELLOW}3. Verificando restauração...${NC}"
TABLE_COUNT=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$DB_NAME';" 2>/dev/null | tail -1)

echo -e "${GREEN}   ✓ Tabelas restauradas: $TABLE_COUNT${NC}"

echo ""

# Mostrar estatísticas
echo -e "${YELLOW}4. Estatísticas do banco:${NC}"
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS 'Tamanho (MB)'
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = '$DB_NAME'
ORDER BY TABLE_ROWS DESC;
" 2>/dev/null

echo ""

# Configurar .env
echo -e "${YELLOW}5. Configurando .env...${NC}"
if [ ! -f ".env.local" ]; then
    cat > .env.local << EOF
DATABASE_URL="mysql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
JWT_SECRET="seu-secret-desenvolvimento-local"
VITE_APP_ID="seu-app-id-local"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://app.manus.im"
EOF
    echo -e "${GREEN}   ✓ Arquivo .env.local criado${NC}"
else
    echo -e "${YELLOW}   ⚠ Arquivo .env.local já existe (não sobrescrito)${NC}"
fi

echo ""

# Resumo final
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Restauração Concluída com Sucesso!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Próximos passos:"
echo "1. Instale dependências: pnpm install"
echo "2. Inicie o servidor: pnpm dev"
echo "3. Acesse: http://localhost:3000"
echo ""
echo "Informações da conexão:"
echo "  Host: $DB_HOST"
echo "  Porta: $DB_PORT"
echo "  Banco: $DB_NAME"
echo "  Usuário: $DB_USER"
echo ""
