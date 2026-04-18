# 🔐 Guia de Segurança e Proteção de Dados

**Data de Criação:** 06 de Abril de 2026
**Versão:** 1.0
**Status:** Ativo

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estratégia de Backup](#estratégia-de-backup)
3. [Recuperação de Dados](#recuperação-de-dados)
4. [Segurança de Credenciais](#segurança-de-credenciais)
5. [Plano de Contingência](#plano-de-contingência)
6. [Conformidade e Regulamentações](#conformidade-e-regulamentações)

---

## 🎯 Visão Geral

### Objetivo

Garantir que os dados do projeto **Cartuchos Web** estejam sempre protegidos, acessíveis e recuperáveis em caso de emergência.

### Princípios

- ✅ **Disponibilidade:** Sistema sempre acessível
- ✅ **Integridade:** Dados nunca corrompidos
- ✅ **Confidencialidade:** Dados protegidos contra acesso não autorizado
- ✅ **Recuperabilidade:** Dados sempre recuperáveis

---

## 💾 Estratégia de Backup

### Backup Automático (Ativo)

**Frequência:** A cada 3 horas
**Localização:** GitHub Repository
**Arquivo:** `database-backup-latest.sql`

```
Horários de Backup (UTC):
├── 00:00 ✓
├── 03:00 ✓
├── 06:00 ✓
├── 09:00 ✓
├── 12:00 ✓
├── 15:00 ✓
├── 18:00 ✓
└── 21:00 ✓
```

### Backup Manual

**Quando fazer:**
- Antes de mudanças importantes
- Antes de migração
- Antes de atualização de dependências
- Semanalmente como precaução

**Como fazer:**

```bash
cd /home/ubuntu/cartuchos-web


# Arquivo será salvo como:
# - database-backup-YYYYMMDDTHHMMSS.sql (com timestamp)
# - database-backup-latest.sql (último backup)
```

### Backup Externo

**Recomendação:** Fazer download mensal

```bash
# Clonar repositório
git clone https://github.com/maickelmanson/cartuchos-web.git

# Fazer backup local
cp database-backup-latest.sql ~/Backups/cartuchos-$(date +%Y%m%d).sql

# Verificar tamanho
du -h ~/Backups/cartuchos-*.sql
```

---

## 🔄 Recuperação de Dados

### Cenário 1: Recuperação Rápida (< 1 hora)

**Situação:** Dados corrompidos, precisa restaurar urgente

```bash
# 1. Acessar GitHub
https://github.com/maickelmanson/cartuchos-web

# 2. Baixar database-backup-latest.sql

# 3. Restaurar localmente
mysql -u root -p cartuchos_local < database-backup-latest.sql

# 4. Verificar dados
mysql -u root -p cartuchos_local -e "SELECT COUNT(*) FROM clientes;"
```

### Cenário 2: Recuperação Completa (1-4 horas)

**Situação:** Perda total de dados, precisa restaurar tudo

```bash
# 1. Clonar repositório
git clone https://github.com/maickelmanson/cartuchos-web.git
cd cartuchos-web

# 2. Instalar dependências
pnpm install

# 3. Criar banco local
mysql -u root -p -e "CREATE DATABASE cartuchos_restored;"

# 4. Restaurar dados
mysql -u root -p cartuchos_restored < database-backup-latest.sql

# 5. Configurar .env
cat > .env.local << EOF
DATABASE_URL="mysql://root:password@localhost:3306/cartuchos_restored"
JWT_SECRET="seu-secret"
VITE_APP_ID="seu-app-id"
EOF

# 6. Iniciar servidor
pnpm dev

# 7. Verificar em http://localhost:3000
```

### Cenário 3: Migração para Novo Servidor (4-8 horas)

**Situação:** Servidor atual indisponível, precisa migrar

```bash
# 1. Fazer backup do servidor atual
# (Já temos em database-backup-latest.sql)

# 2. Converter para novo formato (se necessário)
python3 scripts/convert-mysql-to-sqlite.py \
  --input database-backup-latest.sql \
  --output database-sqlite.sql

# 3. Deploy em novo servidor
# (Seguir guia MIGRACAO_CLOUDFLARE.md)

# 4. Restaurar dados
wrangler d1 execute cartuchos-db --file database-sqlite.sql

# 5. Testar acesso
curl https://novo-dominio.com/api/trpc/auth.me
```

---

## 🔐 Segurança de Credenciais

### Credenciais Críticas

| Credencial | Tipo | Armazenamento | Rotação |
|-----------|------|---------------|---------|
| DATABASE_URL | Senha | GitHub Secrets | Anual |
| JWT_SECRET | Chave | Manus Env | Anual |
| VITE_APP_ID | Token | Manus Env | Conforme OAuth |
| OAuth Token | Token | Manus Env | Automática |

### Proteção de Credenciais

**❌ NUNCA:**
- Commitar credenciais no Git
- Compartilhar credenciais por email
- Armazenar em arquivos locais sem criptografia
- Usar credenciais em logs

**✅ SEMPRE:**
- Usar GitHub Secrets para credenciais
- Usar Manus Environment Variables
- Rotacionar credenciais anualmente
- Usar .gitignore para .env

### Arquivo .gitignore

```
# Credenciais
.env
.env.local
.env.*.local

# Backups locais
*.sql
database-backup-*.sql

# Dependências
node_modules/
.pnpm-store/

# Build
dist/
build/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

---

## 🆘 Plano de Contingência

### Cenário 1: Banco de Dados Indisponível

**Sintomas:**
- Erro "Connection refused"
- Erro "Database not found"
- Timeout de conexão

**Ações:**

```bash
# 1. Verificar status do TiDB Cloud
# Acessar: https://tidbcloud.com/console

# 2. Se offline, restaurar em novo banco
# (Seguir Cenário 3 acima)

# 3. Atualizar DATABASE_URL
# GitHub Secrets → DATABASE_URL → Novo valor

# 4. Fazer deploy
git push origin main

# 5. Verificar se sistema voltou
curl https://cartuchos-teopnpqv.manus.space/api/trpc/auth.me
```

### Cenário 2: Perda de Acesso ao GitHub

**Sintomas:**
- Não consegue fazer push
- Não consegue acessar repositório
- Erro de autenticação

**Ações:**

```bash
# 1. Verificar status do GitHub
# https://www.githubstatus.com

# 2. Se offline, aguardar
# (Backup automático continuará quando voltar)

# 3. Se problema de acesso:
# - Resetar token de acesso
# - Reautenticar com GitHub
# - Usar SSH key se HTTPS falhar
```

### Cenário 3: Perda de Acesso ao Manus

**Sintomas:**
- Não consegue acessar Management UI
- Sistema offline
- Erro de autenticação

**Ações:**

```bash
# 1. Contatar suporte Manus
# https://help.manus.im

# 2. Enquanto aguarda:
# - Usar backup local
# - Restaurar em servidor alternativo
# - Manter sistema rodando localmente

# 3. Após recuperar acesso:
# - Sincronizar dados
# - Fazer backup completo
# - Verificar integridade
```

### Cenário 4: Corrupção de Dados

**Sintomas:**
- Dados inconsistentes
- Erros de integridade
- Queries falhando

**Ações:**

```bash
# 1. Parar sistema
systemctl stop cartuchos-web

# 2. Restaurar backup anterior
mysql -u root -p cartuchos < database-backup-latest.sql

# 3. Verificar integridade
mysql -u root -p cartuchos -e "CHECK TABLE clientes;"

# 4. Reiniciar sistema
systemctl start cartuchos-web

# 5. Investigar causa da corrupção
# - Verificar logs
# - Verificar espaço em disco
# - Verificar permissões
```

---

## 📋 Conformidade e Regulamentações

### LGPD (Lei Geral de Proteção de Dados)

**Requisitos:**
- ✅ Consentimento para coleta de dados
- ✅ Direito de acesso aos dados
- ✅ Direito de exclusão
- ✅ Direito de portabilidade
- ✅ Notificação de vazamento

**Implementação:**

```typescript
// Exemplo: Endpoint de exclusão de dados
export async function deleteUserData(userId: number) {
  // 1. Backup antes de deletar
  await backupDatabase();
  
  // 2. Deletar dados do usuário
  await db.delete(users).where(eq(users.id, userId));
  
  // 3. Deletar dados relacionados
  await db.delete(clientes).where(eq(clientes.userId, userId));
  
  // 4. Log da ação
  console.log(`User ${userId} data deleted at ${new Date()}`);
}
```

### Retenção de Dados

**Política:**
- Dados de clientes: Mantidos enquanto houver relacionamento
- Dados de pedidos: Mantidos por 7 anos (legislação fiscal)
- Dados de logs: Mantidos por 90 dias
- Dados de backup: Mantidos por 30 dias

### Criptografia

**Em Trânsito:**
- ✅ HTTPS/TLS 1.2+
- ✅ SSL para banco de dados
- ✅ Certificados válidos

**Em Repouso:**
- ✅ Backup criptografado
- ✅ Credenciais em GitHub Secrets
- ✅ .env não commitado

---

## 📊 Monitoramento de Segurança

### Verificações Diárias

```bash
# 1. Verificar backup automático
curl -s https://api.github.com/repos/maickelmanson/cartuchos-web/commits?per_page=1 \
  | grep "database-backup"

# 2. Verificar status do sistema
curl https://cartuchos-teopnpqv.manus.space/api/trpc/auth.me

# 3. Verificar logs de erro
# (Via Manus Management UI)
```

### Verificações Semanais

```bash
# 1. Testar restauração
bash scripts/restore-local.sh database-backup-latest.sql

# 2. Verificar integridade de dados
mysql -u root -p cartuchos_local -e "
  SELECT table_name, COUNT(*) as rows
  FROM information_schema.tables
  WHERE table_schema = 'cartuchos_local'
  GROUP BY table_name;
"

# 3. Revisar logs de segurança
# (Via Manus Management UI)
```

### Verificações Mensais

- [ ] Fazer backup externo
- [ ] Revisar política de segurança
- [ ] Atualizar documentação
- [ ] Testar plano de contingência
- [ ] Revisar credenciais
- [ ] Verificar conformidade LGPD

---

## 📞 Contatos de Emergência

| Serviço | Contato | Tempo de Resposta |
|---------|---------|------------------|
| Manus Support | https://help.manus.im | 24h |
| GitHub Support | https://support.github.com | 24h |
| TiDB Cloud Support | https://support.pingcap.com | 24h |
| Cloudflare Support | https://support.cloudflare.com | 1h |

---

## ✅ Checklist de Segurança

**Mensal:**
- [ ] Backup automático verificado
- [ ] Teste de restauração realizado
- [ ] Logs de segurança revisados
- [ ] Credenciais verificadas

**Trimestral:**
- [ ] Plano de contingência testado
- [ ] Documentação atualizada
- [ ] Conformidade LGPD verificada
- [ ] Permissões de acesso revisadas

**Anual:**
- [ ] Credenciais rotacionadas
- [ ] Auditoria de segurança completa
- [ ] Política de segurança revisada
- [ ] Treinamento de segurança

---

## 📝 Histórico de Alterações

| Data | Alteração | Responsável |
|------|-----------|-------------|
| 06/04/2026 | Documento inicial | Manus AI |

---

**Última atualização:** 06 de Abril de 2026
**Próxima revisão:** 06 de Julho de 2026

---

## 📚 Referências

- [LGPD - Lei Geral de Proteção de Dados](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Cloudflare Security](https://www.cloudflare.com/security/)
- [GitHub Security](https://github.com/security)
- [TiDB Security](https://docs.pingcap.com/tidb/stable/security-overview)
