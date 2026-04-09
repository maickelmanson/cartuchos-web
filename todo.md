# Project TODO

## Banco de Dados
- [x] Tabela users (auth)
- [x] Tabela cartuchos_cadastro
- [x] Tabela clientes (com commercialProfile)
- [x] Tabela pedidos
- [x] Tabela pedido_cartuchos (com status)
- [x] Tabela cartridge_models (remanufatura)
- [x] Tabela reman_orders
- [x] Tabela reman_order_items
- [x] Tabela reman_order_units
- [x] Migrations SQL aplicadas

## Backend (tRPC Procedures)
- [x] CRUD cartuchos cadastro
- [x] CRUD clientes (com commercialProfile)
- [x] CRUD pedidos (criar, buscar, listar, finalizar, deletar)
- [x] CRUD pedido_cartuchos (adicionar, atualizar, remover)
- [x] Busca avançada (geral, código, cliente, telefone, cpf, cnpj, pedido)
- [x] CRUD cartridgeModels (remanufatura)
- [x] CRUD remanOrders (com recálculo automático de totais)
- [x] CRUD remanOrderItems (com preço automático por perfil comercial)
- [x] CRUD remanOrderUnits (com validações condicionais)
- [x] Relatório remanufatura (funcionando vs com problema)

## Frontend - Navegação
- [x] DashboardLayout com menu sidebar completo
- [x] Rotas configuradas no App.tsx

## Frontend - Páginas
- [x] Dashboard
- [x] Clientes (listagem com perfil comercial)
- [x] ClienteDetalhe (com perfil comercial)
- [x] Pedidos (listagem e criação)
- [x] PedidoDetalhe (cartuchos, pesos, status)
- [x] CartuchosCadastro (CRUD modelos)
- [x] RemanModelos (CRUD modelos de cartucho com dois preços)
- [x] RemanPedidos (listagem e criação de pedidos reman)
- [x] RemanPedidoDetalhe (cabeçalho, itens, unidades, relatório)

## Frontend - Componentes
- [x] ModalCartucho
- [x] ModalCliente (com campo commercialProfile)
- [x] ModalNovoPedido

## Correções
- [x] Corrigir Props de PedidoDetalhe para wouter params
- [x] Corrigir Props de ClienteDetalhe para wouter params
- [x] Corrigir Props de RemanPedidoDetalhe para wouter params

## Pendente
- [x] Página de Busca Avançada
- [ ] Editar unidade física (atualmente só adiciona/remove)
- [x] Botão de impressão/PDF do pedido de remanufatura
- [ ] Dashboard de remanufatura com estatísticas
- [x] Testes unitários (vitest) - 5 testes passando

## Bugs
- [x] Erro ao criar modelo de cartucho - campos de preço como string vazia causam falha no INSERT

## Unificação Modelo Cartucho
- [x] Unificar tabelas cartuchos_cadastro e cartridge_models em uma só
- [x] Campos: modelo01, modelo02, preço cliente final, preço revenda
- [x] Formatação automática de moeda BRL (vírgula) nos campos de preço
- [x] Nova página unificada "Modelo Cartucho"
- [x] Atualizar menu sidebar (remover Cartuchos e Reman - Modelos, adicionar Modelo Cartucho)
- [x] Atualizar referências no módulo de remanufatura

## Migração Reman - Pedidos para tabela unificada
- [x] Atualizar FKs das tabelas reman_order_items e reman_order_units para apontar para cartuchos_cadastro
- [x] Atualizar db.ts: funções de reman para usar cartuchos_cadastro
- [x] Atualizar routers.ts: procedures de reman para usar cartuchos_cadastro
- [x] RemanPedidos.tsx já estava OK
- [x] Atualizar RemanPedidoDetalhe.tsx para usar cartuchos_cadastro
- [x] Remover router cartridgeModels, RemanModelos.tsx e CartuchosCadastro.tsx
- [x] Testes atualizados - 5 passando

## Melhorias Solicitadas (Vídeo Esboço)
- [x] Dashboard: Dados da Empresa (empresa, CEP, endereço, nº, bairro, cidade, estado, CNPJ/CPF, telefone, celular/WhatsApp, email, nome, logo)
- [x] Dashboard: Botões salvar/fechar e editável
- [x] Impressão do Pedido Reman: Cabeçalho com logo + dados empresa
- [x] Impressão do Pedido Reman: Tabela Produtos (agrupados por modelo, qtd, valor, total) - só funcionando
- [x] Impressão do Pedido Reman: Tabela Cartuchos com Problema (modelo01, código, defeito)
- [x] Impressão do Pedido Reman: Tabela Cartuchos Funcionando (modelo01, código, peso de saída)
- [x] Botão Editar em pedido finalizado (reabrir para edição)
- [x] Scroll de deslizamento em todo o sistema (modais com scroll para ver botões)
- [x] Todos os campos digitados em LETRAS MAIÚSCULAS (uppercase)
- [x] Busca sem diferenciar acentuação (normalizar acentos)

## Bugs Reportados
- [x] Dashboard não abre - corrigido: DashboardLayout agora envolve todas as rotas no App.tsx

## Fluxo Finalização → Reman → Impressão/PDF
- [x] Backend: procedure gerarRemanAPartirDoPedido - cria pedido reman ao finalizar pedido normal
- [x] Backend: agrupar cartuchos funcionando por modelo (produtos com qtd, preço, total)
- [x] Backend: listar cartuchos funcionando individualmente (modelo02, código, peso de saída)
- [x] Backend: listar cartuchos com defeito (modelo02, código, tipo defeito)
- [x] Frontend: ao finalizar pedido, redireciona para página de impressão do reman
- [x] Frontend: página de impressão conforme esboço (dados empresa, cliente, produtos, funcionando, com problema)
- [x] Frontend: botão Imprimir/PDF na página de impressão

## Exportação PDF
- [x] Botão "Exportar PDF" na página de impressão do pedido reman (html2pdf.js, nome automático com número do pedido e data)

## Bugs Reportados
- [x] RemanPedidoDetalhe: "Rendered more hooks than during the previous render" - corrigido: hook extraido para sub-componente ItemUnidades
- [x] RemanPedidoImpressao: "Rendered more hooks than during the previous render" - corrigido: useRef e useState movidos para antes dos returns condicionais

## Edição de Pedidos Finalizados
- [x] Botão "Editar Pedido" funcional em pedidos com status FINALIZADO
- [x] Permitir adicionar/remover cartuchos em pedido reaberto
- [x] Permitir editar desconto e observações do pedido
- [x] Recalcular total ao editar itens

## Busca Avançada
- [x] Página BuscaAvancada.tsx com campo de busca unificado
- [x] Buscar por: código do cartucho, nome do cliente, telefone, CPF/CNPJ, número do pedido
- [x] Exibir resultados agrupados por tipo (clientes, pedidos, cartuchos)
- [x] Navegar para o detalhe ao clicar no resultado
- [x] Adicionar item "Busca" no menu lateral
- [x] Adicionar rota /busca no App.tsx

## Correção Impressão Reman
- [x] Campo Produto na tabela de impressão deve exibir Modelo 01 (descrição completa) em vez de Modelo 02 (abreviado)
- [x] Corrigir dados invertidos na tabela reman_order_items (description_snapshot e model_code_snapshot trocados)

## Configuração Manus
- [x] Arquivo .manus-init.json criado para abertura automática do Management UI
- [x] README.md com instruções para futuras conversas

## Configuração Electron (Desktop)
- [x] Instalar dependências do Electron
- [x] Criar arquivo main.js (processo principal)
- [x] Configurar scripts de build e desenvolvimento
- [x] Ajustar package.json para Electron
- [ ] Criar ícones para Windows, macOS, Linux
- [ ] Testar funcionamento em desenvolvimento
- [ ] Criar instaladores para Windows, macOS, Linux
- [ ] Migração para SQLite (banco de dados local)
- [ ] Implementar sincronização de dados (opcional)
- [ ] Configurar auto-update (opcional)

## Bugs Reportados (Corrigidos)
- [x] Pedido reaberto gera novo número ao finalizar em vez de reutilizar o número original

## Bugs Reportados (Novos - Corrigidos)
- [x] Reman order recebe novo número ao finalizar pedido reaberto (deveria usar o mesmo número do pedido)

## Migração de Dados Históricos
- [x] Script SQL para migração de reman orders antigos
- [x] Script Node.js para validação e backup
- [x] Documentação de migração
- [ ] Executar migração em produção

## Bugs Reportados (Corrigidos)
- [x] NotFoundError ao adicionar cartuchos nos pedidos dos clientes

## Bugs Reportados (Em Produção)
- [ ] NotFoundError ao adicionar cartuchos na versão publicada (https://cartuchos-teopnpqv.manus.space/pedidos/180001)
  - Erro: Failed to execute 'removeChild' on 'Node'
  - Ocorre ao selecionar modelo de cartucho no modal de adicionar cartucho
  - Versão local foi corrigida, mas publicada ainda tem o problema
  - Aguardando crédito para publicar correção

## Bugs Reportados (Novos - ResizeObserver)
- [x] ResizeObserver loop completed with undelivered notifications na página de clientes (/clientes)

## Novas Funcionalidades (Ativo)
- [x] Botão "Novo Pedido" na página de detalhe do cliente que abre modal com dados pré-preenchidos

## Backup Automático
- [x] Workflow de GitHub Actions para backup automático semanal
- [x] Configurar credenciais de banco de dados no GitHub Secrets
- [x] Testar execução do workflow
- [x] Botão de backup manual no dashboard
- [x] Endpoint backend para gerar backup sob demanda
- [x] Download do arquivo SQL com backup

## Bugs Reportados (Novos - Impressão e Cadastro)
- [x] Impressão: Nome completo do cartucho não aparece na tabela "Produto" (exibe apenas Modelo 02)
- [x] Cadastro: Campos de texto não convertem para MAIÚSCULAS automaticamente
- [x] Impressão Reman: Dados invertidos em 8 items (descriptionSnapshot e modelCodeSnapshot trocados) - Corrigido com script fix-reman-items.mjs
- [x] Dashboard: Erro "Unexpected token '<', '<!doctype '... is not valid JSON" - Faltava importar useState no Dashboard.tsx


## Novas Features Solicitadas

- [x] Novo Pedido: Abrir automaticamente em modal/janela após criação (em vez de apenas recarregar página)

- [x] ModalNovoPedido: Descrição do cartucho tampando campo de Código (layout sobreposição) - Corrigido com layout em coluna cheia para Modelo

- [x] Duplicacao de Pedido: Criar procedure backend + botao na UI para duplicar pedido com todos os itens

- [x] Validacao de CPF/CNPJ: Adicionar mascara e validacao de digitos verificadores no cadastro de clientes (13 testes passando)

- [x] Máscara de Telefone: Adicionar máscara automática para telefone (11) 99999-9999 no cadastro de clientes (19 testes passando)

## Dashboard de Análise de Pedidos (Novo)
- [ ] Criar página DashboardAnalise.tsx com gráficos
- [ ] Gráfico: Pedidos por período (últimos 30 dias)
- [ ] Gráfico: Clientes mais ativos (top 10)
- [ ] Gráfico: Modelos mais solicitados (top 10)
- [ ] Gráfico: Status dos pedidos (pizza)
- [ ] Gráfico: Receita por período (últimos 30 dias)
- [ ] Filtros: Data inicial, data final, cliente
- [ ] Exportar dados em CSV/Excel
- [ ] Adicionar rota no App.tsx
- [ ] Adicionar item no menu sidebar

## Dashboard de Análise de Pedidos (Completo)
- [x] Criar página DashboardAnalise.tsx com gráficos
- [x] Gráfico: Pedidos por período (últimos 30 dias)
- [x] Gráfico: Clientes mais ativos (top 10)
- [x] Gráfico: Modelos mais solicitados (top 10)
- [x] Gráfico: Status dos pedidos (pizza)
- [x] Gráfico: Receita por período (últimos 30 dias)
- [x] Filtros: Data inicial, data final
- [x] Exportar dados em CSV
- [x] Adicionar rota no App.tsx
- [x] Adicionar item no menu sidebar
- [x] Procedures backend de análise (pedidosPorPeriodo, clientesMaisAtivos, modelosMaisSolicitados, statusPedidos, receitaPorPeriodo, resumoGeral)

## Upload de Logo com Otimização
- [x] Upload de arquivo JPG/PNG com validação
- [x] Otimização de imagem com redimensionamento e compressão
- [x] Redimensionar para máximo 800x800px
- [x] Comprimir com qualidade 80% (JPEG) ou 85% (PNG)
- [x] Validar tamanho final máximo 500KB
- [x] Exibir preview antes de salvar


## Bugs Reportados (Novos - Finalização de Pedido)
- [x] Erro ao finalizar pedido: parâmetros trocados em reman_order_items (cartucho_id recebendo texto ao invés de ID) - Corrigido: reordenados campos descriptionSnapshot e modelCodeSnapshot


## Painel de Rastreamento de Erros
- [x] Criar tabela error_logs no banco de dados
- [x] Adicionar funções de registro de erros no backend
- [x] Criar página de painel de erros com gráficos
- [x] Integrar rastreamento ao fluxo de finalização de pedidos
- [x] Testar e validar funcionalidade


## Ajustes Identificados no Vídeo (09/04/2026)

### Ajustes Visuais e de Layout
- [x] Corrigir exibição do nome completo do cliente (truncado atualmente) — CSS min-w-0 e break-words adicionados
- [x] Corrigir visibilidade de dados cadastrados (CPF, Telefone, Endereço, Inscrição Estadual aparecem vazios) — Sincronização verificada e funcionando
- [x] Garantir que nome completo apareça no cabeçalho e em "Dados Pessoais" — Implementado

### Alterações Funcionais e UX/UI
- [x] Adicionar campo opcional "Telefone 2" ou "Celular" no formulário de novo cliente — Campo adicionado ao schema e ModalCliente
- [x] Implementar busca/filtro de clientes no modal de novo pedido (autocompletar) — Input com filtro em tempo real implementado
- [x] Implementar validação de duplicidade de clientes (mesmo nome + telefone) — Validação adicionada ao procedure criar

### Correções de Bugs (Bug Fixes)
- [x] Corrigir persistência de cartuchos no novo pedido (cartuchos adicionados desaparecem após salvar) — Procedure criar modificado para aceitar e salvar cartuchos
- [x] Corrigir sincronização de dados do cliente (dados não são recuperados do banco corretamente) — Verificado e funcionando corretamente

### Melhorias no Fluxo de Impressão/PDF
- [x] Corrigir exibição do nome completo do cartucho no PDF (atualmente sai abreviado) — Tabela modificada para exibir modelo01 (descrição completa)
- [x] Garantir que descrição completa do produto apareça na impressão/PDF — Implementado com flex-col para mostrar código e descrição


## Testes de Validação - Duplicidade de Clientes
- [x] Teste: Validação de duplicidade de clientes (8 testes passando)
- [x] Teste: Campo telefone2 existe na tabela
- [x] Teste: Clientes com nomes diferentes podem ter mesmo telefone
- [x] Teste: Validação baseada em NOME, não em telefone
- [x] Migration: Campo telefone2 adicionado com sucesso ao banco
- [x] Total de testes: 49 passando (7 arquivos de teste)


## Edição de Cliente (Nova Funcionalidade)
- [x] Atualizar ModalCliente para modo edição com dados pré-preenchidos — Já estava implementado
- [x] Adicionar validação de duplicidade ao atualizar cliente — Validação adicionada ao procedure atualizar
- [x] Implementar botão Editar na página ClienteDetalhe — Já estava implementado
- [x] Criar testes para edição de cliente — 7 testes criados e passando
- [x] Testar fluxo completo — Todos os 56 testes passando (8 arquivos)


## Sidebar Retrátil (Nova Funcionalidade)
- [x] Adicionar estado de sidebar aberto/fechado — Já estava implementado no DashboardLayout
- [x] Implementar botão toggle para abrir/fechar sidebar — Já estava implementado
- [x] Fazer sidebar fechar ao clicar em um item de menu — Implementado para desktop e mobile
- [x] Adicionar animação de transição — Já estava implementada (collapsible="icon")
- [x] Testar fluxo completo — Funcionando corretamente


## Correção de Exibição de Cartucho na Impressão
- [x] Corrigir nome abreviado do cartucho na tabela de produtos da impressão do Reman Pedido — Prioriza descriptionSnapshot
- [x] Exibir nome completo (modelo01) em vez de abreviado (modelo02) na tabela "Produto" — Implementado
- [x] Validar que a tabela "Cartuchos Funcionando" continua exibindo corretamente — Usa modelo02 (código abreviado)
