# 📋 Guia Completo de Backup e Recuperação - Cartuchos Web

**Data de Criação:** 05 de Abril de 2026
**Versão:** 1.0
**Status:** Ativo

---

## 🎯 Objetivo

Este documento fornece procedimentos completos para:
- ✅ Fazer backup automático e manual dos dados
- ✅ Exportar dados completos do sistema
- ✅ Restaurar dados em caso de emergência
- ✅ Migrar para outro servidor/plataforma
- ✅ Manter segurança e integridade dos dados

---

## 📊 Estrutura de Dados do Projeto

### Banco de Dados
- **Tipo:** MySQL/TiDB Cloud
- **Host:** `gateway05.us-east-1.prod.aws.tidbcloud.com:4000`
- **Banco:** `TEopnpqVFcFcEzDuX7X4dq`
- **Tabelas:** 11 tabelas (clientes, pedidos, cartuchos, etc)

### Código-Fonte
- **Localização:** `/home/ubuntu/cartuchos-web`
- **Repositório:** `https://github.com/maickelmanson/cartuchos-web`
- **Linguagem:** TypeScript (React + Node.js)
- **Tamanho:** ~50MB

### Arquivos de Configuração
- `.env` - Variáveis de ambiente
- `package.json` - Dependências
- `drizzle/schema.ts` - Schema do banco

---

## 🔄 Backup Automático (Ativo)

### GitHub Actions Workflow
**Arquivo:** `.github/workflows/database-backup.yml`

**Frequência:** A cada 3 horas (00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 UTC)

**O que faz:**
1. Conecta ao TiDB Cloud
2. Exporta banco de dados em SQL
3. Faz commit no GitHub
4. Arquivo salvo como `database-backup-latest.sql`

**Localização dos Backups:**
```
https://github.com/maickelmanson/cartuchos-web/blob/main/database-backup-latest.sql
```

**Como acessar:**
1. Abra https://github.com/maickelmanson/cartuchos-web
2. Vá para a branch `main`
3. Procure pelo arquivo `database-backup-latest.sql`
4. Clique em "Download raw file"

---

## 💾 Backup Manual

### Opção 1: Via GitHub (Recomendado)

```bash
# Clonar repositório
git clone https://github.com/maickelmanson/cartuchos-web.git

# Acessar pasta
cd cartuchos-web

# Arquivo de backup está em:
cat database-backup-latest.sql
```

### Opção 2: Via Script Local

**Pré-requisitos:**
- Node.js 22+
- MySQL client instalado

**Executar backup:**
```bash
cd /home/ubuntu/cartuchos-web

# Definir variáveis de ambiente
export DATABASE_URL="mysql://5TMdM9oSN1dsoYb.root:IGy10eDUJjT9TuT7b2r6@gateway05.us-east-1.prod.aws.tidbcloud.com:4000/TEopnpqVFcFcEzDuX7X4dq?ssl={\"rejectUnauthorized\":true}"

# Executar script de backup
node scripts/export-database.mjs

# Arquivo será salvo como: database-backup-latest.sql
```

### Opção 3: Via Manus Management UI

1. Acesse o painel de Management do Manus
2. Vá para "Database"
3. Clique em "Backup" ou "Export"
4. Selecione formato SQL
5. Faça download

---

## 🔐 Credenciais de Acesso

**⚠️ IMPORTANTE:** Nunca compartilhe estas credenciais!

```
Host: gateway05.us-east-1.prod.aws.tidbcloud.com
Port: 4000
User: 5TMdM9oSN1dsoYb.root
Password: IGy10eDUJjT9TuT7b2r6
Database: TEopnpqVFcFcEzDuX7X4dq
SSL: Ativado
```

**Onde estão armazenadas:**
- GitHub Secrets: `DATABASE_URL`
- Manus Environment: `DATABASE_URL`
- Arquivo local: `/home/ubuntu/.env` (não commitado)

---

## 🔄 Restauração de Dados

### Cenário 1: Restaurar em TiDB Cloud (Mesmo servidor)

**Pré-requisitos:**
- Arquivo SQL de backup
- Acesso ao TiDB Cloud

**Passos:**

```bash
# 1. Conectar ao banco
mysql -h gateway05.us-east-1.prod.aws.tidbcloud.com \
       -u 5TMdM9oSN1dsoYb.root \
       -p'IGy10eDUJjT9TuT7b2r6' \
       -P 4000 \
       TEopnpqVFcFcEzDuX7X4dq \
       --ssl-mode=REQUIRED < database-backup-latest.sql

# 2. Verificar se restaurou
mysql -h gateway05.us-east-1.prod.aws.tidbcloud.com \
      -u 5TMdM9oSN1dsoYb.root \
      -p'IGy10eDUJjT9TuT7b2r6' \
      -P 4000 \
      TEopnpqVFcFcEzDuX7X4dq \
      -e "SELECT COUNT(*) FROM clientes;"
```

### Cenário 2: Restaurar em MySQL Local

**Pré-requisitos:**
- MySQL instalado localmente
- Arquivo SQL de backup

**Passos:**

```bash
# 1. Criar banco local
mysql -u root -p -e "CREATE DATABASE cartuchos_backup;"

# 2. Restaurar dados
mysql -u root -p cartuchos_backup < database-backup-latest.sql

# 3. Verificar
mysql -u root -p cartuchos_backup -e "SHOW TABLES;"
```

### Cenário 3: Restaurar em SQLite (Para Cloudflare)

**Pré-requisitos:**
- Python 3.8+
- Ferramentas de conversão

**Passos:**

```bash
# 1. Converter SQL MySQL para SQLite
# (Veja seção "Migração para Cloudflare" abaixo)

# 2. Restaurar em SQLite
sqlite3 cartuchos.db < database-backup-converted.sql

# 3. Verificar
sqlite3 cartuchos.db ".tables"
```

---

## 🚀 Migração para Outro Servidor

### Migração para Railway

**Pré-requisitos:**
- Conta Railway.app
- CLI do Railway instalado

**Passos:**

```bash
# 1. Fazer login no Railway
railway login

# 2. Criar novo projeto
railway init

# 3. Provisionar banco MySQL
railway add

# 4. Obter URL do novo banco
railway variables

# 5. Restaurar dados
mysql -h [novo-host] -u [novo-user] -p[nova-senha] [novo-db] < database-backup-latest.sql

# 6. Atualizar DATABASE_URL no .env
# 7. Fazer deploy
railway up
```

### Migração para Render

**Pré-requisitos:**
- Conta Render.com
- CLI do Render instalado

**Passos:**

```bash
# 1. Criar novo banco MySQL no Render
# (Via dashboard)

# 2. Obter connection string
# (Via dashboard Render)

# 3. Restaurar dados
mysql -h [render-host] -u [render-user] -p[render-password] [render-db] < database-backup-latest.sql

# 4. Atualizar DATABASE_URL
# 5. Fazer deploy
git push render main
```

### Migração para Cloudflare Workers + D1

**Pré-requisitos:**
- Conta Cloudflare
- Wrangler CLI instalado
- Python 3.8+ (para conversão)

**Passos:**

```bash
# 1. Instalar Wrangler
npm install -g wrangler

# 2. Login no Cloudflare
wrangler login

# 3. Criar novo projeto
wrangler init cartuchos-cf

# 4. Converter SQL MySQL para SQLite
# (Usar script de conversão - veja abaixo)
python3 scripts/convert-mysql-to-sqlite.py \
  --input database-backup-latest.sql \
  --output cartuchos.sqlite

# 5. Criar banco D1
wrangler d1 create cartuchos-db

# 6. Restaurar dados
wrangler d1 execute cartuchos-db --file cartuchos.sqlite

# 7. Fazer deploy
wrangler deploy
```

---

## 🔄 Conversão MySQL → SQLite

**Arquivo:** `scripts/convert-mysql-to-sqlite.py`

**Como usar:**

```bash
python3 scripts/convert-mysql-to-sqlite.py \
  --input database-backup-latest.sql \
  --output database-sqlite.sql
```

**O que faz:**
- Remove sintaxe MySQL específica
- Converte tipos de dados
- Ajusta constraints
- Gera arquivo SQLite compatível

---

## 📦 Exportar Código-Fonte Completo

### Opção 1: Clone do GitHub

```bash
git clone https://github.com/maickelmanson/cartuchos-web.git cartuchos-backup
cd cartuchos-backup
```

### Opção 2: ZIP do Repositório

```bash
# Baixar como ZIP
wget https://github.com/maickelmanson/cartuchos-web/archive/refs/heads/main.zip

# Extrair
unzip main.zip
cd cartuchos-web-main
```

### Opção 3: Arquivo Completo com Dados

```bash
# Criar arquivo ZIP com tudo
zip -r cartuchos-completo.zip \
  /home/ubuntu/cartuchos-web \
  database-backup-latest.sql \
  BACKUP_E_RECUPERACAO.md

# Fazer download
```

---

## 🛠️ Restaurar Ambiente Local Completo

**Pré-requisitos:**
- Node.js 22+
- MySQL 8.0+
- Git

**Passos:**

```bash
# 1. Clone do repositório
git clone https://github.com/maickelmanson/cartuchos-web.git
cd cartuchos-web

# 2. Instalar dependências
pnpm install

# 3. Criar banco local
mysql -u root -p -e "CREATE DATABASE cartuchos_local;"

# 4. Restaurar dados
mysql -u root -p cartuchos_local < database-backup-latest.sql

# 5. Configurar .env
cat > .env.local << EOF
DATABASE_URL="mysql://root:password@localhost:3306/cartuchos_local"
JWT_SECRET="seu-secret-aqui"
VITE_APP_ID="seu-app-id"
EOF

# 6. Rodar migrações (se necessário)
pnpm drizzle-kit push

# 7. Iniciar servidor
pnpm dev

# 8. Acessar em http://localhost:3000
```

---

## 📋 Checklist de Segurança

- [ ] Backup automático ativado (GitHub Actions)
- [ ] Arquivo de backup testado
- [ ] Credenciais armazenadas com segurança
- [ ] Código-fonte no GitHub
- [ ] .env não commitado
- [ ] Backup local feito
- [ ] Procedimento de restauração testado
- [ ] Documentação atualizada
- [ ] Acesso ao GitHub verificado
- [ ] Acesso ao TiDB Cloud verificado

---

## 🚨 Procedimento de Emergência

**Se você perder acesso ao Manus:**

1. **Recuperar dados do GitHub:**
   ```bash
   git clone https://github.com/maickelmanson/cartuchos-web.git
   cat database-backup-latest.sql
   ```

2. **Restaurar em novo servidor:**
   - Seguir seção "Migração para Outro Servidor"
   - Usar backup mais recente

3. **Atualizar domínio:**
   - Apontar DNS para novo servidor
   - Sistema continua funcionando

---

## 📞 Suporte e Contato

**Para questões sobre:**
- **Custos e Billing:** https://help.manus.im
- **Suporte Técnico:** https://help.manus.im
- **Recuperação de Dados:** Seguir procedimentos acima

---

## 📝 Histórico de Versões

| Versão | Data | Alterações |
|--------|------|-----------|
| 1.0 | 05/04/2026 | Documento inicial criado |

---

**Última atualização:** 05 de Abril de 2026
**Próxima revisão:** 05 de Maio de 2026
