-- ============================================================
-- Database Backup: Cartuchos Web
-- Generated: 2026-03-31
-- ============================================================
-- 
-- Este arquivo contém o backup completo do banco de dados
-- com todas as tabelas e dados atuais.
--
-- Para restaurar este backup:
-- mysql -u root -p cartuchos_web < database-backup-latest.sql
--
-- ============================================================

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- ============================================================
-- Table: __drizzle_migrations
-- ============================================================

DROP TABLE IF EXISTS `__drizzle_migrations`;

CREATE TABLE `__drizzle_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `__drizzle_migrations` (`id`, `hash`, `created_at`) VALUES (1, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 1743206511000);

-- ============================================================
-- Table: cartridge_models
-- ============================================================

DROP TABLE IF EXISTS `cartridge_models`;

CREATE TABLE `cartridge_models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo02` varchar(50) NOT NULL,
  `modelo01` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cartridge_models` (`id`, `modelo02`, `modelo01`) VALUES (1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA');
INSERT INTO `cartridge_models` (`id`, `modelo02`, `modelo01`) VALUES (2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA');

-- ============================================================
-- Table: cartuchos_cadastro
-- ============================================================

DROP TABLE IF EXISTS `cartuchos_cadastro`;

CREATE TABLE `cartuchos_cadastro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) NOT NULL,
  `modelo_id` int,
  `status` varchar(20) DEFAULT 'disponivel',
  `peso_chegada` decimal(10,2),
  `peso_saida` decimal(10,2),
  `protegido` tinyint(1) DEFAULT 0,
  `observacoes` text,
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `modelo_id` (`modelo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cartuchos_cadastro` (`id`, `codigo`, `modelo_id`, `status`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (1, '5844517231435444', 1, 'disponivel', 37.29, NULL, 0, NULL, '2026-03-30 15:51:11');
INSERT INTO `cartuchos_cadastro` (`id`, `codigo`, `modelo_id`, `status`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (2, '6549841665131651', 1, 'disponivel', NULL, NULL, 0, NULL, '2026-03-30 15:51:11');
INSERT INTO `cartuchos_cadastro` (`id`, `codigo`, `modelo_id`, `status`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (3, '1254879568743215', 2, 'disponivel', 35.03, NULL, 0, NULL, '2026-03-30 15:51:11');
INSERT INTO `cartuchos_cadastro` (`id`, `codigo`, `modelo_id`, `status`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (4, '2156465156161516', 1, 'disponivel', NULL, NULL, 0, NULL, '2026-03-30 15:51:11');
INSERT INTO `cartuchos_cadastro` (`id`, `codigo`, `modelo_id`, `status`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (5, '1111111111111111', 1, 'disponivel', NULL, NULL, 0, NULL, '2026-03-31 10:41:54');
INSERT INTO `cartuchos_cadastro` (`id`, `codigo`, `modelo_id`, `status`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (6, '2222222222222222', 2, 'disponivel', NULL, NULL, 0, NULL, '2026-03-31 10:41:54');

-- ============================================================
-- Table: clientes
-- ============================================================

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `razao_social` varchar(255),
  `cpf_cnpj` varchar(20),
  `email` varchar(255),
  `telefone` varchar(20),
  `endereco` text,
  `cidade` varchar(100),
  `estado` varchar(2),
  `cep` varchar(10),
  `observacoes` text,
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (1, 'ANDERSON GRAEBNER', 'ANDERSON GRAEBNER', '12345678901', 'anderson@email.com', '51999126142', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-30 15:51:11');
INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (2, 'RENÉSIO JAHNKE', 'RENÉSIO JAHNKE', '98765432101', 'renesio@email.com', '51999999999', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-30 15:51:11');
INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (3, 'JULIANO CARDOSO', 'JULIANO CARDOSO', '11111111111', 'juliano@email.com', '51988888888', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-30 15:51:11');
INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (4, 'JOSEANE ELIS SCHAEFERR', 'JOSEANE ELIS SCHAEFERR', '22222222222', 'joseane@email.com', '51987654321', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-30 15:51:11');
INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (5, 'CLIENTE TESTE 1', 'CLIENTE TESTE 1', '33333333333', 'teste1@email.com', '51999999999', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-31 10:41:54');
INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (6, 'CLIENTE TESTE 2', 'CLIENTE TESTE 2', '44444444444', 'teste2@email.com', '51988888888', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-31 10:41:54');
INSERT INTO `clientes` (`id`, `nome`, `razao_social`, `cpf_cnpj`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, `observacoes`, `criado_em`) VALUES (7, 'CLIENTE TESTE 3', 'CLIENTE TESTE 3', '55555555555', 'teste3@email.com', '51987654321', '-', 'Porto Alegre', 'RS', '90000-000', NULL, '2026-03-31 10:41:54');

-- ============================================================
-- Table: empresa_dados
-- ============================================================

DROP TABLE IF EXISTS `empresa_dados`;

CREATE TABLE `empresa_dados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255),
  `razao_social` varchar(255),
  `cnpj` varchar(20),
  `endereco` text,
  `telefone` varchar(20),
  `email` varchar(255),
  `website` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `empresa_dados` (`id`, `nome`, `razao_social`, `cnpj`, `endereco`, `telefone`, `email`, `website`) VALUES (1, 'EP Soluções', 'EP SOLUÇÕES LTDA', '12345678000190', 'Rua Exemplo, 123 - Porto Alegre, RS', '51999999999', 'contato@epsolutions.com.br', 'www.epsolutions.com.br');

-- ============================================================
-- Table: pedido_cartuchos
-- ============================================================

DROP TABLE IF EXISTS `pedido_cartuchos`;

CREATE TABLE `pedido_cartuchos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `cartucho_id` int NOT NULL,
  `codigo` varchar(50),
  `peso_chegada` decimal(10,2),
  `peso_saida` decimal(10,2),
  `protegido` tinyint(1) DEFAULT 0,
  `observacoes` text,
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `cartucho_id` (`cartucho_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (1, 1, 1, '5844517231435444', 37.29, NULL, 0, NULL, '2026-03-30 15:51:11');
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (2, 2, 2, '6549841665131651', NULL, NULL, 0, NULL, '2026-03-30 15:30:13');
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (3, 2, 3, '1254879568743215', 35.03, NULL, 0, NULL, '2026-03-30 15:30:13');
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `observacoes`, `criado_em`) VALUES (4, 3, 4, '2156465156161516', NULL, NULL, 0, NULL, '2026-03-30 15:25:04');

-- ============================================================
-- Table: pedidos
-- ============================================================

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(20) NOT NULL,
  `cliente_id` int NOT NULL,
  `status` varchar(20) DEFAULT 'aberto',
  `desconto` decimal(10,2) DEFAULT 0,
  `observacoes` text,
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  `atualizando_em` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`numero`),
  KEY `cliente_id` (`cliente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `desconto`, `observacoes`, `criado_em`, `atualizando_em`) VALUES (1, '001', 3, 'finalizado', 0.00, NULL, '2026-03-30 15:51:11', '2026-03-30 15:51:11');
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `desconto`, `observacoes`, `criado_em`, `atualizando_em`) VALUES (2, '002', 2, 'finalizado', 0.00, NULL, '2026-03-30 15:30:13', '2026-03-30 15:30:13');
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `desconto`, `observacoes`, `criado_em`, `atualizando_em`) VALUES (3, '003', 1, 'finalizado', 0.00, NULL, '2026-03-30 15:25:04', '2026-03-30 15:25:04');
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `desconto`, `observacoes`, `criado_em`, `atualizando_em`) VALUES (4, '004', 4, 'aberto', 0.00, NULL, '2026-03-31 14:27:02', '2026-03-31 14:27:02');

-- ============================================================
-- Table: reman_order_items
-- ============================================================

DROP TABLE IF EXISTS `reman_order_items`;

CREATE TABLE `reman_order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `cartucho_model_id` int NOT NULL,
  `description_snapshot` varchar(255),
  `model_code_snapshot` varchar(50),
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `cartucho_model_id` (`cartucho_model_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_model_id`, `description_snapshot`, `model_code_snapshot`, `criado_em`) VALUES (1, 180001, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', '2026-03-30 15:51:11');
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_model_id`, `description_snapshot`, `model_code_snapshot`, `criado_em`) VALUES (2, 150002, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', '2026-03-30 15:30:13');
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_model_id`, `description_snapshot`, `model_code_snapshot`, `criado_em`) VALUES (3, 150002, 2, 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 667 CL', '2026-03-30 15:30:13');
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_model_id`, `description_snapshot`, `model_code_snapshot`, `criado_em`) VALUES (4, 150001, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', '2026-03-30 15:25:04');

-- ============================================================
-- Table: reman_order_units
-- ============================================================

DROP TABLE IF EXISTS `reman_order_units`;

CREATE TABLE `reman_order_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_item_id` int NOT NULL,
  `codigo` varchar(50),
  `status` varchar(20) DEFAULT 'funcionando',
  `peso_saida` decimal(10,2),
  `defeito` text,
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_item_id` (`order_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `reman_order_units` (`id`, `order_item_id`, `codigo`, `status`, `peso_saida`, `defeito`, `criado_em`) VALUES (1, 1, '5844517231435444', 'funcionando', NULL, NULL, '2026-03-30 15:51:11');
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `codigo`, `status`, `peso_saida`, `defeito`, `criado_em`) VALUES (2, 2, '6549841665131651', 'funcionando', 37.29, NULL, '2026-03-30 15:30:13');
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `codigo`, `status`, `peso_saida`, `defeito`, `criado_em`) VALUES (3, 3, '1254879568743215', 'funcionando', 35.03, NULL, '2026-03-30 15:30:13');
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `codigo`, `status`, `peso_saida`, `defeito`, `criado_em`) VALUES (4, 4, '2156465156161516', 'com_problema', NULL, 'CIRCUITO QUEIMADO', '2026-03-30 15:25:04');

-- ============================================================
-- Table: reman_orders
-- ============================================================

DROP TABLE IF EXISTS `reman_orders`;

CREATE TABLE `reman_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `notes` text,
  `status` varchar(20) DEFAULT 'aberto',
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  `atualizando_em` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `reman_orders` (`id`, `order_number`, `notes`, `status`, `criado_em`, `atualizando_em`) VALUES (180001, 'REM-001', 'Gerado automaticamente a partir do Pedido #001', 'finalizado', '2026-03-30 15:51:11', '2026-03-30 15:51:11');
INSERT INTO `reman_orders` (`id`, `order_number`, `notes`, `status`, `criado_em`, `atualizando_em`) VALUES (150002, 'REM-002', 'Gerado automaticamente a partir do Pedido #002', 'finalizado', '2026-03-30 15:30:13', '2026-03-30 15:30:13');
INSERT INTO `reman_orders` (`id`, `order_number`, `notes`, `status`, `criado_em`, `atualizando_em`) VALUES (150001, 'REM-003', 'Gerado automaticamente a partir do Pedido #003', 'finalizado', '2026-03-30 15:25:04', '2026-03-30 15:25:04');

-- ============================================================
-- Table: users
-- ============================================================

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255),
  `role` varchar(20) DEFAULT 'user',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `email`, `name`, `role`, `created_at`) VALUES (1, 'admin@epsolutions.com.br', 'Admin', 'admin', '2026-03-30 15:51:11');
INSERT INTO `users` (`id`, `email`, `name`, `role`, `created_at`) VALUES (2, 'user1@epsolutions.com.br', 'Usuário 1', 'user', '2026-03-30 15:51:11');
INSERT INTO `users` (`id`, `email`, `name`, `role`, `created_at`) VALUES (3, 'user2@epsolutions.com.br', 'Usuário 2', 'user', '2026-03-30 15:51:11');

-- ============================================================
-- End of backup
-- ============================================================

SET FOREIGN_KEY_CHECKS=1;
