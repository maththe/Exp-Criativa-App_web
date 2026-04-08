# Sistema de Gestão de Carros - Frontend

Um sistema completo de gerenciamento de carros desenvolvido com **React**, **Vite**, **React Router** e **Tailwind CSS**.

## ✨ Funcionalidades

### 📋 Telas Principais

1. **Listagem de Carros**
   - Exibe todos os carros cadastrados em uma tabela
   - Paginação configurável (5, 10, 20 ou 50 itens por página)
   - Ações rápidas: Ver, Editar, Deletar
   - Navegação entre páginas

2. **Cadastro e Edição de Carros**
   - Formulário completo com validação
   - Campos: Marca, Modelo, Ano, Preço, Cor, Descrição
   - Reutilizável para criar e editar carros
   - Mensagens de sucesso/erro

3. **Visualização Detalhada**
   - Cartão informativo com todos os dados do carro
   - Layout responsivo e atrativo
   - Botões de ação: Editar, Deletar, Voltar
   - Apresentação clara das informações

### 🎨 Estilização
- **Tailwind CSS** para uma interface moderna e responsiva
- Design Mobile-First
- Componentes reutilizáveis
- Paleta de cores consistente

### 🔌 Comunicação com API
- **Axios** para requisições HTTP
- Interceptores para tratamento de erros
- Métodos para: GET, POST, PUT, DELETE
- URLs configuráveis via .env

### ⚠️ Tratamento de Erros
- Exibição de mensagens de erro amigáveis
- Validação de formulários no frontend
- Tratamento de erros de conexão
- Feedback visual para ações assíncronas

## 📦 Instalação

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### Passos

1. **Clonar o repositório** (se necessário)
```bash
cd frontend
```

2. **Instalar dependências**
```bash
npm install
```

3. **Configurar variáveis de ambiente**
```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env com suas configurações
# VITE_API_BASE_URL=http://localhost:3001
```

4. **Iniciar o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou a porta que Vite indicar)

## 🚀 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Cria build para produção
npm run build

# Visualiza o build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx       # Cabeçalho da aplicação
│   │   └── Footer.jsx       # Rodapé da aplicação
│   ├── pages/               # Páginas principais
│   │   ├── ListaCarros.jsx  # Listagem com paginação
│   │   ├── FormCarro.jsx    # Cadastro/Edição
│   │   └── DetalhesCarro.jsx # Visualização detalhada
│   ├── services/            # Serviços de API
│   │   └── api.js           # Configuração Axios e métodos
│   ├── assets/              # Imagens e assets
│   ├── index.css            # Estilos globais (Tailwind)
│   └── main.js              # Arquivo de entrada
├── public/                  # Arquivos estáticos
├── .env                     # Variáveis de ambiente
├── .env.example             # Exemplo de variáveis
├── index.html               # HTML principal
├── tailwind.config.js       # Configuração Tailwind
├── postcss.config.js        # Configuração PostCSS
└── package.json             # Dependências do projeto
```

## 🔗 Integração com Backend

### Requisitos da API

A API deve retornar dados nos seguintes formatos:

**Listar Carros (GET `/api/carros`)**
```json
{
  "carros": [
    {
      "id": 1,
      "marca": "Toyota",
      "modelo": "Corolla",
      "ano": 2023,
      "preco": "145000.00",
      "cor": "Prata",
      "descricao": "Carro em perfeito estado..."
    }
  ],
  "totalPaginas": 5,
  "paginaAtual": 1
}
```

**Obter Detalhes (GET `/api/carros/:id`)**
```json
{
  "id": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2023,
  "preco": "145000.00",
  "cor": "Prata",
  "descricao": "Descrição completa..."
}
```

**Criar Carro (POST `/api/carros`)**
```json
{
  "id": 2,
  "marca": "Honda",
  "modelo": "Civic",
  "ano": 2024,
  "preco": "155000.00",
  "cor": "Preto",
  "descricao": "Novo carro cadastrado"
}
```

**Atualizar Carro (PUT `/api/carros/:id`)**
```json
{
  "id": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2024,
  "preco": "148000.00",
  "cor": "Prata",
  "descricao": "Preço atualizado"
}
```

**Deletar Carro (DELETE `/api/carros/:id`)**
```json
{
  "message": "Carro deletado com sucesso"
}
```

### Tratamento de Erros

A API pode retornar erros nos seguintes formatos:

```json
{
  "message": "Erro ao processar a requisição",
  "status": 400
}
```

## 🎯 Funcionalidades Detalhadas

### Paginação
- Seleção de itens por página (5, 10, 20, 50)
- Botões Anterior/Próxima
- Indicador da página atual
- Desabilitação automática de botões nos limites

### Validação de Formulário
- Marca e Modelo obrigatórios
- Ano entre 1900 e próximo ano
- Preço maior que zero
- Feedback de erros em tempo real

### Mensagens de Feedback
- Sucesso em verde: Carro cadastrado/atualizado/deletado
- Erro em vermelho: Problemas de conexão ou validação
- Loading: Indicador de carregamento
- Confirmação antes de deletar

### Responsividade
- Layout adaptado para mobile
- Menu colapsível em dispositivos pequenos
- Tabelas com scroll horizontal em mobile
- Botões redimensionáveis

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **React Router v7** - Roteamento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização
- **PostCSS** - Processador CSS

## 📝 Exemplos de Uso

### Adicionar novo carro
1. Clique em "+ Novo Carro"
2. Preencha o formulário
3. Clique em "Cadastrar"

### Editar carro
1. Na listagem, clique em "Editar"
2. Modifique os dados desejados
3. Clique em "Atualizar"

### Ver detalhes
1. Na listagem, clique em "Ver"
2. Visualize todas as informações

### Deletar carro
1. Clique em "Deletar" na listagem ou detalhes
2. Confirme a ação
3. Carro será removido

## 🐛 Troubleshooting

### Erro: "Cannot GET /"
- Verifique se o servidor de desenvolvimento está rodando: `npm run dev`

### Erro de conexão com API
- Verifique se a URL no .env está correta
- Confirme se a API backend está rodando
- Verifique a porta (padrão: 3001)

### Componentes não carregam
- Verifique os imports nas páginas
- Confirme se os arquivos .jsx estão na pasta correta

### Estilos não aplicam
- Verifique se `index.css` está importado em `main.js`
- Limpe cache do navegador (Ctrl+F5)

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com o desenvolvedor.

---

**Versão:** 1.0.0  
**Última atualização:** 2024
