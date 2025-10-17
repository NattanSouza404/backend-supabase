// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

Deno.serve(async (req: Request)=>{
  const { to, subject, html } = await req.json();

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error } = await supabaseAdmin
    .from("vw_pedidos")
    .select("id_pedido, nome_cliente, data_pedido, status_pedido, valor_total")
  
  if (error){
    throw error;
  }

  if (!data.length){
    throw Error('Sem registros.');
  }

  let tbody = "";

  data.forEach((d: any) => {
    tbody += `
      <tr>
        <td style="border: 1px solid #00c;">${d.id_pedido}</td>
        <td style="border: 1px solid #00c;">${d.nome_cliente}</td>
        <td style="border: 1px solid #00c;">${d.data_pedido}</td>
        <td style="border: 1px solid #00c;">${d.status_pedido}</td>
        <td style="border: 1px solid #00c;">${d.valor_total}</td>
      </tr>
    `;
  });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'nattanssouzapvz@gmail.com',
      subject: 'Relatório E-commerce',
      html: `
        <p>
          Boa tarde, aqui está o seu relatório do <strong>e-commerce</strong>!
        </p>
        <table>
          <thead>
            <tr>
              <td style="border: 1px solid #00c;">Id</td>
              <td style="border: 1px solid #00c;">Cliente</td>
              <td style="border: 1px solid #00c;">Data</td>
              <td style="border: 1px solid #00c;">Status</td>
              <td style="border: 1px solid #00c;">Valor Pedido</td>
            </tr>
          </thead>
          <tbody>
            ${tbody}
          </tbody>
        </table>
      `
    })
  });
  const dados = await res.json();
  return new Response(JSON.stringify(dados), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
});
