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