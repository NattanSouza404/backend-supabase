-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.clientes (
  cli_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  cli_nome character varying NOT NULL DEFAULT ''::character varying,
  cli_email character varying NOT NULL,
  cli_telefone character varying NOT NULL,
  cli_created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT clientes_pkey PRIMARY KEY (cli_id)
);

CREATE TABLE public.produtos (
  prd_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  prd_nome character varying NOT NULL,
  prd_preco numeric NOT NULL,
  prd_created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT produtos_pkey PRIMARY KEY (prd_id)
);

CREATE TABLE public.pedidos (
  ped_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  ped_cli_id bigint NOT NULL,
  ped_status character varying NOT NULL,
  ped_created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT pedidos_pkey PRIMARY KEY (ped_id),
  CONSTRAINT pedidos_ped_cli_id_fkey FOREIGN KEY (ped_cli_id) REFERENCES public.clientes(cli_id)
);

CREATE TABLE public.itens_pedido (
  ite_ped_id bigint NOT NULL,
  ite_prd_id bigint NOT NULL,
  ite_quantidade numeric NOT NULL,
  ite_valor_unitario numeric NOT NULL,
  ite_created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT itens_pedido_pkey PRIMARY KEY (ite_ped_id, ite_prd_id),
  CONSTRAINT itens_pedido_ite_ped_id_fkey FOREIGN KEY (ite_ped_id) REFERENCES public.pedidos(ped_id),
  CONSTRAINT itens_pedido_ite_prd_id_fkey FOREIGN KEY (ite_prd_id) REFERENCES public.produtos(prd_id)
);
