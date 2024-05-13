# Store Manager API

Este projeto consiste no desenvolvimento de uma API RESTful para um sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas. A aplicação utiliza um banco de dados MySQL para a gestão dos dados e é desenvolvida com uma arquitetura em camadas, visando uma melhor organização e escalabilidade do código.

## Habilidades Desenvolvidas

- Interação com um banco de dados relacional MySQL.
- Implementação de uma API utilizando arquitetura em camadas.
- Criação de validações para os dados recebidos pela API.
- Escrita de testes para garantir a implementação dos endpoints.

## Endpoints

### Listar Produtos

- **GET /products**: Retorna todos os produtos ordenados de forma crescente pelo campo id.
- **GET /products/:id**: Retorna apenas o produto com o id especificado na URL.

### Listar Vendas

- **GET /sales**: Retorna todas as vendas ordenadas de forma crescente pelo campo saleId, e em caso de empate, também pelo campo productId.
- **GET /sales/:id**: Retorna apenas a venda com o id especificado na URL.

### Cadastrar Produtos

- **POST /products**: Cadastra um novo produto com base nos dados fornecidos no corpo da requisição.

### Validar Cadastro de Produtos

- Mensagens de erro são retornadas para requisições com dados inválidos no cadastro de produtos.

### Cadastrar Vendas

- **POST /sales**: Cadastra uma nova venda com base nos produtos e quantidades fornecidos no corpo da requisição.

### Validar Cadastro de Vendas

- Mensagens de erro são retornadas para requisições com dados inválidos no cadastro de vendas.

### Atualizar Produto

- **PUT /products/:id**: Atualiza o produto com o id especificado na URL com base nos dados fornecidos no corpo da requisição.

### Deletar Produto

- **DELETE /products/:id**: Deleta o produto com o id especificado na URL.

## Execução e Testes

Para executar a aplicação e rodar os testes, siga os passos abaixo:

1. Instale as dependências do projeto com o comando `npm install`.
2. Inicie o servidor local com o comando `npm start`.
3. Execute os testes com o comando `npm test`.

Certifique-se de que possui um ambiente configurado com o MySQL instalado e as credenciais corretas configuradas no arquivo de ambiente (.env).

Este projeto foi desenvolvido como parte do desafio proposto pela Trybe, e visa demonstrar habilidades técnicas em desenvolvimento de APIs RESTful.
