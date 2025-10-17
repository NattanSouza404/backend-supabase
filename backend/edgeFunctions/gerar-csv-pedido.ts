import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

Deno.serve(async (req: Request) => {
  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const url = new URL(req.url);
    const id_pedido = url.searchParams.get("id_pedido");

    const { data, error } = await supabaseAdmin
      .from("vw_itens_vendidos")
      .select("id_pedido, produto, valor_unitario, quantidade, cliente, data_pedido")
      .eq('id_pedido', id_pedido)
    
    if (error){
      throw error;
    }

    const csv = toCSV(data);

    const filename = `pedidos_export_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`;
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err?.message ?? String(err) }), { status: 500 });
  }
});

function toCSV<T extends Record<string, any>>(data: T[]): string {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map(obj =>
    headers.map(h => JSON.stringify(obj[h] ?? "")).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}