CREATE TABLE `cartuchos_cadastro` (
	`id` int AUTO_INCREMENT NOT NULL,
	`modelo_01` text NOT NULL,
	`modelo_02` text NOT NULL,
	`price_final_customer` decimal(10,2),
	`price_reseller` decimal(10,2),
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cartuchos_cadastro_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` text NOT NULL,
	`telefone` varchar(20),
	`endereco` text,
	`cpf` varchar(14),
	`cnpj` varchar(18),
	`inscricao_estadual` varchar(20),
	`commercial_profile` enum('CLIENTE_FINAL','REVENDA') NOT NULL DEFAULT 'CLIENTE_FINAL',
	`observacoes` text,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `clientes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `empresa_dados` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresa` text,
	`cep` varchar(10),
	`endereco` text,
	`numero` varchar(10),
	`bairro` text,
	`cidade` text,
	`estado` varchar(50),
	`cnpj_cpf` varchar(20),
	`telefone` varchar(20),
	`celular` varchar(20),
	`email` varchar(320),
	`nome` text,
	`logo_url` text,
	`atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `empresa_dados_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `error_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`error_type` varchar(100) NOT NULL,
	`error_message` text NOT NULL,
	`error_stack` text,
	`context` json,
	`severity` enum('baixa','media','alta','critica') NOT NULL DEFAULT 'media',
	`resolved` boolean NOT NULL DEFAULT false,
	`resolved_at` timestamp,
	`resolved_by` int,
	`notes` text,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	`atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `error_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedido_cartuchos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pedido_id` int NOT NULL,
	`cartucho_id` int,
	`codigo` varchar(100),
	`peso_chegada` varchar(20),
	`peso_saida` varchar(20),
	`protegido` tinyint NOT NULL DEFAULT 0,
	`status` enum('em_espera','em_andamento','processo','funcionando','circuito_queimado','defeito_cabeca') NOT NULL DEFAULT 'em_espera',
	`observacoes` text,
	`data_inclusao` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pedido_cartuchos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedidos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`numero` varchar(10) NOT NULL,
	`cliente_id` int NOT NULL,
	`status` enum('aberto','finalizado') NOT NULL DEFAULT 'aberto',
	`data_criacao` timestamp NOT NULL DEFAULT (now()),
	`data_finalizacao` timestamp,
	CONSTRAINT `pedidos_id` PRIMARY KEY(`id`),
	CONSTRAINT `pedidos_numero_unique` UNIQUE(`numero`)
);
--> statement-breakpoint
CREATE TABLE `reman_order_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`cartucho_id` int NOT NULL,
	`description_snapshot` text,
	`model_code_snapshot` varchar(50),
	`quantity` int NOT NULL,
	`unit_price` decimal(10,2) NOT NULL,
	`price_source` enum('CLIENTE_FINAL','REVENDA') NOT NULL,
	`line_total` decimal(12,2) NOT NULL,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	`atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reman_order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reman_order_units` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_item_id` int NOT NULL,
	`cartucho_id` int NOT NULL,
	`unit_code` varchar(100) NOT NULL,
	`status` enum('FUNCIONANDO','COM_PROBLEMA') NOT NULL,
	`defect_type` varchar(100),
	`output_weight` decimal(8,2),
	`notes` text,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	`atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reman_order_units_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reman_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_number` varchar(20) NOT NULL,
	`cliente_id` int NOT NULL,
	`commercial_profile_snapshot` varchar(20) NOT NULL,
	`status` enum('aberto','em_processamento','finalizado','cancelado') NOT NULL DEFAULT 'aberto',
	`subtotal` decimal(12,2) NOT NULL DEFAULT '0',
	`discount` decimal(12,2) NOT NULL DEFAULT '0',
	`total` decimal(12,2) NOT NULL DEFAULT '0',
	`notes` text,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	`atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reman_orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `reman_orders_order_number_unique` UNIQUE(`order_number`)
);
