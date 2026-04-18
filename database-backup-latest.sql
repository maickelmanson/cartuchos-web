-- ============================================================
-- Database Backup: Cartuchos Web
-- Generated: 2026-04-18T09:26:03.946Z
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=210001;

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
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (150001, 'EPS 122 CL REMANUFATURADO COM CARCAÇA E 10ML DE TINTA', 'EPS 122 CL C/ CARCAÇA', Wed Apr 08 2026 18:25:12 GMT-0400 (Eastern Daylight Time), '85.00', '65.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (180001, 'EPS 60 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 60 CL', Thu Apr 09 2026 15:54:03 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');
INSERT INTO `cartuchos_cadastro` (`id`, `modelo_01`, `modelo_02`, `criado_em`, `price_final_customer`, `price_reseller`) VALUES (180002, 'EPS 60 BK REMANUFATURADO COM 10ML DE TINTA', 'EPS 60 BK', Thu Apr 09 2026 15:54:25 GMT-0400 (Eastern Daylight Time), '45.00', '28.00');


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
  `telefone2` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=750001;

-- Insert data
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (60001, 'JULIANO CARDOSO', '(51) 99651-1459', '', '', '', '', '', Mon Mar 30 2026 12:49:21 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (60002, 'GEPEL', '', '', '', '', '', '', Mon Mar 30 2026 12:50:46 GMT-0400 (Eastern Daylight Time), 'REVENDA', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (60003, 'RENÉSIO JAHNKE', '(51)997256342', '', '', '', '', '', Mon Mar 30 2026 13:00:46 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (60004, 'ANDERSON GRAEBNER', '(51)999126142', '', '', '', '', '', Mon Mar 30 2026 13:05:57 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (90001, 'AMANDA MACHADO DA SILVA', '(51) 99702-2106', 'RUA JULIO DE CASTILHOS, 380', '', '', '', '', Mon Mar 30 2026 18:07:37 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (120001, 'JOSEANE ELIS SCHAEFERR', '(51) 998850919', 'RUA 7 DE SETEMBRO 327 APTO 403 - CENTRO - SANTA CRUZ DO SUL', '', '', '', '', Tue Mar 31 2026 14:19:11 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (150001, 'SINDILOJAS', '(51)', '', '', '', '', '', Tue Mar 31 2026 15:56:01 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (150002, 'SERGIO BAMPI', '(51)998377857', '', '', '', '', '', Tue Mar 31 2026 15:57:13 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (150003, 'INFOCELL (EVANDRO)', '(51)999059723', '', '', '', '', '', Tue Mar 31 2026 16:02:32 GMT-0400 (Eastern Daylight Time), 'REVENDA', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (150004, 'RANGEL THOMAS', '999999999', '', '', '', '', '', Tue Mar 31 2026 16:13:03 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (180001, 'MIDIS UNIFORMES - MIRIAM', '(51) 99961-3632', '', '', '', '', 'DINI 51 981320966', Tue Apr 07 2026 18:08:52 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (180002, 'ELTON BRITO', '(51) 99546-2975', '', '', '', '', '', Tue Apr 07 2026 18:35:52 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (210001, 'CARLA MENEZES', '(51) 98055-2593', '', '', '', '', '', Wed Apr 08 2026 18:57:08 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (210002, 'ROBERTO WEGNER', '(51) 99684-9686', '', '', '', '', '', Wed Apr 08 2026 19:05:45 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (240001, 'MAICKEL CASSIEL FREDRICH', '(51) 98141-0530', '', '006.995.310-47', '', '', '', Thu Apr 09 2026 02:58:00 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', NULL);
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (270050, 'ASSOCIAÇÃO DE PAIS E AMIGOS APAE', '', '', '', '', '', '', Thu Apr 09 2026 15:32:07 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (270051, 'ALINE - APAE', '', '', '', '', '', '', Thu Apr 09 2026 15:32:18 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (300001, 'MARIELE DURE', '(51) 99615-1079', '', '', '', '', 'eps 667 bk', Thu Apr 09 2026 20:16:21 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (330001, 'ADAM&FRANCO LIBRAS LTDA', '(51) 99325-2535', '', '', '', '', '', Fri Apr 10 2026 14:17:03 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (360001, 'DALVA THIMOTHEO', '(51) 98122-8666', '', '', '', '', '', Fri Apr 10 2026 17:31:10 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (360002, 'DOUGLAS BENCKE', '(51) 99675-8089', '', '', '', '', '', Fri Apr 10 2026 17:38:36 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (390001, 'SILVIO THOMAS', '(51) 99198-0064', '', '', '', '', '', Fri Apr 10 2026 18:33:18 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (420001, 'CARINE METZ', '(51) 99681-2857', 'RUA VENEZUELA, 641 ARROIO GRANDE SCS', '', '', '', '', Tue Apr 14 2026 17:15:20 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (450001, 'MAURICIO MERGEN', '(51) 99724-0999', '', '', '', '', '', Tue Apr 14 2026 17:35:07 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (480001, 'ANDRE LUIZ PEREIRA (TRANSVIDA TRANSPORTES LTDA)', '(51) 99956-0584', '', '', '10.785.930/0001-51', '', '', Tue Apr 14 2026 17:51:43 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (510001, 'DANIEL EICK ', '(51) 99834-8017', '', '', '', '', '', Tue Apr 14 2026 20:04:08 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (540001, 'SABRINA NETTO GOMES', '', '', '', '', '', '', Wed Apr 15 2026 12:34:00 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (570001, 'FABIO DA ROSA', '(51) 98199-1564', '', '', '', '', '', Thu Apr 16 2026 12:27:56 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (600001, 'SILVANA ROSA', '(51) 99778-1730', '', '', '', '', '', Thu Apr 16 2026 12:53:40 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (630001, 'ALEXANDRA OLIVEIRA GOMES DA SILVA', '(51) 99591-4689', '', '', '', '', '', Fri Apr 17 2026 13:20:57 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (660001, 'PEDRO CHABAT', '(51) 99888-0159', '', '', '', '', '', Fri Apr 17 2026 14:14:30 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (690001, 'JOSÉ RONI GONÇALVES', '(51) 99994-7010', '', '', '', '', '', Fri Apr 17 2026 14:45:52 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (720001, 'SERGIO BENCKE', '(51) 98039-7151', '', '', '', '', '', Fri Apr 17 2026 19:23:18 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');
INSERT INTO `clientes` (`id`, `nome`, `telefone`, `endereco`, `cpf`, `cnpj`, `inscricao_estadual`, `observacoes`, `criado_em`, `commercial_profile`, `telefone2`) VALUES (720002, 'GILMAR ROWEDDER', '(51) 99997-5540', '', '', '', '', '', Fri Apr 17 2026 19:27:57 GMT-0400 (Eastern Daylight Time), 'CLIENTE_FINAL', '');


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
INSERT INTO `empresa_dados` (`id`, `empresa`, `cep`, `endereco`, `numero`, `bairro`, `cidade`, `estado`, `cnpj_cpf`, `telefone`, `celular`, `email`, `nome`, `logo_url`, `atualizado_em`) VALUES (1, 'epsoluções em impressoras, especializada em epson e bulkink', '96845035', 'Rua Felipe Jacobus Filho', '91', 'Senai', 'Santa Cruz do Sul', 'RS', '45956776000118', '(51) 98116-1239', '(51) 98116-1239', '', 'maickel', 'https://d2xsxph8kpxj0f.cloudfront.net/310519663476114435/TEopnpqVFcFcEzDuX7X4dq/logos/1775560818023-0n4p3g.png', Thu Apr 16 2026 13:54:20 GMT-0400 (Eastern Daylight Time));


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=780001;

-- Insert data
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120001, 150001, 30001, '2694524237647149', '24.8', '32.9', 0, 'funcionando', 'está falhando um pouco no rascunho', Mon Mar 30 2026 12:56:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120002, 150001, 30002, '2383508243014226', '22.1', '37', 0, 'funcionando', '', Mon Mar 30 2026 12:57:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120003, 150002, 30003, '06657591L05F33', '28.1', '40.5', 0, 'funcionando', '', Mon Mar 30 2026 13:03:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (120004, 150003, 1, '5844517231435444', '23.2', '36.6', 0, 'funcionando', '', Mon Mar 30 2026 13:09:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150001, 180001, 60001, '5091505769805283', '21.9', '35.8', 1, 'funcionando', '', Tue Mar 31 2026 15:25:48 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150002, 180001, 60001, '5092502173821251', '19.4', '34.5', 1, 'funcionando', '', Tue Mar 31 2026 15:26:16 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150003, 210002, 90001, '3985514229513642', '27.2', '33.6', 0, 'funcionando', '+ impr5essora', Tue Mar 31 2026 16:01:34 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150004, 210003, 90002, '1492505384390625', '25.5', '37.4', 0, 'funcionando', '', Tue Mar 31 2026 16:07:03 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150005, 210001, 2, '5873514257701756', '26.1', '33.3', 0, 'funcionando', '', Tue Mar 31 2026 16:10:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (150006, 210004, 1, '5844515210815131', '22.8', '37.1', 0, 'funcionando', '', Tue Mar 31 2026 16:12:31 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (210001, 270001, 60001, '5092502160650335', '24.74', '36.5', 0, 'funcionando', '', Tue Apr 07 2026 18:10:21 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (210002, 270002, 30001, '2694521014756670', '32.3', NULL, 0, 'funcionando', '', Tue Apr 07 2026 18:38:19 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (210003, 270002, 30002, '2383515151473430', '23.4', '36.4', 0, 'funcionando', '', Tue Apr 07 2026 18:38:51 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (240001, 270002, 150001, '2694524227594639', '28', '33.2', 0, 'funcionando', '', Wed Apr 08 2026 18:28:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (270001, 330001, 1, '509203163892100', '25.07', '35.8', 0, 'funcionando', '', Wed Apr 08 2026 19:02:07 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (270002, 330001, 60001, '5092502175075579', '37', NULL, 0, 'circuito_queimado', 'defeito parte eletrônica', Wed Apr 08 2026 19:04:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (270003, 330002, 2, '5873514231891830', '26.3', '33.1', 0, 'funcionando', '', Wed Apr 08 2026 19:07:42 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (270004, 330002, 1, '5844517191359393', '25.3', '36.2', 0, 'funcionando', '', Wed Apr 08 2026 19:07:42 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (330001, 390001, 180001, '2474518861941466', '', '27.6', 0, 'funcionando', 'NATHÁLIA - RECEPÇÃO', Thu Apr 09 2026 15:52:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (330002, 390002, 60001, '5092502221004828', '26.4', '25.4', 0, 'funcionando', '', Thu Apr 09 2026 16:13:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (360001, 390001, 180002, '1737581726505034', '13.4', '37', 0, 'funcionando', 'Nathalia- eps 60 bk', Thu Apr 09 2026 20:08:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (360002, 390001, 180001, '2474518261118493', NULL, '31.5', 0, 'funcionando', 'aline - eps 60 cl', Thu Apr 09 2026 20:13:21 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (360003, 420001, 2, '5873514241901350', '25.2', '34.3', 0, 'funcionando', '', Thu Apr 09 2026 20:22:02 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (360004, 420002, 1, '5844517219594185', '22.8', '36.9', 0, 'funcionando', '', Thu Apr 09 2026 20:25:02 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (390001, 450001, 2, '5873514197964485', '25.5', '34.9', 0, 'funcionando', 'CAIXA DE ACRÍLICO', Fri Apr 10 2026 14:19:07 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (390002, 450001, 1, '5844517162815727', '28.7', '36', 0, 'funcionando', '', Fri Apr 10 2026 14:19:07 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (420001, 480001, 90002, '2040505389100446', '25', '37.4', 0, 'funcionando', '', Fri Apr 10 2026 17:33:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (420002, 480001, 120001, '2690519468663085', '32.1', '42.3', 0, 'funcionando', '', Fri Apr 10 2026 17:33:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (420003, 480002, 2, '5873526198983616', '25.1', '34.7', 0, 'funcionando', 'CAIXA DE ACRÍLICO', Fri Apr 10 2026 17:39:27 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (450001, 510001, 30001, '2694524210155576', '27.3', '35', 0, 'funcionando', 'UTILIZAR NA QUALIDADE DE IMPRESSÃO NORMAL.', Fri Apr 10 2026 18:34:26 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (480001, 540001, 1, '5844515213420429', '25.1', '36.7', 0, 'funcionando', 'cabeça de impressão apresentando falhas', Tue Apr 14 2026 17:16:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (510001, 570001, 1, '5444517191367746', '27.5', '36.8', 0, 'funcionando', '', Tue Apr 14 2026 17:46:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (510002, 570001, 2, '5873514231244229', '27.4', '33.5', 0, 'funcionando', '', Tue Apr 14 2026 17:46:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (510003, 570002, 180002, '1737581727295371', '30.9', '36.8', 0, 'funcionando', '', Tue Apr 14 2026 17:52:27 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (540001, 600001, 90002, '1492505402181393', '22.4', '36.9', 0, 'funcionando', '', Tue Apr 14 2026 20:05:25 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (600001, 660001, 2, '5873514264463179', '27.3', '33', 0, 'funcionando', '', Thu Apr 16 2026 12:30:06 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (600002, 660001, 1, '5844517223382291', '23.2', '36.6', 0, 'funcionando', '', Thu Apr 16 2026 12:30:06 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (630001, 690001, 1, '5844517219575284', '35.3', '36.8', 0, 'funcionando', '', Thu Apr 16 2026 12:54:27 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (660001, 720001, 60001, '5092603157599395', '25.3', '36.6', 0, 'funcionando', '', Fri Apr 17 2026 13:22:17 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (690001, 750001, 60001, '5091554061707534', '25.2', '35.1', 0, 'funcionando', '', Fri Apr 17 2026 14:17:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (690002, 750001, 90001, '3985521127508145', '25.5', '33.7', 0, 'funcionando', '', Fri Apr 17 2026 14:17:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (720001, 780001, 120003, '2694524210113128', '25.5', '33.2', 0, 'funcionando', '', Fri Apr 17 2026 14:47:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (720002, 780001, 120002, '2383508234135193', '26.1', '37', 0, 'funcionando', '', Fri Apr 17 2026 14:47:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (750001, 810001, 30002, '2383554016583656', NULL, '37', 0, 'funcionando', '', Fri Apr 17 2026 19:24:09 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedido_cartuchos` (`id`, `pedido_id`, `cartucho_id`, `codigo`, `peso_chegada`, `peso_saida`, `protegido`, `status`, `observacoes`, `data_inclusao`) VALUES (750002, 810002, 90002, '3573481020', '33.9', '36.6', 0, 'funcionando', '', Fri Apr 17 2026 19:36:57 GMT-0400 (Eastern Daylight Time));


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=840001;

-- Insert data
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (150001, '001', 60001, 'finalizado', Mon Mar 30 2026 12:51:38 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:51:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (150002, '002', 60003, 'finalizado', Mon Mar 30 2026 13:01:02 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (150003, '003', 60004, 'finalizado', Mon Mar 30 2026 13:07:47 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (180001, '004', 120001, 'finalizado', Tue Mar 31 2026 14:19:18 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210001, '005', 150001, 'finalizado', Tue Mar 31 2026 15:58:19 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210002, '006', 150002, 'finalizado', Tue Mar 31 2026 15:59:21 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210003, '007', 150003, 'finalizado', Tue Mar 31 2026 16:06:13 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (210004, '008', 90001, 'finalizado', Tue Mar 31 2026 16:11:08 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (270001, '009', 180001, 'finalizado', Tue Apr 07 2026 18:10:21 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 19:16:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (270002, '010', 180002, 'finalizado', Tue Apr 07 2026 18:37:03 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (330001, '013', 210001, 'finalizado', Wed Apr 08 2026 19:01:35 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (330002, '014', 210002, 'finalizado', Wed Apr 08 2026 19:07:42 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (390001, '015', 270050, 'finalizado', Thu Apr 09 2026 15:52:40 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (390002, '016', 270051, 'finalizado', Thu Apr 09 2026 16:13:40 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (420001, '017', 90001, 'finalizado', Thu Apr 09 2026 20:22:02 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:21:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (420002, '018', 300001, 'finalizado', Thu Apr 09 2026 20:25:02 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 13:55:29 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (450001, '019', 330001, 'finalizado', Fri Apr 10 2026 14:19:07 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (480001, '020', 360001, 'finalizado', Fri Apr 10 2026 17:33:22 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:21:09 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (480002, '021', 360002, 'finalizado', Fri Apr 10 2026 17:39:27 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:22:33 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (510001, '022', 390001, 'finalizado', Fri Apr 10 2026 18:34:25 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (540001, '023', 420001, 'finalizado', Tue Apr 14 2026 17:16:31 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:37:07 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (570001, '024', 450001, 'finalizado', Tue Apr 14 2026 17:46:11 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:27:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (570002, '025', 480001, 'finalizado', Tue Apr 14 2026 17:52:27 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:26:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (600001, '026', 510001, 'finalizado', Tue Apr 14 2026 20:05:25 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 20:05:34 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (660001, '027', 570001, 'finalizado', Thu Apr 16 2026 12:30:06 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:45:47 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (690001, '028', 600001, 'finalizado', Thu Apr 16 2026 12:54:27 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:47:02 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (720001, '029', 630001, 'finalizado', Fri Apr 17 2026 13:22:17 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:13 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (750001, '030', 660001, 'finalizado', Fri Apr 17 2026 14:17:03 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:18:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (780001, '031', 690001, 'finalizado', Fri Apr 17 2026 14:47:44 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (810001, '032', 720001, 'finalizado', Fri Apr 17 2026 19:24:08 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 19:50:45 GMT-0400 (Eastern Daylight Time));
INSERT INTO `pedidos` (`id`, `numero`, `cliente_id`, `status`, `data_criacao`, `data_finalizacao`) VALUES (810002, '033', 720002, 'finalizado', Fri Apr 17 2026 19:36:57 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 20:09:50 GMT-0400 (Eastern Daylight Time));


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=720001;

-- Insert data
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (120001, 150001, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', 1, '45.00', 'CLIENTE_FINAL', '45.00', Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (120002, 150002, 30003, 'EPS PG140 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS PG140 BK', 1, '55.00', 'CLIENTE_FINAL', '55.00', Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (150001, 180001, 30001, 'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 122 CL', 1, '45.00', 'CLIENTE_FINAL', '45.00', Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (150002, 180001, 30002, 'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 122 BK', 1, '45.00', 'CLIENTE_FINAL', '45.00', Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (180001, 210001, 60001, 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 664 BK', 2, '45.00', 'CLIENTE_FINAL', '90.00', Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (210001, 240001, 2, 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 667 CL', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (210002, 240002, 90001, 'EPS 664 CL REMANUFATURADO COM 10ML DE TINTA', 'EPS 664 CL', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (240001, 240003, 1, 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 'EPS 667 BK', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time), Thu Apr 02 2026 22:01:41 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (270001, 270001, 90002, 'EPS 21 BK', 'EPS 21 BK REMANUFATURADO COM 14ML DE TINTA', 1, '28.00', 'REVENDA', '28.00', Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (300001, 300001, 60001, 'EPS 664 BK', 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Apr 07 2026 19:15:59 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 19:15:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (330003, 330001, 30001, 'EPS 122 CL', 'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (330004, 330001, 30002, 'EPS 122 BK', 'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (360001, 360001, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (360002, 360001, 60001, 'EPS 664 BK', 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 0, '0.00', 'CLIENTE_FINAL', '0.00', Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (360003, 360002, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (360004, 360002, 2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (390001, 390001, 180001, 'EPS 60 CL', 'EPS 60 CL REMANUFATURADO COM 10ML DE TINTA', 2, '45.00', 'CLIENTE_FINAL', '90.00', Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (390002, 390001, 180002, 'EPS 60 BK', 'EPS 60 BK REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (420001, 420001, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 13:55:28 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 13:55:28 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (420002, 420002, 60001, 'EPS 664 BK', 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (450001, 450001, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (450002, 450001, 2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (450003, 450002, 2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 19:21:43 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:21:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (450004, 450003, 2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 19:22:32 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:22:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (480001, 480001, 90002, 'EPS 21 BK', 'EPS 21 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (480002, 480001, 120001, 'EPS 22 CL', 'EPS 22 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (480003, 480002, 30001, 'EPS 122 CL', 'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (510001, 510001, 180002, 'EPS 60 BK', 'EPS 60 BK REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Apr 14 2026 19:26:11 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:26:11 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (510002, 510002, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (510003, 510002, 2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (510004, 510003, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Apr 14 2026 19:37:06 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:37:06 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (540001, 540001, 90002, 'EPS 21 BK', 'EPS 21 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Tue Apr 14 2026 20:05:33 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 20:05:33 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (570001, 570001, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (570002, 570001, 2, 'EPS 667 CL', 'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (570003, 570002, 1, 'EPS 667 BK', 'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Thu Apr 16 2026 13:47:01 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:47:01 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (600001, 600001, 60001, 'EPS 664 BK', 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 15:17:12 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (600002, 600002, 60001, 'EPS 664 BK', 'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (600003, 600002, 90001, 'EPS 664 CL', 'EPS 664 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (630001, 630001, 120002, 'EPS 662 BK', 'EPS 662 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (630002, 630001, 120003, 'EPS 662 CL', 'EPS 662 CL REMANUFATURADO COM 10ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (660001, 660001, 30002, 'EPS 122 BK', 'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 19:50:44 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 19:50:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_items` (`id`, `order_id`, `cartucho_id`, `description_snapshot`, `model_code_snapshot`, `quantity`, `unit_price`, `price_source`, `line_total`, `criado_em`, `atualizado_em`) VALUES (690001, 690001, 90002, 'EPS 21 BK', 'EPS 21 BK REMANUFATURADO COM 14ML DE TINTA', 1, '45.00', 'CLIENTE_FINAL', '45.00', Fri Apr 17 2026 20:09:49 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 20:09:49 GMT-0400 (Eastern Daylight Time));


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=690001;

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
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (240001, 270001, 90002, '1492505384390625', 'FUNCIONANDO', NULL, '37.40', NULL, Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (270001, 300001, 60001, '5092502160650335', 'FUNCIONANDO', NULL, '36.50', NULL, Tue Apr 07 2026 19:15:59 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 19:15:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (300003, 330003, 30001, '2694521014756670', 'FUNCIONANDO', NULL, NULL, NULL, Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (300004, 330004, 30002, '2383515151473430', 'FUNCIONANDO', NULL, '36.40', NULL, Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 18:32:22 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (330001, 360001, 1, '509203163892100', 'FUNCIONANDO', NULL, '35.80', NULL, Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (330002, 360002, 60001, '5092502175075579', 'COM_PROBLEMA', 'CIRCUITO QUEIMADO', NULL, NULL, Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (330003, 360003, 1, '5844517191359393', 'FUNCIONANDO', NULL, '36.20', NULL, Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (330004, 360004, 2, '5873514231891830', 'FUNCIONANDO', NULL, '33.10', NULL, Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (360001, 390001, 180001, '2474518261118493', 'FUNCIONANDO', NULL, '31.50', NULL, Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (360002, 390001, 180001, '2474518861941466', 'FUNCIONANDO', NULL, '27.60', NULL, Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (360003, 390002, 180002, '1737581726505034', 'FUNCIONANDO', NULL, '37.00', NULL, Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (390001, 420001, 1, '5844517219594185', 'FUNCIONANDO', NULL, '36.90', NULL, Fri Apr 10 2026 13:55:28 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 13:55:28 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (390002, 420002, 60001, '5092502221004828', 'FUNCIONANDO', NULL, '25.40', NULL, Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (420001, 450001, 1, '5844517162815727', 'FUNCIONANDO', NULL, '36.00', NULL, Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (420002, 450002, 2, '5873514197964485', 'FUNCIONANDO', NULL, '34.90', NULL, Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (420003, 450003, 2, '5873514241901350', 'FUNCIONANDO', NULL, '34.30', NULL, Fri Apr 10 2026 19:21:44 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:21:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (420004, 450004, 2, '5873526198983616', 'FUNCIONANDO', NULL, '34.70', NULL, Fri Apr 10 2026 19:22:32 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:22:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (450001, 480001, 90002, '2040505389100446', 'FUNCIONANDO', NULL, '37.40', NULL, Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (450002, 480002, 120001, '2690519468663085', 'FUNCIONANDO', NULL, '42.30', NULL, Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (450003, 480003, 30001, '2694524210155576', 'FUNCIONANDO', NULL, '35.00', NULL, Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (480001, 510001, 180002, '1737581727295371', 'FUNCIONANDO', NULL, '36.80', NULL, Tue Apr 14 2026 19:26:12 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:26:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (480002, 510002, 1, '5444517191367746', 'FUNCIONANDO', NULL, '36.80', NULL, Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (480003, 510003, 2, '5873514231244229', 'FUNCIONANDO', NULL, '33.50', NULL, Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (480004, 510004, 1, '5844515213420429', 'FUNCIONANDO', NULL, '36.70', NULL, Tue Apr 14 2026 19:37:06 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:37:06 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (510001, 540001, 90002, '1492505402181393', 'FUNCIONANDO', NULL, '36.90', NULL, Tue Apr 14 2026 20:05:33 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 20:05:33 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (540001, 570001, 1, '5844517223382291', 'FUNCIONANDO', NULL, '36.60', NULL, Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (540002, 570002, 2, '5873514264463179', 'FUNCIONANDO', NULL, '33.00', NULL, Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (540003, 570003, 1, '5844517219575284', 'FUNCIONANDO', NULL, '36.80', NULL, Thu Apr 16 2026 13:47:01 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:47:01 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (570001, 600001, 60001, '5092603157599395', 'FUNCIONANDO', NULL, '36.60', NULL, Fri Apr 17 2026 15:17:12 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (570002, 600002, 60001, '5091554061707534', 'FUNCIONANDO', NULL, '35.10', NULL, Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (570003, 600003, 90001, '3985521127508145', 'FUNCIONANDO', NULL, '33.70', NULL, Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (600001, 630001, 120002, '2383508234135193', 'FUNCIONANDO', NULL, '37.00', NULL, Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (600002, 630002, 120003, '2694524210113128', 'FUNCIONANDO', NULL, '33.20', NULL, Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (630001, 660001, 30002, '2383554016583656', 'FUNCIONANDO', NULL, '37.00', NULL, Fri Apr 17 2026 19:50:44 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 19:50:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_order_units` (`id`, `order_item_id`, `cartucho_id`, `unit_code`, `status`, `defect_type`, `output_weight`, `notes`, `criado_em`, `atualizado_em`) VALUES (660001, 690001, 90002, '3573481020', 'FUNCIONANDO', NULL, '36.60', NULL, Fri Apr 17 2026 20:09:49 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 20:09:49 GMT-0400 (Eastern Daylight Time));


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=720001;

-- Insert data
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (150001, 'REM-003', 60004, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #003', Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:25:04 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (150002, 'REM-002', 60003, 'CLIENTE_FINAL', 'finalizado', '55.00', '0.00', '55.00', 'Gerado automaticamente a partir do Pedido #002', Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:30:13 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (180001, 'REM-001', 60001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #001', Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time), Mon Mar 30 2026 15:51:11 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (210001, 'REM-004', 120001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #004', Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 15:44:18 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (240001, 'REM-005', 150001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #005', Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:00 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (240002, 'REM-006', 150002, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #006', Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time), Tue Mar 31 2026 19:23:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (240003, 'REM-008', 90001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #008', Tue Mar 31 2026 19:24:59 GMT-0400 (Eastern Daylight Time), Wed Apr 01 2026 09:00:23 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (270001, 'REM-007', 150003, 'REVENDA', 'finalizado', '28.00', '0.00', '28.00', 'Gerado automaticamente a partir do Pedido #007', Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time), Tue Apr 07 2026 18:24:15 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (300001, 'REM-009', 180001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #009', Tue Apr 07 2026 19:11:28 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 15:50:24 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (330001, 'REM-010', 180002, 'CLIENTE_FINAL', 'finalizado', '0.00', '0.00', '0.00', 'Gerado automaticamente a partir do Pedido #010', Wed Apr 08 2026 18:29:11 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 18:31:38 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (360001, 'REM-013', 210001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #013', Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:18:57 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (360002, 'REM-014', 210002, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #014', Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time), Wed Apr 08 2026 20:24:56 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (390001, 'REM-015', 270050, 'CLIENTE_FINAL', 'finalizado', '135.00', '0.00', '135.00', 'Gerado automaticamente a partir do Pedido #015', Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time), Thu Apr 09 2026 21:03:43 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (420001, 'REM-018', 300001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #018', Fri Apr 10 2026 13:55:28 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 13:55:28 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (420002, 'REM-016', 270051, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #016', Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 14:08:24 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (450001, 'REM-019', 330001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #019', Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:20:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (450002, 'REM-017', 90001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #017', Fri Apr 10 2026 19:21:43 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:21:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (450003, 'REM-021', 360002, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #021', Fri Apr 10 2026 19:22:32 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 19:22:32 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (480001, 'REM-020', 360001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #020', Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:21:08 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (480002, 'REM-022', 390001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #022', Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time), Fri Apr 10 2026 20:33:25 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (510001, 'REM-025', 480001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #025', Tue Apr 14 2026 19:26:11 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:26:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (510002, 'REM-024', 450001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #024', Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:27:40 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (510003, 'REM-023', 420001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #023', Tue Apr 14 2026 19:37:06 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 19:37:06 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (540001, 'REM-026', 510001, 'CLIENTE_FINAL', 'finalizado', '45.00', '45.00', '0.00', 'Gerado automaticamente a partir do Pedido #026', Tue Apr 14 2026 20:05:33 GMT-0400 (Eastern Daylight Time), Tue Apr 14 2026 20:20:54 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (570001, 'REM-027', 570001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #027', Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:45:46 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (570002, 'REM-028', 600001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #028', Thu Apr 16 2026 13:47:01 GMT-0400 (Eastern Daylight Time), Thu Apr 16 2026 13:47:01 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (600001, 'REM-029', 630001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #029', Fri Apr 17 2026 15:17:12 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:12 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (600002, 'REM-030', 660001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #030', Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 15:17:59 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (630001, 'REM-031', 690001, 'CLIENTE_FINAL', 'finalizado', '90.00', '0.00', '90.00', 'Gerado automaticamente a partir do Pedido #031', Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 18:04:05 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (660001, 'REM-032', 720001, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #032', Fri Apr 17 2026 19:50:44 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 19:50:44 GMT-0400 (Eastern Daylight Time));
INSERT INTO `reman_orders` (`id`, `order_number`, `cliente_id`, `commercial_profile_snapshot`, `status`, `subtotal`, `discount`, `total`, `notes`, `criado_em`, `atualizado_em`) VALUES (690001, 'REM-033', 720002, 'CLIENTE_FINAL', 'finalizado', '45.00', '0.00', '45.00', 'Gerado automaticamente a partir do Pedido #033', Fri Apr 17 2026 20:09:49 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 20:09:49 GMT-0400 (Eastern Daylight Time));


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=4440001;

-- Insert data
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (1, 'jp8XBSAUpmpkXYKBnawhFF', 'rosislei', 'rosislei@construirs.shop', 'email', 'admin', Wed Mar 25 2026 17:32:59 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 21:46:19 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 21:46:20 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (210001, 'nBXrVpYw7fuPYCJD8nHwPD', 'MAICKEL CASSIEL FREDRICH', 'epsolucoesemimpressoras@gmail.com', 'google', 'user', Sat Mar 28 2026 20:51:37 GMT-0400 (Eastern Daylight Time), Sat Apr 18 2026 04:58:49 GMT-0400 (Eastern Daylight Time), Sat Apr 18 2026 04:58:50 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (390002, 'CuM6zNKpBRWxRXm28iQmjW', 'mAICKEL mANSON', 'maickelmanson@gmail.com', 'google', 'user', Mon Mar 30 2026 15:22:49 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 22:46:41 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 22:46:42 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (810043, '4Uqhfe4TkMNuBTGRoSLhrc', 'MAICKEL CASSIEL FREDRICH', 'msassistenciaepson@gmail.com', 'google', 'user', Wed Apr 01 2026 09:01:52 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 22:00:36 GMT-0400 (Eastern Daylight Time), Fri Apr 17 2026 22:00:37 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (960004, '8yPBBciGw3FPUdQTtKLFGE', 'EPS SOLUÇÕES EM IMPRESSORAS', 'mstonerecartucho@gmail.com', 'google', 'user', Wed Apr 01 2026 12:27:01 GMT-0400 (Eastern Daylight Time), Sat Apr 18 2026 04:52:35 GMT-0400 (Eastern Daylight Time), Sat Apr 18 2026 04:52:36 GMT-0400 (Eastern Daylight Time));
INSERT INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (4230025, 'k2ihGDdu56WV2HP6ggHdnA', 'Maickel Impressoras Epson', 'smkhkfnqsdsncxnn8tlazx@onmanus.ai', NULL, 'user', Fri Apr 17 2026 22:41:32 GMT-0400 (Eastern Daylight Time), Sat Apr 18 2026 01:46:34 GMT-0400 (Eastern Daylight Time), Sat Apr 18 2026 01:46:34 GMT-0400 (Eastern Daylight Time));


-- ============================================================
-- End of backup
-- ============================================================
SET FOREIGN_KEY_CHECKS=1;
