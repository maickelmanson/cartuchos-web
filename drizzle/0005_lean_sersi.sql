CREATE TABLE `cartridge_models` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brand` varchar(100) NOT NULL,
	`model_code` varchar(50) NOT NULL,
	`description` text,
	`color` varchar(50),
	`active` tinyint NOT NULL DEFAULT 1,
	`price_final_customer` decimal(10,2) NOT NULL,
	`price_reseller` decimal(10,2) NOT NULL,
	`cost_price` decimal(10,2),
	`notes` text,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	`atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cartridge_models_id` PRIMARY KEY(`id`),
	CONSTRAINT `cartridge_models_model_code_unique` UNIQUE(`model_code`)
);
--> statement-breakpoint
CREATE TABLE `reman_order_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`cartridge_model_id` int NOT NULL,
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
	`cartridge_model_id` int NOT NULL,
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
--> statement-breakpoint
ALTER TABLE `clientes` ADD `commercial_profile` enum('CLIENTE_FINAL','REVENDA') DEFAULT 'CLIENTE_FINAL' NOT NULL;