# Cartuchos Web — Sistema de Controle de Cartuchos Remanufaturados

Sistema completo para gerenciamento de pedidos, clientes e cartuchos remanufaturados, com módulo de remanufatura integrado.

## 🚀 Início Rápido

### Primeira Vez (Nova Conversa)

Ao clonar este repositório pela primeira vez em uma nova conversa do Manus, o arquivo `.manus-init.json` configurará automaticamente:

✅ **Management UI aberto** com os seguintes painéis:
- **Preview** — Visualização em tempo real do projeto
- **Dashboard** — Status e analytics do site
- **Settings** — Configurações gerais, domínios e secrets

Você não precisa fazer nada! O Manus abrirá tudo automaticamente após clonar o repositório.

### Reabrindo o Management UI

Se o Management UI fechar ou você precisar reabrir em qualquer momento, solicite ao Manus:

```
"Abra o Management UI"
ou
"Abra o painel de gerenciamento"
ou
"Abra o preview do projeto"
```

## 📋 Estrutura do Projeto

```
client/                 ← Frontend React 19 + Tailwind 4
  src/
    pages/             ← Páginas do sistema
    components/        ← Componentes reutilizáveis
    lib/trpc.ts        ← Cliente tRPC
server/                ← Backend Express + tRPC
  routers.ts           ← Procedures (API)
  db.ts                ← Query helpers
drizzle/               ← Schema e migrations
todo.md                ← Tarefas do projeto
.manus-init.json       ← Configuração de inicialização automática
```

## 🎯 Funcionalidades Principais

### Módulo de Pedidos
- ✅ Criar, editar e finalizar pedidos
- ✅ **Reabrir pedidos finalizados** para edição
- ✅ Adicionar/remover cartuchos
- ✅ Cálculo automático de totais
- ✅ Impressão e exportação em PDF

### Módulo de Clientes
- ✅ CRUD completo de clientes
- ✅ Perfil comercial (Cliente Final / Revenda)
- ✅ Histórico de pedidos

### Módulo de Remanufatura
- ✅ Criação automática de pedidos reman ao finalizar pedido normal
- ✅ Gestão de unidades (funcionando / com problema)
- ✅ Relatório de cartuchos com problema
- ✅ Impressão com dados da empresa e cliente
- ✅ Exportação em PDF

### Busca Avançada
- ✅ Busca por código, cliente, telefone, CPF, CNPJ, número de pedido
- ✅ Resultados agrupados por tipo
- ✅ Navegação direta para detalhes

### Dados da Empresa
- ✅ Cadastro de dados da empresa (logo, CNPJ, endereço, contatos)
- ✅ Exibição automática em impressões e pedidos reman

## 🔧 Tecnologias

- **Frontend:** React 19, Tailwind CSS 4, Wouter (routing)
- **Backend:** Express 4, tRPC 11, Drizzle ORM
- **Database:** MySQL/TiDB
- **Auth:** Manus OAuth integrado
- **Testes:** Vitest

## 📝 Solicitações Comuns

### "Preciso fazer uma alteração no projeto"
1. Descreva a mudança desejada
2. O Manus atualizará o código
3. Solicite para **abrir o preview** para testar
4. Após confirmação, será criado um **checkpoint**

### "Quero publicar o projeto"
1. Clique no botão **Publicado** no Management UI (header superior direito)
2. Ou solicite: "Publique o projeto"
3. O sistema estará disponível em `cartuchos-teopnpqv.manus.space`

### "Preciso ver o banco de dados"
1. Abra o Management UI
2. Clique na aba **Database**
3. Você terá acesso CRUD completo às tabelas

### "Quero voltar a uma versão anterior"
1. Solicite: "Faça rollback para o checkpoint [data/versão]"
2. O Manus restaurará o projeto para aquele estado

## 📚 Documentação Adicional

- **todo.md** — Lista de todas as tarefas, bugs e melhorias
- **.manus-init.json** — Configuração de inicialização automática
- **server/routers.ts** — Todas as procedures disponíveis
- **drizzle/schema.ts** — Schema do banco de dados

## 🤝 Suporte

Se encontrar problemas ou tiver sugestões, descreva o problema ao Manus e ele ajudará a resolver.

---

**Versão:** 1.0 | **Última atualização:** 26/03/2026
