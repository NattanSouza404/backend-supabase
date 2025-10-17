-- View de itens vendidos (a partir dela é possível montar um pedido do cliente)
CREATE VIEW vw_itens_vendidos AS
	SELECT
		ite_ped_id AS id_pedido,
		prd_nome AS produto,
		ite_valor_unitario AS valor_unitario,
		ite_quantidade AS quantidade,
		cli_nome AS cliente,
		ped_created_at AS data_pedido
	FROM
		itens_pedido
		JOIN pedidos ON ped_id = ite_ped_id
		JOIN clientes ON cli_id = ped_cli_id
		JOIN produtos ON prd_id = ite_prd_id
	ORDER BY
		ite_ped_id DESC;

-- Uma view geral sobre os pedidos
CREATE VIEW vw_pedidos AS 
  SELECT
		ped_id AS id_pedido,
		ped_created_at AS data_pedido,
		cli_nome AS nome_cliente,
    	ped_status AS status_pedido,
		SUM(ite_quantidade * ite_valor_unitario) AS valor_total
	FROM
		pedidos
		JOIN clientes ON ped_cli_id = cli_id
		JOIN itens_pedido ON ite_ped_id = ped_id
  GROUP BY
    1, 2, 3, 4
  ORDER BY ped_created_at DESC;