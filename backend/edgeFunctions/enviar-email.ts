// Setup type definitions for built-in Supabase Runtime APIs
import { createClient } from "npm:@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

/**
 * Essa Edge Function retorna um tabela dos pedidos do e-commerce
 * 
 * API do Resend foi usada para mandar e-mails nessa Edge Function.
 * Foi seguido o template 'Send Emails' do próprio Supabase.
 *
 * É necessário adicionar como secret a váriavel de ambiente 'RESEND_API_KEY'.
 * 
 * Também é necessário colocar no corpo da requisição o e-mail de destino:
 * 
 *    {
 *      "to": "email@exemplo.com"
 *    }
 * 
 */
Deno.serve(async (req: Request)=>{
  
  /**
   * O único atributo extraído do corpo da requisição é o e-mail de destino 'to'.
   * O assunto e a mensagem do e-mail ('subject' e 'html') são construídos no
   * próprio código.
   */
  const { to } = await req.json();

  /**
   * Consulta consultando o banco de dados no supabase, pegando os dados
   * de todos os pedidos do e-commerce
   */
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

  /**
   * Montagem de uma tabela em HTML para acomodar os dados dos pedidos,
   * que será enviada no corpo do e-mail
   */
  const tabela: string = criarTabelaPedidos(data);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: to,
      subject: 'Relatório E-commerce',
      html: `
        <p>
          Boa tarde, aqui está o seu relatório do <strong>e-commerce</strong>!
        </p>

        ${tabela}
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

/**
 * Estilo da borda utilizada na tabela do e-mail
 */
const BORDA = "border: 1px solid #000;";

/**
 * Cria a tabela de pedidos para o e-mail
 * 
 * @param pedidos 
 * @returns 
 */
function criarTabelaPedidos(pedidos: any[]): string {
  const tabela = `
    <table>
      <thead>
        <tr>
          <td style="${BORDA}">Id</td>
          <td style="${BORDA}">Cliente</td>
          <td style="${BORDA}">Data</td>
          <td style="${BORDA}">Status</td>
          <td style="${BORDA}">Valor Pedido</td>
        </tr>
      </thead>
      ${criarCorpoTabelaHTML(pedidos)}
    </table>
  `;

  return tabela;
}

/**
 * Cria o corpo da tabela de pedidos para o e-mail,
 * criando uma linha para cada pedido
 * 
 * @param pedidos 
 * @returns 
 */
function criarCorpoTabelaHTML(pedidos: any[]): string{
  let linhas: string = "";

  pedidos.forEach((pedido: any) => {
    linhas += `
      <tr>
        <td style="${BORDA}">${pedido.id_pedido}</td>
        <td style="${BORDA}">${pedido.nome_cliente}</td>
        <td style="${BORDA}">${pedido.data_pedido}</td>
        <td style="${BORDA}">${pedido.status_pedido}</td>
        <td style="${BORDA}">R$ ${pedido.valor_total}</td>
      </tr>
    `;
  });

  return `
    <tbody>
      ${linhas}
    </tbody>
  `;
}