# Backend Supabase

Esse projeto é uma estrutura de um backend para um ecommerce, usando os recursos do Supabase. Para realizar requisições para a API, foi utilizado o Postman.

Também foram adicionados inserts de SQL, e outros comandos, para facilitar os testes.

## Principais funcionalidades

1. Tabelas para gerenciar clientes, produtos e pedidos

2. Implementação de Row-Level Security (RLS), garantido que os dados sejam acessados de forma segura

3. Funções de automatização de processos no banco de dados (cálculo de total de pedidos e atualização de status)

4. Consulta de dados de forma eficiente usando Views

5. Automação de tarefas Edge Functions (envio de e-mails de confirmação, ​exportação de um csv do pedido de um cliente)

## Tecnologias
- Supabase
- Postman
- Resend

## Testes
### SQL
Disponíveis [aqui](./backend/comandos_para_testes.sql).

### Postman
Disponíveis [aqui](./backend/testes_postman.md).

## Referências
[Documentação Oficial Supabase](https://supabase.com/docs)

[Documentação Oficial Supabase - Select Supabase](https://supabase.com/docs/reference/javascript/select)

[Resend - Onboarding](https://resend.com/onboarding)
