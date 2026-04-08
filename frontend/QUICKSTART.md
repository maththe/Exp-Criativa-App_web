# ⚡ Quick Start - Início Rápido

Siga estes passos para colocar a aplicação funcionando em minutos!

## 🎯 Pré-requisitos (5 min)

Certifique-se de ter instalado:
- **Node.js 16+** - [Download aqui](https://nodejs.org/)
- **npm** (vem com Node.js)

Verificar instalação:
```bash
node --version
npm --version
```

## 📦 Instalação (2-5 min)

```bash
# 1. Entrar na pasta do projeto
cd frontend

# 2. Instalar dependências
npm install    # Leva alguns minutos na primeira vez

# 3. Pronto! ✅
```

## 🚀 Executar Desenvolvimento (1 min)

```bash
# Inicia servidor de desenvolvimento
npm run dev
```

Você verá algo como:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

**Clique no link ou digite na barra de endereços do navegador.**

## 🌐 Usar com uma Fake API (Json Server)

Se ainda não tiver backend:

### Opção A: Json Server (Recomendado para testes)

```bash
# Terminal 1 - Projeto frontend
npm run dev

# Terminal 2 - Em uma nova janela do terminal
npm install -g json-server
json-server --watch db.json --port 3001
```

**Criar arquivo `db.json` na raiz:**
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
      "descricao": "Carro em perfeito estado"
    },
    {
      "id": 2,
      "marca": "Honda",
      "modelo": "Civic",
      "ano": 2023,
      "preco": "155000.00",
      "cor": "Preto",
      "descricao": "Civic impecável"
    }
  ]
}
```

Depois acesse `http://localhost:5173` e teste!

### Opção B: Com Node.js backend real

Se você tiver um backend pronto:

1. Atualize a URL em `.env`:
```
VITE_API_BASE_URL=http://localhost:3001
```

2. Execute o backend em outro terminal

3. Inicie o frontend com `npm run dev`

## ✅ Testar a Aplicação

### Testes Manuais

- [ ] **Listar Carros**: Página principal exibe tabela
- [ ] **Criar**: Clique "+ Novo Carro" e cadastre
- [ ] **Editar**: Clique em "Editar" em qualquer carro
- [ ] **Deletar**: Clique em "Deletar" (pede confirmação)
- [ ] **Ver Detalhes**: Clique em "Ver" para mais informações
- [ ] **Paginação**: Mude "Carros por página" e teste navegação

## 🏗️ Build para Produção

Quando sua aplicação estiver pronta:

```bash
npm run build
```

Isso cria uma pasta `dist/` com os arquivos otimizados.

Para testar o build:
```bash
npm run preview
```

## 📁 Estrutura Importante

Depois de `npm install`, você terá:

```
frontend/
├── node_modules/        (~500 MB - não commitar)
├── src/                 (Seu código)
├── public/              (Assets estáticos)
├── package.json
├── vite.config.js
└── ...
```

## 🔧 Problemas Comuns

| Problema | Solução |
|----------|---------|
| **"npm: command not found"** | Node.js não instalado. [Baixar aqui](https://nodejs.org/) |
| **Porta 5173 em uso** | Outro app usando mesma porta. Vite abrirá próxima automaticamente |
| **Erro ao conectar API** | Verifique URL em `.env` e se backend está rodando |
| **Estilos bugados** | Limpe cache: `Ctrl+Shift+Del` (navegador) → History |
| **Módulos não encontrados** | Delete `node_modules` e `npm install` novamente |

## 📖 Próximo Passo

Leia a documentação completa:
- **README.md** - Documentação detalhada
- **ESTRUTURA.md** - Visão geral do projeto
- **DEVELOPMENT.md** - Como desenvolver novos recursos

## 🆘 Precisa de Ajuda?

```bash
# Ver logs detalhados
npm run dev -- --debug

# Limpar e reinstalar
rm -rf node_modules
npm install

# Atualizar dependências
npm update
```

---

**Dúvidas?** Consulte `README.md` para mais informações!

**Estimated Time:** ⏱️ 10 minutos para estar pronto
