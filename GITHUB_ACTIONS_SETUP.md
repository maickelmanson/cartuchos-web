# Configuração de GitHub Actions para Backup Automático

## Pré-requisitos

1. Repositório conectado ao GitHub
2. Acesso às credenciais do banco de dados (DATABASE_URL)
3. Permissões de admin no repositório

## Passo 1: Adicionar Secrets no GitHub

O workflow de backup precisa de credenciais para acessar o banco de dados. Siga estes passos:

### 1.1 Acessar GitHub Secrets

1. Vá para seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Na barra lateral, clique em **Secrets and variables** → **Actions**
4. Clique em **New repository secret**

### 1.2 Adicionar DATABASE_URL

1. **Name:** `DATABASE_URL`
2. **Value:** Cole a string de conexão do seu banco de dados MySQL/TiDB
   - Formato: `mysql://usuario:senha@host:porta/database`
   - Exemplo: `mysql://root:password123@db.example.com:3306/cartuchos_web`
3. Clique em **Add secret**

### 1.3 Adicionar BUILT_IN_FORGE_API_KEY

1. **Name:** `BUILT_IN_FORGE_API_KEY`
2. **Value:** Cole a chave de API do Manus (encontrada em `.env` ou configurações do projeto)
3. Clique em **Add secret**

### 1.4 Adicionar BUILT_IN_FORGE_API_URL

1. **Name:** `BUILT_IN_FORGE_API_URL`
2. **Value:** Cole a URL da API do Manus (ex: `https://api.manus.im`)
3. Clique em **Add secret**

## Passo 2: Verificar Workflow

Após adicionar os secrets:

1. Vá para **Actions** no seu repositório
2. Procure por **Database Backup** na lista de workflows
3. Clique em **Run workflow** para testar manualmente
4. O workflow executará toda segunda-feira às 2:00 AM (UTC) automaticamente

## Passo 3: Monitorar Execução

1. Vá para **Actions**
2. Clique no workflow **Database Backup**
3. Veja o histórico de execuções
4. Clique em uma execução para ver os logs detalhados

## Troubleshooting

### Erro: "Database connection failed"
- Verifique se `DATABASE_URL` está correto
- Certifique-se de que o banco de dados está acessível
- Verifique se as credenciais não expiraram

### Erro: "Permission denied"
- Verifique se o usuário do banco de dados tem permissões de SELECT
- Certifique-se de que o GitHub Actions tem permissão para fazer commit

### Workflow não executa
- Verifique se o workflow está habilitado em **Actions** → **Workflows**
- Confirme que o arquivo `.github/workflows/database-backup.yml` existe no repositório

## Backup Manual

Você também pode fazer backup manual executando:

```bash
node scripts/export-database.mjs
```

Isso criará/atualizará o arquivo `database-backup-latest.sql`.

## Restaurar Backup

Para restaurar um backup:

```bash
mysql -u root -p cartuchos_web < database-backup-latest.sql
```

Ou use a interface do Manus para restaurar.
