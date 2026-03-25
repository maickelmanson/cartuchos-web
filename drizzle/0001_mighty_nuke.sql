CREATE TABLE `cartuchos_cadastro` (
	`id` int AUTO_INCREMENT NOT NULL,
	`modelo_01` text NOT NULL,
	`modelo_02` text NOT NULL,
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
	`observacoes` text,
	`criado_em` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `clientes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedido_cartuchos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pedido_id` int NOT NULL,
	`cartucho_id` int,
	`codigo` varchar(100),
	`peso_chegada` decimal(10,2),
	`peso_saida` decimal(10,2),
	`protegido` tinyint NOT NULL DEFAULT 0,
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
