--
-- 
-- INSERTS
--
--

INSERT INTO
  clientes(cli_nome, cli_email, cli_telefone)
VALUES
  ('Humberto dos Santos', 'humberto@email.com', '11999999999');

-- Adiciona dois produtos para o banco
INSERT INTO produtos(prd_nome, prd_preco) VALUES ('HQ Menino Maluquinho', 30.0);
INSERT INTO produtos(prd_nome, prd_preco) VALUES ('HQ Batman', 54.0);

-- Cria um pedido para o último cliente adicionado
INSERT INTO
  pedidos(ped_status, ped_cli_id)
VALUES (
  'Pendente', 
  (SELECT MAX(cli_id) FROM clientes)
);

-- Adiciona dois itens para esse pedido
INSERT INTO itens_pedido (ite_ped_id, ite_prd_id, ite_quantidade, ite_valor_unitario)
VALUES (
  (SELECT MAX(ped_id) FROM pedidos),
  1,
  2,
  (SELECT prd_preco FROM produtos WHERE prd_id = 1)
);

INSERT INTO itens_pedido (ite_ped_id, ite_prd_id, ite_quantidade, ite_valor_unitario)
VALUES (
  (SELECT MAX(ped_id) FROM pedidos),
  2,
  1,
  (SELECT prd_preco FROM produtos WHERE prd_id = 2)
);


--
--
-- CONSULTAS
--
--

-- Comandos para consultar as tabelas
SELECT * FROM clientes;
SELECT * FROM pedidos;
SELECT * FROM produtos;
SELECT * FROM itens_pedido;

-- Comandos pra consultar Views
SELECT * FROM vw_itens_vendidos;
SELECT * FROM vw_pedidos;


--
-- 
-- CHAMADAS DE FUNÇÃO
--
--

-- Cálcula o total de pedidos realizados
SELECT total_de_pedidos();

-- Atualiza o status de um pedido
SELECT atualizar_status_pedido(
  (SELECT MAX(ped_id) FROM pedidos),
  'Entregue'
);