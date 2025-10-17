
-- Comandos para Ativar a Row Level Security para todas as tabelas
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;


-- Política de leitura dos produtos
-- Produtos podem ser consultados por todos os usuários
create policy "Leitura pública dos produtos"
on "public"."produtos"
as PERMISSIVE
for SELECT
to public
using (
    true
);