create policy "Leitura pública dos produtos"
on "public"."produtos"
as PERMISSIVE
for ALL
to public
using (
    true
);