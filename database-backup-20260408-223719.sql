mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: gateway05.us-east-1.prod.aws.tidbcloud.com    Database: TEopnpqVFcFcEzDuX7X4dq
-- ------------------------------------------------------
-- Server version	8.0.11-TiDB-v7.5.6-serverless

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__drizzle_migrations`
--

DROP TABLE IF EXISTS `__drizzle_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=664871;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__drizzle_migrations`
--

LOCK TABLES `__drizzle_migrations` WRITE;
/*!40000 ALTER TABLE `__drizzle_migrations` DISABLE KEYS */;
INSERT INTO `__drizzle_migrations` VALUES (1,'814a08e40d7fc2bcfd458759d18319198ca8ae394f2fa15617a78678e9c9c93b',1774458731025);
/*!40000 ALTER TABLE `__drizzle_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartridge_models`
--

DROP TABLE IF EXISTS `cartridge_models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartridge_models`
--

LOCK TABLES `cartridge_models` WRITE;
/*!40000 ALTER TABLE `cartridge_models` DISABLE KEYS */;
INSERT INTO `cartridge_models` VALUES (1,'EPS','EPS 667 BK','EPS 667 BK REMANUFATURADO COM 14ML DE TINTA','PRETO',1,45.00,28.00,NULL,NULL,'2026-03-25 18:16:21','2026-03-25 18:16:21'),(2,'EPS','EPS 667 CL','EPS 667 CL REMANUFATURADO COM 10ML DE TINTA',NULL,1,45.00,28.00,NULL,NULL,'2026-03-25 18:17:18','2026-03-25 18:17:18');
/*!40000 ALTER TABLE `cartridge_models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartuchos_cadastro`
--

DROP TABLE IF EXISTS `cartuchos_cadastro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartuchos_cadastro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo_01` text NOT NULL,
  `modelo_02` text NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price_final_customer` decimal(10,2) DEFAULT NULL,
  `price_reseller` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=180001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartuchos_cadastro`
--

LOCK TABLES `cartuchos_cadastro` WRITE;
/*!40000 ALTER TABLE `cartuchos_cadastro` DISABLE KEYS */;
INSERT INTO `cartuchos_cadastro` VALUES (1,'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA','EPS 667 BK','2026-03-25 19:34:30',45.00,28.00),(2,'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA','EPS 667 CL','2026-03-25 19:34:51',45.00,28.00),(30001,'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA','EPS 122 CL','2026-03-30 12:50:32',45.00,28.00),(30002,'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA','EPS 122 BK','2026-03-30 12:55:34',45.00,28.00),(30003,'EPS PG140 BK REMANUFATURADO COM 14ML DE TINTA','EPS PG140 BK','2026-03-30 13:02:26',55.00,40.00),(60001,'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA','EPS 664 BK','2026-03-31 14:20:45',45.00,28.00),(90001,'EPS 664 CL REMANUFATURADO COM 10ML DE TINTA','EPS 664 CL','2026-03-31 16:00:14',45.00,28.00),(90002,'EPS 21 BK REMANUFATURADO COM 14ML DE TINTA','EPS 21 BK','2026-03-31 16:05:22',45.00,28.00),(120001,'EPS 22 CL REMANUFATURADO COM 10ML DE TINTA','EPS 22 CL','2026-04-02 11:48:58',45.00,28.00),(120002,'EPS 662 BK REMANUFATURADO COM 14ML DE TINTA','EPS 662 BK','2026-04-02 11:52:19',45.00,28.00),(120003,'EPS 662 CL REMANUFATURADO COM 10ML DE TINTA','EPS 662 CL','2026-04-02 12:04:32',45.00,28.00),(150001,'EPS 122 CL REMANUFATURADO COM CARCAÇA E 10ML DE TINTA','EPS 122 CL C/ CARCAÇA','2026-04-08 18:25:12',85.00,65.00);
/*!40000 ALTER TABLE `cartuchos_cadastro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=240001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (30001,'MAICKEL','','','','','','','2026-03-25 19:37:32','CLIENTE_FINAL'),(60001,'JULIANO CARDOSO','(51) 99651-1459','','','','','','2026-03-30 12:49:21','CLIENTE_FINAL'),(60002,'GEPEL','','','','','','','2026-03-30 12:50:46','REVENDA'),(60003,'RENÉSIO JAHNKE','(51)997256342','','','','','','2026-03-30 13:00:46','CLIENTE_FINAL'),(60004,'ANDERSON GRAEBNER','(51)999126142','','','','','','2026-03-30 13:05:57','CLIENTE_FINAL'),(90001,'AMANDA MACHADO DA SILVA','(51) 99702-2106','RUA JULIO DE CASTILHOS, 380','','','','','2026-03-30 18:07:37','CLIENTE_FINAL'),(120001,'JOSEANE ELIS SCHAEFERR','(51) 998850919','RUA 7 DE SETEMBRO 327 APTO 403 - CENTRO - SANTA CRUZ DO SUL','','','','','2026-03-31 14:19:11','CLIENTE_FINAL'),(150001,'SINDILOJAS','(51)','','','','','','2026-03-31 15:56:01','CLIENTE_FINAL'),(150002,'SERGIO BAMPI','(51)998377857','','','','','','2026-03-31 15:57:13','CLIENTE_FINAL'),(150003,'INFOCELL (EVANDRO)','(51)999059723','','','','','','2026-03-31 16:02:32','REVENDA'),(150004,'RANGEL THOMAS','999999999','','','','','','2026-03-31 16:13:03','CLIENTE_FINAL'),(180001,'MIDIS UNIFORMES - MIRIAM','(51) 99961-3632','','','','','DINI 51 981320966','2026-04-07 18:08:52','CLIENTE_FINAL'),(180002,'ELTON BRITO','(51) 99546-2975','','','','','','2026-04-07 18:35:52','CLIENTE_FINAL'),(210001,'CARLA MENEZES','(51) 98055-2593','','','','','','2026-04-08 18:57:08','CLIENTE_FINAL'),(210002,'ROBERTO WEGNER','(51) 99684-9686','','','','','','2026-04-08 19:05:45','CLIENTE_FINAL');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa_dados`
--

DROP TABLE IF EXISTS `empresa_dados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa_dados`
--

LOCK TABLES `empresa_dados` WRITE;
/*!40000 ALTER TABLE `empresa_dados` DISABLE KEYS */;
INSERT INTO `empresa_dados` VALUES (1,'espsoluções em impressoras, especializada em epson e bulkink','96845035','Rua Felipe Jacobus Filho','91','Senai','Santa Cruz do Sul','RS','45956776000118','51981964544','(51)981964544','','maickel','https://d2xsxph8kpxj0f.cloudfront.net/310519663476114435/TEopnpqVFcFcEzDuX7X4dq/logos/1775560818023-0n4p3g.png','2026-04-07 11:20:28');
/*!40000 ALTER TABLE `empresa_dados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_cartuchos`
--

DROP TABLE IF EXISTS `pedido_cartuchos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=300001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_cartuchos`
--

LOCK TABLES `pedido_cartuchos` WRITE;
/*!40000 ALTER TABLE `pedido_cartuchos` DISABLE KEYS */;
INSERT INTO `pedido_cartuchos` VALUES (120001,150001,30001,'2694524237647149','24.8','32.9',0,'funcionando','está falhando um pouco no rascunho','2026-03-30 12:56:57'),(120002,150001,30002,'2383508243014226','22.1','37',0,'funcionando','','2026-03-30 12:57:23'),(120003,150002,30003,'06657591L05F33','28.1','40.5',0,'funcionando','','2026-03-30 13:03:40'),(120004,150003,1,'5844517231435444','23.2','36.6',0,'funcionando','','2026-03-30 13:09:23'),(150001,180001,60001,'5091505769805283','21.9','35.8',1,'funcionando','','2026-03-31 15:25:48'),(150002,180001,60001,'5092502173821251','19.4','34.5',1,'funcionando','','2026-03-31 15:26:16'),(150003,210002,90001,'3985514229513642','27.2','33.6',0,'funcionando','+ impr5essora','2026-03-31 16:01:34'),(150004,210003,90002,'1492505384390625','25.5','37.4',0,'funcionando','','2026-03-31 16:07:03'),(150005,210001,2,'5873514257701756','26.1','33.3',0,'funcionando','','2026-03-31 16:10:08'),(150006,210004,1,'5844515210815131','22.8','37.1',0,'funcionando','','2026-03-31 16:12:31'),(210001,270001,60001,'5092502160650335','24.74','36.5',0,'funcionando','','2026-04-07 18:10:21'),(210002,270002,30001,'2694521014756670','32.3',NULL,0,'funcionando','','2026-04-07 18:38:19'),(210003,270002,30002,'2383515151473430','23.4','36.4',0,'funcionando','','2026-04-07 18:38:51'),(240001,270002,150001,'2694524227594639','28','33.2',0,'funcionando','','2026-04-08 18:28:44'),(270001,330001,1,'509203163892100','25.07','35.8',0,'funcionando','','2026-04-08 19:02:07'),(270002,330001,60001,'5092502175075579','37',NULL,0,'circuito_queimado','defeito parte eletrônica','2026-04-08 19:04:00'),(270003,330002,2,'5873514231891830','26.3','33.1',0,'funcionando','','2026-04-08 19:07:42'),(270004,330002,1,'5844517191359393','25.3','36.2',0,'funcionando','','2026-04-08 19:07:42');
/*!40000 ALTER TABLE `pedido_cartuchos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) NOT NULL,
  `cliente_id` int NOT NULL,
  `status` enum('aberto','finalizado') NOT NULL DEFAULT 'aberto',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_finalizacao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `pedidos_numero_unique` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=360001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (150001,'001',60001,'finalizado','2026-03-30 12:51:38','2026-03-30 15:51:12'),(150002,'002',60003,'finalizado','2026-03-30 13:01:02','2026-03-30 15:30:13'),(150003,'003',60004,'finalizado','2026-03-30 13:07:47','2026-03-30 15:25:04'),(180001,'004',120001,'finalizado','2026-03-31 14:19:18','2026-03-31 15:44:18'),(210001,'005',150001,'finalizado','2026-03-31 15:58:19','2026-03-31 19:23:00'),(210002,'006',150002,'finalizado','2026-03-31 15:59:21','2026-03-31 19:23:32'),(210003,'007',150003,'finalizado','2026-03-31 16:06:13','2026-04-07 18:24:15'),(210004,'008',90001,'finalizado','2026-03-31 16:11:08','2026-04-01 09:00:23'),(270001,'009',180001,'finalizado','2026-04-07 18:10:21','2026-04-07 19:16:00'),(270002,'010',180002,'finalizado','2026-04-07 18:37:03','2026-04-08 18:32:22'),(330001,'013',210001,'finalizado','2026-04-08 19:01:35','2026-04-08 20:18:57'),(330002,'014',210002,'finalizado','2026-04-08 19:07:42','2026-04-08 20:24:56');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reman_order_items`
--

DROP TABLE IF EXISTS `reman_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=390001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reman_order_items`
--

LOCK TABLES `reman_order_items` WRITE;
/*!40000 ALTER TABLE `reman_order_items` DISABLE KEYS */;
INSERT INTO `reman_order_items` VALUES (120001,150001,1,'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA','EPS 667 BK',1,45.00,'CLIENTE_FINAL',45.00,'2026-03-30 15:25:04','2026-04-02 22:01:41'),(120002,150002,30003,'EPS PG140 BK REMANUFATURADO COM 14ML DE TINTA','EPS PG140 BK',1,55.00,'CLIENTE_FINAL',55.00,'2026-03-30 15:30:13','2026-04-02 22:01:41'),(150001,180001,30001,'EPS 122 CL REMANUFATURADO COM 10ML DE TINTA','EPS 122 CL',1,45.00,'CLIENTE_FINAL',45.00,'2026-03-30 15:51:11','2026-04-02 22:01:41'),(150002,180001,30002,'EPS 122 BK REMANUFATURADO COM 14ML DE TINTA','EPS 122 BK',1,45.00,'CLIENTE_FINAL',45.00,'2026-03-30 15:51:11','2026-04-02 22:01:41'),(180001,210001,60001,'EPS 664 BK REMANUFATURADO COM 14ML DE TINTA','EPS 664 BK',2,45.00,'CLIENTE_FINAL',90.00,'2026-03-31 15:44:18','2026-04-02 22:01:41'),(210001,240001,2,'EPS 667 CL REMANUFATURADO COM 10ML DE TINTA','EPS 667 CL',1,45.00,'CLIENTE_FINAL',45.00,'2026-03-31 19:23:00','2026-04-02 22:01:41'),(210002,240002,90001,'EPS 664 CL REMANUFATURADO COM 10ML DE TINTA','EPS 664 CL',1,45.00,'CLIENTE_FINAL',45.00,'2026-03-31 19:23:32','2026-04-02 22:01:41'),(240001,240003,1,'EPS 667 BK REMANUFATURADO COM 14ML DE TINTA','EPS 667 BK',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-01 09:00:23','2026-04-02 22:01:41'),(270001,270001,90002,'EPS 21 BK','EPS 21 BK REMANUFATURADO COM 14ML DE TINTA',1,28.00,'REVENDA',28.00,'2026-04-07 18:24:15','2026-04-07 18:24:15'),(300001,300001,60001,'EPS 664 BK','EPS 664 BK REMANUFATURADO COM 14ML DE TINTA',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-07 19:15:59','2026-04-07 19:15:59'),(330003,330001,30001,'EPS 122 CL','EPS 122 CL REMANUFATURADO COM 10ML DE TINTA',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-08 18:32:22','2026-04-08 18:32:22'),(330004,330001,30002,'EPS 122 BK','EPS 122 BK REMANUFATURADO COM 14ML DE TINTA',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-08 18:32:22','2026-04-08 18:32:22'),(360001,360001,1,'EPS 667 BK','EPS 667 BK REMANUFATURADO COM 14ML DE TINTA',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-08 20:18:57','2026-04-08 20:18:57'),(360002,360001,60001,'EPS 664 BK','EPS 664 BK REMANUFATURADO COM 14ML DE TINTA',0,0.00,'CLIENTE_FINAL',0.00,'2026-04-08 20:18:57','2026-04-08 20:18:57'),(360003,360002,1,'EPS 667 BK','EPS 667 BK REMANUFATURADO COM 14ML DE TINTA',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-08 20:24:56','2026-04-08 20:24:56'),(360004,360002,2,'EPS 667 CL','EPS 667 CL REMANUFATURADO COM 10ML DE TINTA',1,45.00,'CLIENTE_FINAL',45.00,'2026-04-08 20:24:56','2026-04-08 20:24:56');
/*!40000 ALTER TABLE `reman_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reman_order_units`
--

DROP TABLE IF EXISTS `reman_order_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=360001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reman_order_units`
--

LOCK TABLES `reman_order_units` WRITE;
/*!40000 ALTER TABLE `reman_order_units` DISABLE KEYS */;
INSERT INTO `reman_order_units` VALUES (90001,120001,1,'5844517231435444','FUNCIONANDO',NULL,36.60,NULL,'2026-03-30 15:25:04','2026-03-30 15:25:04'),(90002,120002,30003,'06657591L05F33','FUNCIONANDO',NULL,40.50,NULL,'2026-03-30 15:30:13','2026-03-30 15:30:13'),(120001,150001,30001,'2694524237647149','FUNCIONANDO',NULL,32.90,NULL,'2026-03-30 15:51:11','2026-03-30 15:51:11'),(120002,150002,30002,'2383508243014226','FUNCIONANDO',NULL,37.00,NULL,'2026-03-30 15:51:11','2026-03-30 15:51:11'),(150001,180001,60001,'5092502173821251','FUNCIONANDO',NULL,34.50,NULL,'2026-03-31 15:44:18','2026-03-31 15:44:18'),(150002,180001,60001,'5091505769805283','FUNCIONANDO',NULL,35.80,NULL,'2026-03-31 15:44:18','2026-03-31 15:44:18'),(180001,210001,2,'5873514257701756','FUNCIONANDO',NULL,33.30,NULL,'2026-03-31 19:23:00','2026-03-31 19:23:00'),(180002,210002,90001,'3985514229513642','FUNCIONANDO',NULL,33.60,NULL,'2026-03-31 19:23:32','2026-03-31 19:23:32'),(210001,240001,1,'5844515210815131','FUNCIONANDO',NULL,37.10,NULL,'2026-04-01 09:00:23','2026-04-01 09:00:23'),(240001,270001,90002,'1492505384390625','FUNCIONANDO',NULL,37.40,NULL,'2026-04-07 18:24:15','2026-04-07 18:24:15'),(270001,300001,60001,'5092502160650335','FUNCIONANDO',NULL,36.50,NULL,'2026-04-07 19:15:59','2026-04-07 19:15:59'),(300003,330003,30001,'2694521014756670','FUNCIONANDO',NULL,NULL,NULL,'2026-04-08 18:32:22','2026-04-08 18:32:22'),(300004,330004,30002,'2383515151473430','FUNCIONANDO',NULL,36.40,NULL,'2026-04-08 18:32:22','2026-04-08 18:32:22'),(330001,360001,1,'509203163892100','FUNCIONANDO',NULL,35.80,NULL,'2026-04-08 20:18:57','2026-04-08 20:18:57'),(330002,360002,60001,'5092502175075579','COM_PROBLEMA','CIRCUITO QUEIMADO',NULL,NULL,'2026-04-08 20:18:57','2026-04-08 20:18:57'),(330003,360003,1,'5844517191359393','FUNCIONANDO',NULL,36.20,NULL,'2026-04-08 20:24:56','2026-04-08 20:24:56'),(330004,360004,2,'5873514231891830','FUNCIONANDO',NULL,33.10,NULL,'2026-04-08 20:24:56','2026-04-08 20:24:56');
/*!40000 ALTER TABLE `reman_order_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reman_orders`
--

DROP TABLE IF EXISTS `reman_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=390001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reman_orders`
--

LOCK TABLES `reman_orders` WRITE;
/*!40000 ALTER TABLE `reman_orders` DISABLE KEYS */;
INSERT INTO `reman_orders` VALUES (150001,'REM-003',60004,'CLIENTE_FINAL','finalizado',45.00,0.00,45.00,'Gerado automaticamente a partir do Pedido #003','2026-03-30 15:25:04','2026-03-30 15:25:04'),(150002,'REM-002',60003,'CLIENTE_FINAL','finalizado',55.00,0.00,55.00,'Gerado automaticamente a partir do Pedido #002','2026-03-30 15:30:13','2026-03-30 15:30:13'),(180001,'REM-001',60001,'CLIENTE_FINAL','finalizado',90.00,0.00,90.00,'Gerado automaticamente a partir do Pedido #001','2026-03-30 15:51:11','2026-03-30 15:51:11'),(210001,'REM-004',120001,'CLIENTE_FINAL','finalizado',90.00,0.00,90.00,'Gerado automaticamente a partir do Pedido #004','2026-03-31 15:44:18','2026-03-31 15:44:18'),(240001,'REM-005',150001,'CLIENTE_FINAL','finalizado',45.00,0.00,45.00,'Gerado automaticamente a partir do Pedido #005','2026-03-31 19:23:00','2026-03-31 19:23:00'),(240002,'REM-006',150002,'CLIENTE_FINAL','finalizado',45.00,0.00,45.00,'Gerado automaticamente a partir do Pedido #006','2026-03-31 19:23:32','2026-03-31 19:23:32'),(240003,'REM-008',90001,'CLIENTE_FINAL','finalizado',45.00,0.00,45.00,'Gerado automaticamente a partir do Pedido #008','2026-03-31 19:24:59','2026-04-01 09:00:23'),(270001,'REM-007',150003,'REVENDA','finalizado',28.00,0.00,28.00,'Gerado automaticamente a partir do Pedido #007','2026-04-07 18:24:15','2026-04-07 18:24:15'),(300001,'REM-009',180001,'CLIENTE_FINAL','aberto',45.00,0.00,45.00,'Gerado automaticamente a partir do Pedido #009','2026-04-07 19:11:28','2026-04-07 19:15:59'),(330001,'REM-010',180002,'CLIENTE_FINAL','finalizado',0.00,0.00,0.00,'Gerado automaticamente a partir do Pedido #010','2026-04-08 18:29:11','2026-04-08 18:31:38'),(360001,'REM-013',210001,'CLIENTE_FINAL','finalizado',45.00,0.00,45.00,'Gerado automaticamente a partir do Pedido #013','2026-04-08 20:18:57','2026-04-08 20:18:57'),(360002,'REM-014',210002,'CLIENTE_FINAL','finalizado',90.00,0.00,90.00,'Gerado automaticamente a partir do Pedido #014','2026-04-08 20:24:56','2026-04-08 20:24:56');
/*!40000 ALTER TABLE `reman_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=2280001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jp8XBSAUpmpkXYKBnawhFF','rosislei','rosislei@construirs.shop','email','admin','2026-03-25 17:32:59','2026-04-09 02:35:24','2026-04-09 02:35:23'),(210001,'nBXrVpYw7fuPYCJD8nHwPD','MAICKEL CASSIEL FREDRICH','epsolucoesemimpressoras@gmail.com','google','user','2026-03-28 20:51:37','2026-04-08 19:08:40','2026-04-08 19:08:40'),(390002,'CuM6zNKpBRWxRXm28iQmjW','mAICKEL mANSON','maickelmanson@gmail.com','google','user','2026-03-30 15:22:49','2026-04-06 12:37:32','2026-04-06 12:37:33'),(810043,'4Uqhfe4TkMNuBTGRoSLhrc','MAICKEL CASSIEL FREDRICH','msassistenciaepson@gmail.com','google','user','2026-04-01 09:01:52','2026-04-08 21:21:53','2026-04-08 21:21:54'),(960004,'8yPBBciGw3FPUdQTtKLFGE','EPS SOLUÇÕES EM IMPRESSORAS','mstonerecartucho@gmail.com','google','user','2026-04-01 12:27:01','2026-04-02 17:41:18','2026-04-02 17:41:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-08 22:37:20
