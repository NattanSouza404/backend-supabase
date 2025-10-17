## Testes com Postman

É possível realizar alguns testes com o Postman. Pode ser necessário adicionar aos Headers da requisição os atributos 'apikey' e 'Authorization'.

Exemplo:
```
apikey: <valor key>
Authorization: Bearer <valor key>
```

### Algumas chamadas de API

- Consulta dos produtos (GET)
```
https://[projeto].supabase.co/rest/v1/produtos?select=*
```

- CSV de um pedido específico (POST)
```
https://[projeto].supabase.co/functions/v1/gerar-csv-pedido

# No corpo da requisição
{
    "id_pedido": 1
}
```

- Envio de relatório por e-mail (POST)
```
https://[projeto].supabase.co/functions/v1/enviar-email

# No corpo da requisição
{
    "to": "email@exemplo.com"
}
```