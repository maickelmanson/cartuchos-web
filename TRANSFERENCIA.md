# 📦 Guia de Transferência e Continuidade - Cartuchos Web

Este documento contém todas as informações necessárias para que um novo desenvolvedor ou administrador possa assumir, manter e evoluir o sistema **Cartuchos Web** sem perda de dados ou funcionalidades.

## 🚀 1. Visão Geral do Projeto
O sistema é uma aplicação Full Stack para controle de remanufatura de cartuchos.
- **Frontend:** React 19 + Tailwind CSS 4 + Vite
- **Backend:** Node.js (Express) + tRPC
- **Banco de Dados:** MySQL (TiDB Cloud)
- **ORM:** Drizzle ORM

## 🔑 2. Variáveis de Ambiente (.env)
Para rodar o projeto, você precisará configurar um arquivo `.env` na raiz com as seguintes chaves:

```env
# Conexão com o Banco de Dados (Produção)
DATABASE_URL="mysql://5TMdM9oSN1dsoYb.root:IGy10eDUJjT9TuT7b2r6@gateway05.us-east-1.prod.aws.tidbcloud.com:4000/TEopnpqVFcFcEzDuX7X4dq?ssl={\"rejectUnauthorized\":true}"

# Cloudflare R2 (Backups)
CLOUDFLARE_ACCOUNT_ID="fe38d89d9663215f3453085d49c80f37"
CLOUDFLARE_R2_ACCESS_KEY_ID="bae0bd3098149d9b434b0a07444e17cb"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="409b35a0d030997a2c4b73ff99e304671198a0077b7ad4f18db220ceb4e5cb35"
R2_BUCKET_NAME="cartuchos-web-backups"
```

## 💾 3. Sistema de Backup e Restauração
O sistema possui scripts automatizados para garantir a segurança dos dados:

### Gerar Backup Manual
```bash
node scripts/export-database.mjs
```
*Gera o arquivo `database-backup-latest.sql` com todos os dados atuais.*

### Restaurar Banco de Dados
```bash
node scripts/restore-database.mjs [nome-do-arquivo.sql]
```
*Atenção: Este comando sobrescreve os dados atuais do banco com o conteúdo do arquivo SQL.*

### Backup Automático (Cloudflare R2)
O backup é executado diariamente via GitHub Actions e enviado para o Cloudflare R2.
- **Estratégia:** Backup Rotativo (mantém os últimos 7 dias).

## 🛠️ 4. Como Desenvolver sem Afetar a Produção
1. **Clone o repositório:** `git clone https://github.com/maickelmanson/cartuchos-web.git`
2. **Instale as dependências:** `pnpm install`
3. **Banco de Testes:** Nunca use a `DATABASE_URL` de produção para testes. Crie um banco local ou uma nova instância no TiDB Cloud para desenvolvimento.
4. **Novas Tabelas:** Use `pnpm drizzle-kit generate` e `pnpm drizzle-kit push` para atualizar o schema.

## 🛡️ 5. Contatos e Acessos
- **Repositório:** [GitHub - maickelmanson/cartuchos-web](https://github.com/maickelmanson/cartuchos-web)
- **Hospedagem:** Manus.im
- **Banco de Dados:** TiDB Cloud (PingCAP)
- **Armazenamento de Backups:** Cloudflare R2

---
*Documento gerado em 07/05/2026 para garantir a continuidade do negócio.*
