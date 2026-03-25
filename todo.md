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
- [ ] Botão de impressão/PDF do pedido de remanufatura
- [ ] Dashboard de remanufatura com estatísticas
- [x] Testes unitários (vitest) - 5 testes passando
