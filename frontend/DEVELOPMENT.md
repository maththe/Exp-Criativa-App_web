# 🚀 Guia de Desenvolvimento - Sistema de Gestão de Carros

Bem-vindo ao guia de desenvolvimento! Este documento descreve como estender e melhorar a aplicação.

## 📋 Antes de Começar

- Certifique-se de que você tem Node.js 16+ instalado
- Clone o repositório e faça `npm install`
- Leia o README.md para entender a estrutura do projeto

## 🏗️ Arquitetura do Projeto

```
Frontend React
    ├── Pages (Telas)
    ├── Components (Componentes Reutilizáveis)
    ├── Services (Chamadas de API)
    ├── Utils (Funções Auxiliares)
    └── Assets (Imagens e Estilos)
```

## 📝 Convenções de Código

### Nomes de Arquivos e Componentes
- Componentes: `PascalCase` (ex: `ListaCarros.jsx`)
- Funções/Hooks: `camelCase` (ex: `useCarros()`)
- Constantes: `UPPER_SNAKE_CASE` (ex: `API_BASE_URL`)
- Pastas: `lowercase` (ex: `components/`, `pages/`)

### Estrutura de Componentes
```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Descrição breve do componente
 * @component
 */
export default function MeuComponente() {
  const [estado, setEstado] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica de efeito
  }, []);

  const handleEvento = () => {
    // Lógica do handler
  };

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## 🎨 Estilização com Tailwind CSS

### Princípios
- Mobile-First: Estile para mobile antes de desktop
- Utilities First: Use classes Tailwind em vez de CSS customizado
- Responsividade: Use prefixos (`sm:`, `md:`, `lg:`)

### Exemplo
```jsx
<div className="py-8 px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Título</h1>
</div>
```

## 🔌 Adicionando Novas Funcionalidades

### 1. Criar uma Nova Página

```jsx
// src/pages/MinhaPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MinhaPage() {
  const [estado, setEstado] = useState(null);

  return (
    <div className="container mx-auto py-8">
      <Link to="/" className="text-blue-600">← Voltar</Link>
      <h1 className="text-3xl font-bold mt-4">Minha Página</h1>
    </div>
  );
}
```

### 2. Registrar a Rota

```jsx
// src/main.js
import MinhaPage from './pages/MinhaPage';

function App() {
  return (
    <Routes>
      {/* ... rotas existentes ... */}
      <Route path="/minha-page" element={<MinhaPage />} />
    </Routes>
  );
}
```

### 3. Adicionar Novo Serviço de API

```javascript
// src/services/api.js
export const meuServico = {
  obterDados: async () => {
    try {
      const response = await api.get('/endpoint');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
```

## 🐛 Debugging

### Console do Navegador
```javascript
// Adicione logs para entender o fluxo
console.log('Dados:', dados);
console.log('Estado:', estado);

// Use groups para organizar
console.group('Requisição API');
console.log('URL:', url);
console.log('Método:', method);
console.groupEnd();
```

### React DevTools Extension
1. Instale a [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/) extension
2. Use para inspecionar componentes e estado

### Breakpoints
```javascript
debugger; // Abre o debugger do navegador

// Ou use a sintaxe no Chrome DevTools
// Sources > Clique no número da linha
```

## 📦 Adicionando Dependências

```bash
# Adicionar nova dependência
npm install nome-do-pacote

# Adicionar como dev dependency
npm install --save-dev nome-do-pacote

# Remover dependência
npm uninstall nome-do-pacote
```

### Dependências Recomendadas

Para trabalhr com datas:
```bash
npm install date-fns
```

Para validação de formulários:
```bash
npm install zod react-hook-form
```

Para notificações:
```bash
npm install react-toastify
```

## 🧪 Testes

### Configurar Vitest
```bash
npm install --save-dev vitest @testing-library/react @testing-library/react-dom
```

### Exemplo de Teste
```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeuComponente from './MeuComponente';

describe('MeuComponente', () => {
  it('deve renderizar o título', () => {
    render(<MeuComponente />);
    expect(screen.getByText('Título')).toBeInTheDocument();
  });
});
```

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

Isso cria uma pasta `dist/` com os arquivos otimizados.

### Plataformas para Deploy
- **Vercel**: Perfeito para apps Vite/React
- **Netlify**: Fácil integração com Git
- **GitHub Pages**: Gratuito para repositórios públicos
- **AWS Amplify**: Para aplicações mais complexas

## 📚 Recursos Úteis

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

## 🔐 Boas Práticas

### Segurança
- Nunca commitar `.env` com dados sensíveis
- Usar HTTPS em produção
- Validar entrada do usuário no backend
- Usar CORS apropriadamente

### Performance
- Code Splitting com lazy loading
- Otimizar imagens
- Memoizar componentes quando necessário
- Usar useCallback para funções em dependências

### DX (Developer Experience)
- Adicionar tipos TypeScript (opcional)
- Comentar código complexo
- Usar nomes significativos
- Manter componentes pequenos e focados

## 📝 Git Workflow

```bash
# Criar branch para nova feature
git checkout -b feature/minha-feature

# Fazer commits significativos
git commit -m "feat: adiciona nova funcionalidade"

# Push para remoto
git push origin feature/minha-feature

# Criar Pull Request
# ... no GitHub ou plataforma similar
```

### Mensagens de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, sem mudanças lógicas
- `refactor:` Reestruturação de código
- `test:` Adição ou modificação de testes

## 🆘 Troubleshooting

| Problema | Solução |
|----------|---------|
| Módulos não encontrados | Verifique os imports e caminhos |
| Comportamento estranho | Limpe .next ou dist, e rebuild |
| Estilos bugados | Limpe cache do navegador (Ctrl+F5) |
| Hot reload não funciona | Restarte o servidor dev |

## 📞 Support & Comunidade

- Abra uma Issue no GitHub
- Faça uma discussão (Discussion tab)
- Entre em contato com o desenvolvedor

---

**Versão:** 1.0.0  
**Última atualização:** 2024
