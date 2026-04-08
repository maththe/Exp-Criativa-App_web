# Exp Criativa

Projeto com frontend em React/Vite e backend em Node.js/Express com MySQL para cadastro e gerenciamento de carros.

## Estrutura

```text
.
|-- frontend
`-- backend
```

## Pré-requisitos

- Node.js 18 ou superior
- npm
- MySQL em execução

## Como rodar o projeto

O projeto precisa de dois processos rodando ao mesmo tempo:

1. backend na porta `3001`
2. frontend na porta `5173`

### 1. Configurar e subir o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` em `backend/.env` com estas variáveis:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
PORT=3001
```

Inicie o servidor:

```bash
node src/server.js
```

Se estiver tudo certo, o backend ficará disponível em `http://localhost:3001`.

### 2. Configurar e subir o frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

## Observações importantes

- O frontend está apontando diretamente para `http://localhost:3001` em [frontend/src/services/api.js](/C:/Users/mathe/Exp_Criativa_Front/frontend/src/services/api.js).
- O backend expõe estas rotas:
  - `GET /carros`
  - `GET /carros/:id`
  - `POST /carros`
  - `PUT /carros/:id`
  - `DELETE /carros/:id`

```
