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
