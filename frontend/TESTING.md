# 🧪 Guia de Testes - Sistema de Gestão de Carros

Este documento contém informações e exemplos para testar a aplicação frontend.

## 🎯 Cenários de Teste

### 1. Teste da Listagem de Carros

**Passos:**
1. Acesse `http://localhost:5173`
2. Você verá uma listagem de carros (se a API estiver rodando)
3. Teste a paginação clicando em "Próxima" e "Anterior"
4. Teste mudar a quantidade de carros por página

**Esperado:**
- Tabela exibe corretamente os dados
- Botões de paginação funcionam
- Filtro de limite é responsivo

### 2. Teste de Cadastro

**Passos:**
1. Clique em "+ Novo Carro"
2. Preencha todos os campos obrigatórios
3. Clique em "Cadastrar"

**Esperado:**
- Validações são aplicadas
- Mensagem de sucesso aparece
- Redirecionamento para listagem
- Novo carro aparece na lista

### 3. Teste de Edição

**Passos:**
1. Na listagem, clique em "Editar"
2. Modifique os dados
3. Clique em "Atualizar"

**Esperado:**
- Formulário carrega dados corretamente
- Alterações são salvas
- Listagem reflete as mudanças

### 4. Teste de Exclusão

**Passos:**
1. Clique em "Deletar" (listagem ou detalhes)
2. Confirme a exclusão
3. Verificar se carro foi removido

**Esperado:**
- Confirmação aparece
- Carro é removido da listagem
- Lista é atualizada

### 5. Teste de Detalhes

**Passos:**
1. Clique em "Ver" na listagem
2. Visualize todos os dados
3. Teste botões de ação

**Esperado:**
- Todos os dados do carro aparecem
- Formatação é adequada
- Botões funcionam corretamente

## 🔧 Usando Mock Data Localmente

Se você não tiver uma API backend pronta, pode usar dados mockados para testes.

### Opção 1: Usar json-server

```bash
# Instalar json-server
npm install --save-dev json-server

# Criar arquivo db.json na raiz do projeto
```

Criar `db.json`:
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

```bash
# Em outro terminal, inicie o json-server na porta 3001
npx json-server --watch db.json --port 3001
```

### Opção 2: Usar Interceptadores Axios (Desenvolvimento)

Modifique `src/services/api.js`:

```javascript
// ... código anterior ...

// Apenas para desenvolvimento - remover em produção
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use((config) => {
    // Mock dados para GET /carros
    if (config.url.includes('/carros') && config.method === 'get') {
      // Retornar dados mockados
    }
    return config;
  });
}
```

## ✅ Checklist de Validação

- [ ] Página lista se abre corretamente
- [ ] Paginação funciona
- [ ] Form de cadastro abre
- [ ] Validações do form funcionam
- [ ] Cadastro salva dados (com sucesso)
- [ ] Edição carrega dados
- [ ] Edição atualiza dados
- [ ] Deleteção pede confirmação
- [ ] Deleteção remove item
- [ ] Página de detalhes abre
- [ ] Todos os campos exibem dados
- [ ] Botões de ação funcionam
- [ ] Mensagens de erro aparecem
- [ ] APP é responsivo em mobile

## 🐛 Erros Comuns

| Erro | Causa | Solução |
|------|-------|--------|
| "Cannot read property 'carros'" | API não retorna dados esperados | Verificar formato da resposta |
| Página branca | React não renderizou | Abrir console (F12) para ver erros |
| Estilos não aplicam | Tailwind não processado | Limpar cache (npm run dev) |
| API timeout | Backend não está rodando | Iniciar servidor Node.js |

## 📌 Exemplos de Requisições

### GET - Listar Carros
```bash
curl -X GET "http://localhost:3001/carros?pagina=1&limite=10"
```

### POST - Criar Carro
```bash
curl -X POST "http://localhost:3001/carros" \
  -H "Content-Type: application/json" \
  -d '{
    "marca": "Toyota",
    "modelo": "RAV4",
    "ano": 2024,
    "preco": "200000",
    "cor": "Preto",
    "descricao": "SUV novo"
  }'
```

### PUT - Atualizar Carro
```bash
curl -X PUT "http://localhost:3001/carros/1" \
  -H "Content-Type: application/json" \
  -d '{
    "preco": "148000"
  }'
```

### DELETE - Deletar Carro
```bash
curl -X DELETE "http://localhost:3001/carros/1"
```

## 🎬 Script de Teste Automatizado

Você pode criar testes com Jest/Vitest:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

## 📊 Verificando Performance

Use as DevTools do navegador:
- **Console**: Verificar erros
- **Network**: Velocidade das requisições
- **Performance**: Tempo de renderização
- **Responsive**: Testar em diferentes telas

---

**Última atualização:** 2024
