# <image height="22px" src="./docs/logo_supabase.png"/> Backend Supabase

Esse projeto é uma estrutura de um backend para um ecommerce, usando os recursos do Supabase. Para realizar requisições para a API, foi utilizado o Postman.

Também foram adicionados inserts de SQL, e outros comandos, para facilitar os testes.

## Principais funcionalidades

1. Tabelas para gerenciar clientes, produtos e pedidos

2. Implementação de Row-Level Security (RLS), garantido que os dados sejam acessados de forma segura

3. Funções de automatização de processos no banco de dados (cálculo de total de pedidos e atualização de status)

4. Consulta de dados de forma eficiente usando Views

5. Automação de tarefas com Edge Functions (envio de e-mails de confirmação, ​exportação de um CSV do pedido de um cliente)

## Tecnologias
- Supabase
- Postman
- Resend

## Como usar o projeto

Para criar o backend, é necessário criar uma conta no Supabase e criar um projeto na plataforma.

A ordem de execução dos scripts recomendada é essa:
- tabelas.sql
- row_level_security.sql
- funcoes.sql
- views.sql

Após isso, deve-se adicionar as Edge Functions:
- enviar-email (disponível no arquivo enviar-email.ts)
- gerar-csv-pedido (disponível no arquivo gerar-csv-pedido.ts)

Também deve-se adicionar nos secrets das Edge Functions uma chave válida para a variável RESEND_API_KEY, sendo necessária a criação de uma conta no [Resend](https://resend.com/).

## Testes
### SQL
Disponíveis [aqui](./backend/testes_sql.sql).

### Postman
Disponíveis [aqui](./backend/testes_postman.md).

## Referências
[Documentação Oficial Supabase](https://supabase.com/docs)

[Documentação Oficial Supabase - Select Supabase](https://supabase.com/docs/reference/javascript/select)

[Resend - Onboarding](https://resend.com/onboarding)
