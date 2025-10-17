-- Função que calcula o total de pedidos do e-commerce
CREATE OR REPLACE FUNCTION total_de_pedidos() RETURNS bigint
LANGUAGE plpgsql
AS $$
DECLARE
  total bigint;
BEGIN
  SELECT COUNT(ped_id) INTO total FROM pedidos;
  RETURN total;
END;
$$;

-- Função que atualiza o status de um pedido. Para chamá-la, deve se informar:
-- 1. id do pedido;
-- 2. novo status do pedido;
CREATE OR REPLACE FUNCTION atualizar_status_pedido(id_pedido numeric, status_pedido varchar) RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE pedidos SET ped_status = status_pedido WHERE ped_id = id_pedido;
END;
$$;