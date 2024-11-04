Aqui está a versão atualizada do `README.md`, incluindo instruções para acessar o PostgreSQL no Docker:

---

# Produto API

Uma API de exemplo para gerenciar produtos, desenvolvida com **Node.js**, **Express** e **PostgreSQL**. Esta API permite realizar operações de CRUD (criar, ler, atualizar e deletar) em produtos.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
  - [Configuração com Docker](#configuração-com-docker)
- [Execução](#execução)
- [Endpoints](#endpoints)
- [Seeds de Dados](#seeds-de-dados)
- [Contribuição](#contribuição)

---

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone <url_do_repositório>
   cd nome-do-repositorio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```env
   DB_USER=postgres
   DB_PASS=senhaEXEMPLO!
   DB_HOST=localhost
   DB_PORT=5433
   DB_DATABASE=public
   APP_PORT=3000
   ```

   Altere os valores conforme a configuração do seu banco de dados PostgreSQL.

2. **Configuração do Banco de Dados:**

   Certifique-se de que sua tabela `produtos` está criada com a seguinte estrutura:

   ```sql
   CREATE TABLE produtos (
     id SERIAL PRIMARY KEY,
     descricao VARCHAR(255),
     preco DECIMAL,
     estoque INTEGER,
     data DATE
   );
   ```

### Configuração com Docker

Caso você queira usar o PostgreSQL no Docker para simplificar o ambiente de desenvolvimento:

1. **Baixe e inicie o contêiner do PostgreSQL:**

   No terminal, execute o seguinte comando para criar e rodar o contêiner PostgreSQL:

   ```bash
   docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=public -p 5433:5432 -d postgres:latest
   ```

   - **POSTGRES_USER**: Nome de usuário para o PostgreSQL (neste caso, `postgres`).
   - **POSTGRES_PASSWORD**: Senha do usuário PostgreSQL.
   - **POSTGRES_DB**: Nome do banco de dados padrão (neste caso, `public`).
   - **-p 5433:5432**: Mapeia a porta do host para a porta do contêiner.

2. **Acesse o PostgreSQL no Docker:**

   Para acessar o banco de dados PostgreSQL em execução no contêiner Docker, você pode usar o cliente `psql` do PostgreSQL. Execute o seguinte comando:

   ```bash
   docker exec -it postgres-container psql -U postgres -d public
   ```

   - **-it**: Permite que você interaja com o contêiner.
   - **postgres-container**: O nome do seu contêiner PostgreSQL.
   - **-U postgres**: O usuário que você deseja usar para se conectar.
   - **-d public**: O banco de dados ao qual você deseja se conectar.

3. **Conexão com a API**: 

   No arquivo `.env` do projeto, configure as variáveis de ambiente com as mesmas credenciais:

   ```env
   DB_USER=postgres
   DB_PASS=senhaEXEMPLO!
   DB_HOST=localhost
   DB_PORT=5433
   DB_DATABASE=public
   APP_PORT=3000
   ```

4. **Inicialize o banco de dados**: Após configurar o contêiner, a API estará conectada ao PostgreSQL no Docker.

## Execução

Para iniciar o servidor, execute:

```bash
node main.js
```

A API estará disponível em `http://localhost:3000` (ou na porta especificada no arquivo `.env`).

---

Essas instruções agora incluem como acessar o banco de dados PostgreSQL dentro do contêiner Docker, permitindo que você interaja com o banco de dados de forma mais conveniente.