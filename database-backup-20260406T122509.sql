-- ============================================================
-- Database Backup: Cartuchos Web
-- Generated: 2026-04-06T12:25:09.375Z
-- ============================================================

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


-- ============================================================
-- Table: __drizzle_migrations
-- ============================================================

DROP TABLE IF EXISTS `__drizzle_migrations`;

CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=664871;

-- Insert data
INSERT INTO `__drizzle_migrations` (`id`, `hash`, `created_at`) VALUES (1, '814a08e40d7fc2bcfd458759d18319198ca8ae394f2fa15617a78678e9c9c93b', 1774458731025);


-- ============================================================
-- Table: cartridge_models
-- ============================================================

DROP TABLE IF EXISTS `cartridge_models`;

CREATE TABLE `cartridge_models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(100) NOT NULL,
  `model_code` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `price_final_customer` decimal(10,2) NOT NULL,
  `price_reseller` decimal(10,2) NOT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `cartridge_models_model_code_unique` (`model_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=30001;

-- Insert data
INSERT INTO `cartridge_models` (`id`, `brand`, `model_code`, `description`, `color`, `active`, `price_final_customer`, `price_reseller`, `cost_price`, `notes`, `criado_em`, `atualizado_em`) VALUES (1, 'EPS', 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'PRETO', 1, '45.00', '28.00', NULL, NULL, Wed Mar 25 2026 18:16:21 GMT-0400 (Eastern Daylight Time), Wed Mar 25 2026 18:16:21 GMT-0400 (Eastern Daylight Time));
INSERT INTO `cartridge_models` (`id`, `brand`, `model_code`, `description`, `color`, `active`, `price_final_customer`, `price_reseller`, `cost_price`, `notes`, `criado_em`, `atualizado_em`) VALUES (2, 'EPS', 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', NULL, 1, '45.00', '28.00', NULL, NULL, Wed Mar 25 2026 18:17:18 GMT-0400 (Eastern Daylight Time), Wed Mar 25 2026 18:17:18 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: cartuchos_cadastro
-- ============================================================

DROP TABLE IF EXISTS `cartuchos_cadastro`;

CREATE TABLE `cartuchos_cadastro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo_01` text NOT NULL,
  `modelo_02` text NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price_final_customer` decimal(10,2) DEFAULT NULL,
  `price_reseller` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=150001;

-- Insert data
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', Wed Mar 25 2026 19:34:30 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (2, 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 667 CL', Wed Mar 25 2026 19:34:51 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (30001, 'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 122 CL', Mon Mar 30 2026 12:50:32 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (30002, 'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 122 BK', Mon Mar 30 2026 12:55:34 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (30003, 'EPS PG140 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS PG140 BK', Mon Mar 30 2026 13:02:26 GMT-0400 (Eastern Daylight Time), '55.00', '40.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (60001, 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 664 BK', Tue Mar 31 2026 14:20:45 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (90001, 'EPS 664 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 664 CL', Tue Mar 31 2026 16:00:14 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (90002, 'EPS 21 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 21 BK', Tue Mar 31 2026 16:05:22 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (120001, 'EPS 22 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 22 CL', Thu Apr 02 2026 11:48:58 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (120002, 'EPS 662 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 662 BK', Thu Apr 02 2026 11:52:19 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (120003, 'EPS 662 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 662 CL', Thu Apr 02 2026 12:04:32 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');


-- ============================================================
-- Table: clientes
-- ============================================================

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` text DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `inscricao_estadual` varchar(20) DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `commercial_profile` enum('CLIENTE_FINAL','REVENDA') NOT NULL DEFAULT 'CLIENTE_FINAL',
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=180001;

-- Insert data
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (30001, 'MAICKEL', '', '', '', '', '', '', Wed Mar 25 2026 19:37:32 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (60001, 'JULIANO CARDOSO', '(51) 99651-1459', '', '', '', '', '', Mon Mar 30 2026 12:49:21 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (60002, 'GEPEL', '', '', '', '', '', '', Mon Mar 30 2026 12:50:46 GMT-0400 (Eastern Daylight Time), 'REVENDA');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (60003, 'RENÉSIO JAHNKE', '(51)997256342', '', '', '', '', '', Mon Mar 30 2026 13:00:46 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (60004, 'ANDERSON GRAEBNER', '(51)999126142', '', '', '', '', '', Mon Mar 30 2026 13:05:57 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (90001, 'AMANDA MACHADO DA SILVA', '(51) 99702-2106', 'RUA JULIO DE CASTILHOS, 380', '', '', '', '', Mon Mar 30 2026 18:07:37 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (120001, 'JOSEANE ELIS SCHAEFERR', '(51) 998850919', 'RUA 7 DE SETEMBRO 327 APTO 403 - CENTRO - SANTA CRUZ DO SUL', '', '', '', '', Tue Mar 31 2026 14:19:11 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (150001, 'SINDILOJAS', '(51)', '', '', '', '', '', Tue Mar 31 2026 15:56:01 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (150002, 'SERGIO BAMPI', '(51)998377857', '', '', '', '', '', Tue Mar 31 2026 15:57:13 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (150003, 'INFOCELL (EVANDRO)', '(51)999059723', '', '', '', '', '', Tue Mar 31 2026 16:02:32 GMT-0400 (Eastern Daylight Time), 'REVENDA');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`) VALUES (150004, 'RANGEL THOMAS', '999999999', '', '', '', '', '', Tue Mar 31 2026 16:13:03 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL');


-- ============================================================
-- Table: empresa_dados
-- ============================================================

DROP TABLE IF EXISTS `empresa_dados`;

CREATE TABLE `empresa_dados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empresa` text DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `endereco` text DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `bairro` text DEFAULT NULL,
  `cidade` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `cnpj_cpf` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `nome` text DEFAULT NULL,
  `logo_url` text DEFAULT NULL,
  `atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=30001;

-- Insert data
INSERT INTO `empresa_dados` (`id`, `empresa`, `cep`, `endereco`, `numero`, `bairro`, `cidade`, `estado`, `cnpj_cpf`, `telefone`, `celular`, `email`, `nome`, `logo_url`, `atualizado_em`) VALUES (1, 'espsoluções em impressoras, especializada em epson e bulkink', '96845035', 'Rua Felipe Jacobus Filho', '91', 'Senai', 'Santa Cruz do Sul', 'RS', '45956776000118', '51981964544', '(51)981964544', '', 'maickel', '', Wed Mar 25 2026 20:14:04 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: pedido_cartuchos
-- ============================================================

DROP TABLE IF EXISTS `pedido_cartuchos`;

CREATE TABLE `pedido_cartuchos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `cartucho_id` int DEFAULT NULL,
  `codigo` varchar(100) DEFAULT NULL,
  `peso_chegada` varchar(20) DEFAULT NULL,
  `peso_saida` varchar(20) DEFAULT NULL,
  `protegido` tinyint NOT NULL DEFAULT '0',
  `status` enum('em_espera','em_andamento','processo','funcionando','circuito_queimado','defeito_cabeca') NOT NULL DEFAULT 'em_espera',
  `observacoes` text DEFAULT NULL,
  `data_inclusao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=210001;

-- Insert data
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120001, 150001, 30001, '2694524237647149', '24.8', '32.9', 0, 'funcionando', 'está falhando um pouco no rascunho', Mon Mar 30 2026 12:56:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120002, 150001, 30002, '2383508243014226', '22.1', '37', 0, 'funcionando', '', Mon Mar 30 2026 12:57:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120003, 150002, 30003, '06657591L05F33', '28.1', '40.5', 0, 'funcionando', '', Mon Mar 30 2026 13:03:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120004, 150003, 1, '5844517231435444', '23.2', '36.6', 0, 'funcionando', '', Mon Mar 30 2026 13:09:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150001, 180001, 60001, '5091505769805283', '21.9', '35.8', 1, 'funcionando', '', Tue Mar 31 2026 15:25:48 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150002, 180001, 60001, '5092502173821251', '19.4', '34.5', 1, 'funcionando', '', Tue Mar 31 2026 15:26:16 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150003, 210002, 90001, '3985514229513642', '27.2', '33.6', 0, 'funcionando', '+ impr5essora', Tue Mar 31 2026 16:01:34 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150004, 210003, 90002, '1492505384390625', '25.5', NULL, 0, 'em_espera', '', Tue Mar 31 2026 16:07:03 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150005, 210001, 2, '5873514257701756', '26.1', '33.3', 0, 'funcionando', '', Tue Mar 31 2026 16:10:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150006, 210004, 1, '5844515210815131', '22.8', '37.1', 0, 'funcionando', '', Tue Mar 31 2026 16:12:31 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: pedidos
-- ============================================================

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) NOT NULL,
  `cliente_id` int NOT NULL,
  `status` enum('aberto','finalizado') NOT NULL DEFAULT 'aberto',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_finalizacao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `pedidos_numero_unique` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=270001;

-- Insert data
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (150001, '001', 60001, 'finalizado', Mon Mar 30 2026 12:51:38 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:51:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (150002, '002', 60003, 'finalizado', Mon Mar 30 2026 13:01:02 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (150003, '003', 60004, 'finalizado', Mon Mar 30 2026 13:07:47 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (180001, '004', 120001, 'finalizado', Tue Mar 31 2026 14:19:18 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210001, '005', 150001, 'finalizado', Tue Mar 31 2026 15:58:19 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210002, '006', 150002, 'finalizado', Tue Mar 31 2026 15:59:21 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210003, '007', 150003, 'aberto', Tue Mar 31 2026 16:06:13 GMT-0400 (Eastern Daylight Time), NULL);
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210004, '008', 90001, 'finalizado', Tue Mar 31 2026 16:11:08 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: reman_order_items
-- ============================================================

DROP TABLE IF EXISTS `reman_order_items`;

CREATE TABLE `reman_order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `cartucho_id` int NOT NULL,
  `description_snapshot` text DEFAULT NULL,
  `model_code_snapshot` varchar(50) DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `price_source` enum('CLIENTE_FINAL','REVENDA') NOT NULL,
  `line_total` decimal(12,2) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=270001;

-- Insert data
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (120001, 150001, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', 1, '45.00', 'CLIENTE_FINAL', '45.00', Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (120002, 150002, 30003, 'EPS PG140 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS PG140 BK', 1, '55.00', 'CLIENTE_FINAL', '55.00', Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (150001, 180001, 30001, 'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 122 CL', 1, '45.00', 'CLIENTE_FINAL', '45.00', Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (150002, 180001, 30002, 'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 122 BK', 1, '45.00', 'CLIENTE_FINAL', '45.00', Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (180001, 210001, 60001, 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 664 BK', 2, '45.00', 'CLIENTE_FINAL', '90.00', Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (210001, 240001, 2, 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 667 CL', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (210002, 240002, 90001, 'EPS 664 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 664 CL', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (240001, 240003, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: reman_order_units
-- ============================================================

DROP TABLE IF EXISTS `reman_order_units`;

CREATE TABLE `reman_order_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_item_id` int NOT NULL,
  `cartucho_id` int NOT NULL,
  `unit_code` varchar(100) NOT NULL,
  `status` enum('FUNCIONANDO','COM_PROBLEMA') NOT NULL,
  `defect_type` varchar(100) DEFAULT NULL,
  `output_weight` decimal(8,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=240001;

-- Insert data
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (90001, 120001, 1, '5844517231435444', 'FUNCIONANDO', NULL, '36.60', NULL, Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (90002, 120002, 30003, '06657591L05F33', 'FUNCIONANDO', NULL, '40.50', NULL, Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (120001, 150001, 30001, '2694524237647149', 'FUNCIONANDO', NULL, '32.90', NULL, Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (120002, 150002, 30002, '2383508243014226', 'FUNCIONANDO', NULL, '37.00', NULL, Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (150001, 180001, 60001, '5092502173821251', 'FUNCIONANDO', NULL, '34.50', NULL, Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (150002, 180001, 60001, '5091505769805283', 'FUNCIONANDO', NULL, '35.80', NULL, Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (180001, 210001, 2, '5873514257701756', 'FUNCIONANDO', NULL, '33.30', NULL, Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (180002, 210002, 90001, '3985514229513642', 'FUNCIONANDO', NULL, '33.60', NULL, Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (210001, 240001, 1, '5844515210815131', 'FUNCIONANDO', NULL, '37.10', NULL, Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: reman_orders
-- ============================================================

DROP TABLE IF EXISTS `reman_orders`;

CREATE TABLE `reman_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `cliente_id` int NOT NULL,
  `commercial_profile_snapshot` varchar(20) NOT NULL,
  `status` enum('aberto','em_processamento','finalizado','cancelado') NOT NULL DEFAULT 'aberto',
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0',
  `discount` decimal(12,2) NOT NULL DEFAULT '0',
  `total` decimal(12,2) NOT NULL DEFAULT '0',
  `notes` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `reman_orders_order_number_unique` (`order_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=270001;

-- Insert data
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (150001, 'REM-003', 60004, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #003', Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (150002, 'REM-002', 60003, 'CLIENTE_FINAL', 'finalizado', '55.00', '0.00', '55.00', 'Gerado automaticamente a partir do Pedido #002', Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (180001, 'REM-001', 60001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #001', Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (210001, 'REM-004', 120001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #004', Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (240001, 'REM-005', 150001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #005', Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (240002, 'REM-006', 150002, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #006', Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (240003, 'REM-008', 90001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #008', Tue Mar 31 2026 19:24:59 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- Table: users
-- ============================================================

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` text DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=1560001;

-- Insert data
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (1, 'jp8XBSAUpmpkXYKBnawhFF', 'rosislei', 'rosislei@construirs.shop', 'email', 'admin', Wed Mar 25 2026 17:32:59 GMT-0400 (Eastern Daylight Time), Mon Apr 06 2026 12:25:04 GMT-0400 (Eastern Daylight Time), Mon Apr 06 2026 12:25:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (210001, 'nBXrVpYw7fuPYCJD8nHwPD', 'MAICKEL CASSIEL FREDRICH', 'epsolucoesemimpressoras@gmail.com', 'google', 'user', Sat Mar 28 2026 20:51:37 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 17:42:32 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 17:42:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (390002, 'CuM6zNKpBRWxRXm28iQmjW', 'mAICKEL mANSON', 'maickelmanson@gmail.com', 'google', 'user', Mon Mar 30 2026 15:22:49 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 13:59:35 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 13:59:34 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (810043, '4Uqhfe4TkMNuBTGRoSLhrc', 'MAICKEL CASSIEL FREDRICH', 'msassistenciaepson@gmail.com', 'google', 'user', Wed Apr 01 2026 09:01:52 GMT-0400 (Eastern Daylight Time), Fri Apr 03 2026 22:55:28 GMT-0400 (Eastern Daylight Time), Fri Apr 03 2026 22:55:29 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (960004, '8yPBBciGw3FPUdQTtKLFGE', 'EPS SOLUÇÕES EM IMPRESSORAS', 'mstonerecartucho@gmail.com', 'google', 'user', Wed Apr 01 2026 12:27:01 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 17:41:18 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 17:41:19 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- End of backup
-- ============================================================
SET FOREIGN_KEY_CHECKS=1;
