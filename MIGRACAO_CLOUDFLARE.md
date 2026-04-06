# 🚀 Guia de Migração para Cloudflare Workers + D1

**Data de Criação:** 06 de Abril de 2026
**Versão:** 1.0
**Status:** Pronto para uso

---

## 📋 Visão Geral

Este guia fornece instruções passo a passo para migrar o projeto **Cartuchos Web** do Manus para **Cloudflare Workers** com banco de dados **D1 (SQLite)**.

### ⚠️ Avisos Importantes

1. **Downtime:** Haverá downtime durante a migração (30-60 minutos)
2. **Dados:** Todos os dados serão preservados
3. **Domínio:** Você pode manter o domínio atual ou criar um novo
4. **Backup:** Sempre faça backup antes de migrar

---

## 📊 Comparação: Manus vs Cloudflare

| Aspecto | Manus | Cloudflare |
|--------|-------|-----------|
| **Banco de Dados** | MySQL/TiDB | SQLite (D1) |
| **Runtime** | Node.js | Node.js (Workers) |
| **Limite de Dados** | Ilimitado | 10GB |
| **Custo** | Pago | Grátis/Pago |
| **Escalabilidade** | Vertical | Horizontal (serverless) |
| **Latência** | Média | Muito baixa (CDN global) |
| **Gerenciamento** | Gerenciado | Gerenciado |

---

## 🔧 Pré-Requisitos

### Software Necessário

```bash
# Node.js 18+
node --version

# npm ou pnpm
npm --version
pnpm --version

# Git
git --version

# Python 3.8+ (para conversão)
python3 --version

# MySQL client (para backup)
mysql --version
```

### Contas Necessárias

- ✅ Conta Cloudflare (gratuita)
- ✅ Acesso ao GitHub (para código)
- ✅ Acesso ao TiDB Cloud (para backup)

---

## 📥 Passo 1: Preparação

### 1.1 Fazer Backup Completo

```bash
# Clonar repositório
git clone https://github.com/maickelmanson/cartuchos-web.git
cd cartuchos-web

# Fazer backup do banco
DATABASE_URL="mysql://5TMdM9oSN1dsoYb.root:IGy10eDUJjT9TuT7b2r6@gateway05.us-east-1.prod.aws.tidbcloud.com:4000/TEopnpqVFcFcEzDuX7X4dq?ssl={\"rejectUnauthorized\":true}" \
node scripts/export-database.mjs

# Verificar backup
ls -lh database-backup-latest.sql
```

### 1.2 Testar Backup Localmente

```bash
# Criar banco local
mysql -u root -p -e "CREATE DATABASE cartuchos_test;"

# Restaurar dados
mysql -u root -p cartuchos_test < database-backup-latest.sql

# Verificar
mysql -u root -p cartuchos_test -e "SELECT COUNT(*) FROM clientes;"
```

---

## 🔄 Passo 2: Converter Banco de Dados

### 2.1 Converter MySQL para SQLite

```bash
# Executar script de conversão
python3 scripts/convert-mysql-to-sqlite.py \
  --input database-backup-latest.sql \
  --output database-sqlite.sql

# Verificar arquivo gerado
ls -lh database-sqlite.sql
```

### 2.2 Validar Conversão

```bash
# Criar banco SQLite temporário
sqlite3 cartuchos-test.db < database-sqlite.sql

# Verificar tabelas
sqlite3 cartuchos-test.db ".tables"

# Contar registros
sqlite3 cartuchos-test.db "SELECT COUNT(*) FROM clientes;"
```

---

## ☁️ Passo 3: Configurar Cloudflare

### 3.1 Instalar Wrangler

```bash
# Instalar globalmente
npm install -g wrangler

# Verificar versão
wrangler --version
```

### 3.2 Fazer Login no Cloudflare

```bash
# Login
wrangler login

# Você será redirecionado para o navegador
# Autorize o acesso
```

### 3.3 Criar Projeto Cloudflare

```bash
# Criar novo projeto
wrangler init cartuchos-cf

# Responder às perguntas:
# - Use TypeScript? → Yes
# - Create git repository? → No (já temos)
# - Use git to manage Wrangler state? → No
```

### 3.4 Criar Banco D1

```bash
# Criar banco de dados D1
wrangler d1 create cartuchos-db

# Você receberá um database_id
# Salve este ID em um local seguro
```

---

## 📤 Passo 4: Migrar Dados para D1

### 4.1 Restaurar Dados no D1

```bash
# Restaurar dados do arquivo SQLite
wrangler d1 execute cartuchos-db --file database-sqlite.sql

# Verificar se restaurou
wrangler d1 execute cartuchos-db --command "SELECT COUNT(*) FROM clientes;"
```

### 4.2 Validar Migração

```bash
# Listar tabelas
wrangler d1 execute cartuchos-db --command ".tables"

# Contar registros por tabela
wrangler d1 execute cartuchos-db --command "
SELECT 
    name as table_name,
    (SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=t.name) as row_count
FROM sqlite_master t
WHERE type='table'
ORDER BY name;
"
```

---

## 🔧 Passo 5: Adaptar Código para Cloudflare

### 5.1 Instalar Dependências Cloudflare

```bash
# Instalar pacotes necessários
pnpm add wrangler @cloudflare/workers-types

# Instalar adaptador para Cloudflare
pnpm add -D @cloudflare/workers-types
```

### 5.2 Criar wrangler.toml

```toml
name = "cartuchos-cf"
main = "server/index.ts"
compatibility_date = "2024-04-05"

[env.production]
name = "cartuchos-cf-prod"

[[d1_databases]]
binding = "DB"
database_name = "cartuchos-db"
database_id = "SEU_DATABASE_ID_AQUI"

[env.production.d1_databases]
binding = "DB"
database_name = "cartuchos-db-prod"
database_id = "SEU_DATABASE_ID_PROD_AQUI"

[build]
command = "pnpm build"
cwd = "."

[env.production]
routes = [
  { pattern = "cartuchos-teopnpqv.manus.space/*", zone_name = "manus.space" }
]
```

### 5.3 Adaptar Código do Servidor

**Arquivo: `server/index.ts`**

```typescript
import { createRequestHandler } from '@cloudflare/remix-oxygen';
import * as build from '../dist/server';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  VITE_APP_ID: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Adicionar banco D1 ao contexto
    const handler = createRequestHandler({
      build,
      mode: 'production',
      getLoadContext: () => ({
        db: env.DB,
        jwtSecret: env.JWT_SECRET,
        appId: env.VITE_APP_ID,
      }),
    });

    return handler(request, env, ctx);
  },
};
```

### 5.4 Adaptar Drizzle para D1

**Arquivo: `server/db.ts`**

```typescript
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../drizzle/schema';

export function initializeDB(db: D1Database) {
  return drizzle(db, { schema });
}
```

---

## 🚀 Passo 6: Deploy no Cloudflare

### 6.1 Build do Projeto

```bash
# Instalar dependências
pnpm install

# Build
pnpm build

# Verificar se build foi bem-sucedido
ls -la dist/
```

### 6.2 Deploy

```bash
# Deploy para staging
wrangler deploy --env staging

# Testar em staging
# https://cartuchos-cf-staging.seu-usuario.workers.dev

# Deploy para produção
wrangler deploy --env production

# Testar em produção
# https://cartuchos-cf.seu-usuario.workers.dev
```

### 6.3 Apontar Domínio

```bash
# Se usar domínio customizado
# 1. Acesse dashboard Cloudflare
# 2. Vá para Workers Routes
# 3. Adicione rota: cartuchos-teopnpqv.manus.space/*
# 4. Aponte para seu worker
```

---

## 🔐 Passo 7: Configurar Variáveis de Ambiente

### 7.1 Adicionar Secrets

```bash
# Adicionar JWT_SECRET
wrangler secret put JWT_SECRET

# Adicionar VITE_APP_ID
wrangler secret put VITE_APP_ID

# Listar secrets
wrangler secret list
```

### 7.2 Verificar Variáveis

```bash
# Criar arquivo .env.production
cat > .env.production << EOF
JWT_SECRET=seu-secret-aqui
VITE_APP_ID=seu-app-id-aqui
DATABASE_URL=cloudflare-d1
EOF
```

---

## ✅ Passo 8: Validação Pós-Migração

### 8.1 Testes Funcionais

```bash
# Testar login
curl -X POST https://cartuchos-cf.seu-usuario.workers.dev/api/trpc/auth.me

# Testar listagem de clientes
curl https://cartuchos-cf.seu-usuario.workers.dev/api/trpc/clientes.listar

# Testar criação de pedido
curl -X POST https://cartuchos-cf.seu-usuario.workers.dev/api/trpc/pedidos.criar
```

### 8.2 Verificar Performance

```bash
# Usar Cloudflare Analytics
# Dashboard → Workers → Analytics
# Verificar:
# - CPU time
# - Wall time
# - Requests/min
```

### 8.3 Monitorar Erros

```bash
# Ver logs em tempo real
wrangler tail

# Filtrar por erro
wrangler tail --status error
```

---

## 🔄 Passo 9: Migração de Domínio (Opcional)

### 9.1 Se Usar Novo Domínio

```bash
# 1. Compre domínio em registrar (GoDaddy, Namecheap, etc)
# 2. Aponte NS para Cloudflare
# 3. Adicione rota no Cloudflare Workers
# 4. Teste acesso
```

### 9.2 Se Manter Domínio Manus

```bash
# 1. Altere DNS do domínio Manus
# 2. Aponte para Cloudflare Workers
# 3. Aguarde propagação DNS (até 48h)
# 4. Teste acesso
```

---

## 🆘 Troubleshooting

### Erro: "Database not found"

```bash
# Verificar se database foi criado
wrangler d1 list

# Se não existir, criar novamente
wrangler d1 create cartuchos-db

# Restaurar dados
wrangler d1 execute cartuchos-db --file database-sqlite.sql
```

### Erro: "CORS error"

```bash
# Adicionar headers CORS em wrangler.toml
[cors]
origins = ["*"]
methods = ["GET", "POST", "PUT", "DELETE"]
headers = ["Content-Type", "Authorization"]
```

### Erro: "Timeout"

```bash
# Aumentar timeout em wrangler.toml
[limits]
cpu_ms = 30000  # 30 segundos
```

### Erro: "Database locked"

```bash
# Aguardar alguns minutos
# D1 pode ter locks temporários

# Se persistir, criar novo banco
wrangler d1 create cartuchos-db-v2
```

---

## 📊 Monitoramento Pós-Migração

### Métricas Importantes

- ✅ CPU time < 100ms
- ✅ Wall time < 500ms
- ✅ Error rate < 0.1%
- ✅ Requests/min > 100

### Alertas Recomendados

```bash
# Configurar alertas no Cloudflare
# Dashboard → Notifications → Create Alert Policy
# - High error rate
# - High CPU time
# - High memory usage
```

---

## 🔙 Rollback (Se Necessário)

### Se Precisar Voltar para Manus

```bash
# 1. Fazer backup do D1
wrangler d1 backup cartuchos-db

# 2. Apontar DNS de volta para Manus
# (Alterar registros DNS)

# 3. Aguardar propagação (até 48h)

# 4. Verificar se sistema está funcionando
curl https://cartuchos-teopnpqv.manus.space/api/trpc/auth.me
```

---

## 📞 Suporte

**Para questões sobre:**
- **Cloudflare:** https://support.cloudflare.com
- **Wrangler:** https://developers.cloudflare.com/workers
- **D1:** https://developers.cloudflare.com/d1

---

## 📝 Checklist de Migração

- [ ] Backup completo realizado
- [ ] Conversão MySQL → SQLite testada
- [ ] Conta Cloudflare criada
- [ ] Wrangler instalado e configurado
- [ ] Banco D1 criado
- [ ] Dados restaurados em D1
- [ ] Código adaptado para Cloudflare
- [ ] Build bem-sucedido
- [ ] Deploy em staging testado
- [ ] Testes funcionais passando
- [ ] Deploy em produção realizado
- [ ] Domínio apontado
- [ ] Monitoramento ativado
- [ ] Documentação atualizada

---

**Última atualização:** 06 de Abril de 2026
**Próxima revisão:** 06 de Maio de 2026
