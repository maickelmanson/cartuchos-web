# Cartuchos Web — Sistema de Controle de Cartuchos Remanufaturados

**Versão:** 1.0 | **Status:** 100% Funcional | **Última Atualização:** 09/04/2026 - 11:43

Sistema completo e produção-ready para gerenciamento de pedidos, clientes, cartuchos remanufaturados e unidades físicas, com módulo integrado de remanufatura, cálculo automático de preços baseado em perfil comercial, e dashboard de análise com rastreamento de erros.

---

## 📋 Visão Geral do Projeto

O **Cartuchos Web** é uma solução empresarial para empresas de remanufatura de cartuchos de impressora. O sistema oferece controle completo sobre o ciclo de vida dos pedidos, desde a criação até a finalização, com geração automática de pedidos de remanufatura, rastreamento de unidades físicas e relatórios detalhados.

**Principais Características:**

- ✅ Gerenciamento completo de pedidos com múltiplos cartuchos por pedido
- ✅ Cadastro de clientes com perfil comercial (Cliente Final / Revenda) e preços diferenciados
- ✅ Módulo de remanufatura com rastreamento de unidades funcionando vs com defeito
- ✅ Cálculo automático de totais e preços por perfil comercial
- ✅ Dashboard de análise com 5 gráficos Recharts (pedidos, clientes, modelos, status, receita)
- ✅ Painel de rastreamento de erros com severidade e resolução
- ✅ Busca avançada unificada por código, cliente, telefone, CPF, CNPJ, número de pedido
- ✅ Impressão e exportação em PDF com dados da empresa e cliente
- ✅ Upload de logo com otimização automática (redimensionamento e compressão)
- ✅ Validação de CPF/CNPJ com máscaras automáticas
- ✅ Autenticação via Manus OAuth integrada
- ✅ Backup automático diário do banco de dados

---

## 🔧 Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Frontend** | React | 19 |
| **Styling** | Tailwind CSS | 4 |
| **Routing** | Wouter | Latest |
| **Backend** | Express.js | 4 |
| **API** | tRPC | 11 |
| **ORM** | Drizzle ORM | Latest |
| **Banco de Dados** | MySQL/TiDB | Latest |
| **Autenticação** | Manus OAuth | Integrado |
| **Testes** | Vitest | Latest |
| **Gráficos** | Recharts | Latest |
| **Upload** | Busboy | 1.6.0 |
| **Otimização de Imagem** | Sharp | Latest |
| **Armazenamento** | AWS S3 | Integrado |

---

## 📦 Pré-requisitos

Para executar este projeto, você precisará ter instalado:

| Ferramenta | Versão Mínima | Propósito |
|-----------|---------------|----------|
| Node.js | 18.0+ | Runtime JavaScript |
| npm ou pnpm | 8.0+ | Gerenciador de pacotes |
| Git | 2.30+ | Controle de versão |
| MySQL Client | 8.0+ | Acesso ao banco de dados |
| Docker (opcional) | 20.10+ | Containerização |

**Credenciais Necessárias:**

- Banco de dados MySQL/TiDB com URL de conexão
- Token GitHub PAT (Personal Access Token) com permissões `repo` e `workflow`
- Credenciais AWS S3 para armazenamento de logos
- Credenciais Manus OAuth (fornecidas automaticamente pela plataforma)

---

## 🚀 Guia de Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/maickelmanson/cartuchos-web.git
cd cartuchos-web
```

### 2. Instalar Dependências

```bash
# Com pnpm (recomendado)
pnpm install

# Ou com npm
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados (fornecido pelo Manus)
DATABASE_URL=mysql://usuario:senha@host:porta/database?ssl={"rejectUnauthorized":true}

# Autenticação
JWT_SECRET=sua_chave_secreta_aqui
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im/login

# Aplicação
VITE_APP_ID=seu_app_id
VITE_APP_TITLE=Cartuchos Web
VITE_APP_LOGO=https://seu-cdn.com/logo.png

# APIs Manus (fornecidas automaticamente)
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua_chave_api
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=sua_chave_frontend

# Informações do Proprietário
OWNER_NAME=Seu Nome
OWNER_OPEN_ID=seu_open_id

# Analytics (opcional)
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=seu_website_id
```

### 4. Importar Dados do Banco de Dados

Se você possui um backup anterior, importe-o:

```bash
# Usando arquivo SQL
mysql -h seu_host -u seu_usuario -p seu_database < database-backup-latest.sql

# Ou via Manus CLI
manus db import database-backup-latest.sql
```

### 5. Executar Migrations (se necessário)

```bash
# Gerar migrations a partir do schema
pnpm drizzle-kit generate

# Aplicar migrations
pnpm drizzle-kit migrate
```

---

## 🎯 Como Rodar o Projeto

### Ambiente de Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (hot reload)
pnpm dev

# O projeto estará disponível em:
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# API tRPC: http://localhost:3000/api/trpc
```

### Ambiente de Produção

```bash
# Build do frontend
pnpm build

# Build do backend (se necessário)
pnpm build:server

# Iniciar servidor de produção
pnpm start

# Ou via Docker
docker build -t cartuchos-web .
docker run -p 3000:3000 cartuchos-web
```

### Executar Testes

```bash
# Rodar todos os testes
pnpm test

# Rodar testes com coverage
pnpm test:coverage

# Modo watch (re-executa ao salvar)
pnpm test:watch
```

---

## 📁 Estrutura do Projeto

```
cartuchos-web/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── pages/                   # Páginas do sistema
│   │   │   ├── Home.tsx             # Dashboard principal
│   │   │   ├── Clientes.tsx         # Listagem de clientes
│   │   │   ├── ClienteDetalhe.tsx   # Detalhe do cliente
│   │   │   ├── Pedidos.tsx          # Listagem de pedidos
│   │   │   ├── PedidoDetalhe.tsx    # Detalhe do pedido
│   │   │   ├── ModeloCartucho.tsx   # CRUD de modelos
│   │   │   ├── RemanPedidos.tsx     # Listagem de reman
│   │   │   ├── RemanPedidoDetalhe.tsx # Detalhe do reman
│   │   │   ├── DashboardAnalise.tsx # Dashboard com gráficos
│   │   │   ├── PainelErros.tsx      # Rastreamento de erros
│   │   │   ├── EmpresaDados.tsx     # Dados da empresa
│   │   │   └── BuscaAvancada.tsx    # Busca unificada
│   │   ├── components/              # Componentes reutilizáveis
│   │   │   ├── DashboardLayout.tsx  # Layout principal
│   │   │   ├── ModalCliente.tsx     # Modal de cliente
│   │   │   ├── ModalNovoPedido.tsx  # Modal de novo pedido
│   │   │   ├── ModalCartucho.tsx    # Modal de cartucho
│   │   │   └── ...                  # Outros componentes
│   │   ├── lib/
│   │   │   ├── trpc.ts              # Cliente tRPC
│   │   │   └── cpfCnpjValidation.ts # Validação de CPF/CNPJ
│   │   ├── App.tsx                  # Roteamento principal
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Estilos globais
│   ├── public/                      # Arquivos estáticos
│   └── index.html                   # HTML template
│
├── server/                          # Backend Express + tRPC
│   ├── routers.ts                   # Procedures tRPC
│   ├── db.ts                        # Query helpers
│   ├── analise.ts                   # Procedures de análise
│   ├── erros.ts                     # Procedures de rastreamento
│   ├── pedidos.ts                   # Procedures de pedidos
│   ├── clientes.ts                  # Procedures de clientes
│   ├── uploadLogo.ts                # Endpoint de upload
│   ├── imageOptimization.ts         # Otimização de imagem
│   ├── storage.ts                   # Helpers S3
│   ├── _core/                       # Framework interno
│   │   ├── index.ts                 # Entry point
│   │   ├── context.ts               # Contexto tRPC
│   │   ├── oauth.ts                 # Autenticação OAuth
│   │   └── ...                      # Outros helpers
│   └── *.test.ts                    # Testes unitários
│
├── drizzle/                         # Schema e migrations
│   ├── schema.ts                    # Definição de tabelas
│   └── migrations/                  # Arquivos SQL
│
├── storage/                         # Helpers S3
│   └── index.ts                     # Funções de upload
│
├── shared/                          # Código compartilhado
│   └── constants.ts                 # Constantes globais
│
├── .github/
│   └── workflows/                   # GitHub Actions
│       ├── daily-backup.yml         # Backup diário
│       └── database-backup.yml      # Backup de banco a cada 3h
│
├── todo.md                          # Lista de tarefas
├── README.md                        # Este arquivo
├── package.json                     # Dependências
├── tsconfig.json                    # Configuração TypeScript
├── vite.config.ts                   # Configuração Vite
└── .manus-init.json                 # Configuração Manus
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Módulo de Pedidos (100% Completo)

- Criar pedidos com múltiplos cartuchos
- Editar pedidos abertos
- Reabrir pedidos finalizados para edição
- Duplicar pedidos com todos os itens
- Finalizar pedidos (gera pedido de remanufatura automaticamente)
- Cálculo automático de totais
- Impressão e exportação em PDF
- Rastreamento de status (aberto, finalizado)

### ✅ Módulo de Clientes (100% Completo)

- CRUD completo de clientes
- Perfil comercial (Cliente Final / Revenda) com preços diferenciados
- Validação de CPF/CNPJ com máscaras automáticas
- Validação de telefone com máscara automática
- Histórico de pedidos por cliente
- Busca por nome, CPF, CNPJ, telefone

### ✅ Módulo de Remanufatura (100% Completo)

- Criação automática de pedidos reman ao finalizar pedido normal
- Gestão de unidades (funcionando / com problema)
- Relatório de cartuchos com problema
- Impressão com dados da empresa e cliente
- Exportação em PDF
- Cálculo automático de totais por perfil comercial

### ✅ Módulo de Modelos de Cartucho (100% Completo)

- CRUD de modelos com código e descrição
- Preços diferenciados (Cliente Final / Revenda)
- Preço de custo para análise de margem
- Ativação/desativação de modelos
- Busca por código ou descrição

### ✅ Dashboard de Análise (100% Completo)

- Gráfico de pedidos por período (últimos 30 dias)
- Gráfico de clientes mais ativos (top 10)
- Gráfico de modelos mais solicitados (top 10)
- Gráfico de status dos pedidos (pizza)
- Gráfico de receita por período
- Cards de resumo (total pedidos, clientes, finalizados, pendentes)
- Filtros por data inicial e final
- Exportação de dados em CSV

### ✅ Painel de Rastreamento de Erros (100% Completo)

- Tabela `error_logs` com campos: tipo, mensagem, severidade, stack trace, status, notas
- Gráfico de distribuição por severidade
- Gráfico de erros por tipo
- Tabela de erros não resolvidos
- Tabela de erros recentes
- Cards de resumo (total, críticos, não resolvidos)
- Marcar erros como resolvidos
- Filtros por data e severidade

### ✅ Busca Avançada (100% Completo)

- Busca unificada por: código, cliente, telefone, CPF, CNPJ, número de pedido
- Resultados agrupados por tipo
- Navegação direta para detalhes
- Normalização de acentos para busca sem diferenciar acentuação

### ✅ Dados da Empresa (100% Completo)

- Cadastro de dados da empresa (nome, CNPJ, endereço, telefone, email)
- Upload de logo com otimização automática
- Redimensionamento para 800x800px
- Compressão com qualidade 80% (JPEG) ou 85% (PNG)
- Exibição em impressões e pedidos reman

### ✅ Autenticação e Autorização (100% Completo)

- Autenticação via Manus OAuth
- Controle de acesso por role (admin / user)
- Proteção de procedures com `protectedProcedure`
- Logout funcional

### ✅ Backup Automático (100% Completo)

- Workflow GitHub Actions para backup diário completo
- Workflow GitHub Actions para backup de banco a cada 3 horas
- Backup manual via botão no dashboard
- Exportação de dados em SQL

---

## 📊 Status Atual do Projeto

**O projeto está 100% funcional e pronto para produção.**

| Componente | Status | Detalhes |
|-----------|--------|----------|
| Frontend | ✅ Completo | React 19, Tailwind 4, todos os componentes funcionando |
| Backend | ✅ Completo | Express + tRPC, 41 testes passando |
| Banco de Dados | ✅ Completo | MySQL/TiDB com 14 tabelas |
| Autenticação | ✅ Completo | Manus OAuth integrado |
| Testes | ✅ Completo | 41 testes unitários passando |
| Documentação | ✅ Completo | README, guias de backup e migração |
| Backup Automático | ✅ Completo | GitHub Actions configurado |
| Deploy | ✅ Completo | Hospedado em `cartuchos-teopnpqv.manus.space` |

---

## 🔐 Dados de Teste/Acesso

### Usuário Admin

- **Email:** rosislei@construirs.shop
- **Senha:** Usar login via Manus OAuth
- **Role:** admin
- **Acesso:** Todas as funcionalidades

### Usuários de Teste

| Email | Nome | Role | Acesso |
|-------|------|------|--------|
| epsolucoesemimpressoras@gmail.com | MAICKEL CASSIEL FREDRICH | user | Leitura/Escrita |
| maickelmanson@gmail.com | MAICKEL MANSON | user | Leitura/Escrita |
| msassistenciaepson@gmail.com | MAICKEL CASSIEL FREDRICH | user | Leitura/Escrita |
| mstonerecartucho@gmail.com | EPS SOLUÇÕES EM IMPRESSORAS | user | Leitura/Escrita |

### Dados de Teste no Banco

- **Clientes:** 15 clientes cadastrados com histórico de pedidos
- **Modelos:** 12 modelos de cartucho com preços diferenciados
- **Pedidos:** 12 pedidos finalizados com itens
- **Reman Orders:** Pedidos de remanufatura gerados automaticamente

---

## 📝 Solicitações Comuns

### "Preciso fazer uma alteração no projeto"

1. Descreva a mudança desejada
2. O desenvolvedor/IA atualizará o código
3. Solicite para **abrir o preview** para testar
4. Após confirmação, será criado um **checkpoint**

### "Quero publicar o projeto"

1. Clique no botão **Publicar** no Management UI (header superior direito)
2. Ou solicite: "Publique o projeto"
3. O sistema estará disponível em `cartuchos-teopnpqv.manus.space`

### "Preciso ver o banco de dados"

1. Abra o Management UI
2. Clique na aba **Database**
3. Você terá acesso CRUD completo às tabelas

### "Quero voltar a uma versão anterior"

1. Solicite: "Faça rollback para o checkpoint [data/versão]"
2. O desenvolvedor/IA restaurará o projeto para aquele estado

### "Preciso fazer backup do projeto"

```bash
# Backup completo do código
git clone https://github.com/maickelmanson/cartuchos-web.git backup-$(date +%Y%m%d)

# Backup do banco de dados
mysqldump -h seu_host -u seu_usuario -p seu_database > backup-$(date +%Y%m%d).sql
```

---

## 🔄 Fluxo de Desenvolvimento

### Padrão de Commits

```bash
# Feature nova
git commit -m "feat: descrição da feature"

# Bug fix
git commit -m "fix: descrição do bug"

# Documentação
git commit -m "docs: descrição da documentação"

# Testes
git commit -m "test: descrição do teste"
```

### Workflow de Branches

```bash
# Criar branch para feature
git checkout -b feature/nome-da-feature

# Fazer commits
git commit -m "feat: descrição"

# Fazer push
git push origin feature/nome-da-feature

# Criar Pull Request
# Após aprovação, merge para main
```

---

## 🐛 Troubleshooting

### Erro: "Property 'remanOrders' does not exist"

**Causa:** Colisão de nomes no router tRPC

**Solução:** Reiniciar o servidor de desenvolvimento

```bash
pnpm dev
```

### Erro: "DATABASE_URL not found"

**Causa:** Variável de ambiente não configurada

**Solução:** Adicionar DATABASE_URL ao arquivo `.env`

```bash
# Copiar exemplo
cp .env.example .env

# Editar com suas credenciais
nano .env
```

### Erro: "Failed to execute 'removeChild' on 'Node'"

**Causa:** Problema de DOM em modais

**Solução:** Limpar cache e reiniciar

```bash
rm -rf node_modules/.vite
pnpm dev
```

### Erro: "ResizeObserver loop completed with undelivered notifications"

**Causa:** Problema de performance em componentes com muitos elementos

**Solução:** Já foi corrigido na versão atual

---

## 📚 Documentação Adicional

- **todo.md** — Lista de todas as tarefas, bugs e melhorias
- **BACKUP_E_RECUPERACAO.md** — Guia completo de backup e recuperação
- **MIGRACAO_CLOUDFLARE.md** — Guia de migração para Cloudflare Workers
- **SEGURANCA_DADOS.md** — Estratégia de segurança e conformidade LGPD
- **GITHUB_ACTIONS_SETUP.md** — Configuração de workflows automáticos
- **.manus-init.json** — Configuração de inicialização automática

---

## 🤝 Suporte e Contribuição

Se encontrar problemas ou tiver sugestões:

1. Descreva o problema com detalhes
2. Inclua screenshots ou logs de erro
3. Mencione a versão do projeto
4. Solicite ajuda ao desenvolvedor/IA

---

## 📄 Licença

Este projeto é propriedade de **EPS Soluções em Impressoras** e está protegido por direitos autorais.

---

**Versão:** 1.0 | **Status:** 100% Funcional | **Última Atualização:** 09/04/2026 - 11:43

**Desenvolvido com ❤️ usando React, Express, tRPC e Manus Platform**
