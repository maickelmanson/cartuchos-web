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
- [ ] Página de Busca Avançada
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
