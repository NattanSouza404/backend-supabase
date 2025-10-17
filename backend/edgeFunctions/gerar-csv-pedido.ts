import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

/**
 * Essa Edge Function é responsável por converter um único
 * pedido para o formato CSV, a partir do ID desse pedido.
 * 
 * É necessário adicionar o parâmetro "id_pedido" no corpo da requisição:
 *    {
 *      "id_pedido": 1 
 *    }
 * 
 */
Deno.serve(async (req: Request) => {
  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { id_pedido } = await req.json();

    /**
     * Aqui eu estou consultando os dados da view de 'itens vendidos', filtrando
     * os itens pelo ID de um pedido
     */
    const { data, error } = await supabaseAdmin
      .from("vw_itens_vendidos")
      .select("id_pedido, produto, valor_unitario, quantidade, cliente, data_pedido")
      .eq('id_pedido', id_pedido)
    
    if (error){
      throw error;
    }

    /**
     * Aqui é montada a string num formato de csv, com os cabeçalhos e os valores,
     * separados por vírgulas ','
     */
    const csv = paraCSV(data);

    /**
     * Testei apenas pelo Postman, então ele só retornou uma string de um csv.
     * Mas se for usado em um frontend React, por exemplo, é possível fazer o
     * download do arquivo
     */
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

/**
 * Função responsável por converter os dados para o formato CSV.
 * @param dados 
 * @returns 
 */
function paraCSV<T extends Record<string, any>>(dados: T[]): string {
  if (dados.length === 0) return "";

  const headers = Object.keys(dados[0]);
  const rows = dados.map(obj =>
    headers.map(h => JSON.stringify(obj[h] ?? "")).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}