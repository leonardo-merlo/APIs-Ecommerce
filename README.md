# E-commerce API System

Sistema completo de APIs para e-commerce com backend em Node.js/Express e frontend em React, gerenciando clientes, produtos, estoque, pedidos e vendas.

## 🚀 Tecnologias

### Backend
- **Node.js** com **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM e gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** com **TypeScript**
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

## 📋 Funcionalidades

### 🔧 Backend APIs

#### **Clientes** (`/clientes`)
- ✅ **POST** `/clientes` - Criar cliente (nome, email, telefone)
- ✅ **GET** `/clientes` - Listar todos os clientes
- ✅ **GET** `/clientes/:id` - Buscar cliente por ID
- ✅ **PUT** `/clientes/:id` - Atualizar cliente
- ✅ **DELETE** `/clientes/:id` - Deletar cliente

#### **Produtos** (`/produtos`)
- ✅ **POST** `/produtos` - Criar produto (nome, descrição, preço, estoque)
- ✅ **GET** `/produtos` - Listar todos os produtos
- ✅ **GET** `/produtos/:id` - Buscar produto por ID
- ✅ **PUT** `/produtos/:id` - Atualizar produto (exceto estoque)
- ✅ **DELETE** `/produtos/:id` - Deletar produto

#### **Estoque** (`/estoques`)
- ✅ **GET** `/estoques` - Listar todos os itens de estoque
- ✅ **GET** `/estoques/:id` - Buscar estoque por ID
- ✅ **PUT** `/estoques/:id` - Atualizar quantidade em estoque

#### **Pedidos** (`/pedidos`)
- ✅ **POST** `/pedidos` - Criar pedido (vendaId, produtoId, quantidade)
- ✅ **GET** `/pedidos` - Listar todos os pedidos
- ✅ **GET** `/pedidos/:id` - Buscar pedido por ID
- ✅ **PUT** `/pedidos/:id` - Atualizar quantidade do pedido
- ✅ **DELETE** `/pedidos/:id` - Deletar pedido

#### **Vendas** (`/vendas`)
- ✅ **POST** `/vendas` - Criar venda (clienteId, status)
- ✅ **GET** `/vendas` - Listar todas as vendas
- ✅ **GET** `/vendas/:id` - Buscar venda por ID
- ✅ **PUT** `/vendas/:id` - Atualizar status da venda
- ✅ **DELETE** `/vendas/:id` - Deletar venda

### 🎨 Frontend

Interface web responsiva para testar todas as APIs:

- **Páginas CRUD** para cada módulo (Clientes, Produtos, Estoque, Pedidos, Vendas)
- **Formulários** para criação e edição
- **Listagem** com informações relacionadas (nomes de clientes/produtos)
- **Navegação** intuitiva entre módulos
- **Design moderno** com gradiente e interface limpa

## 🗄️ Modelo de Dados

```mermaid
erDiagram
    Cliente ||--o{ Venda : "tem"
    Venda ||--o{ Pedido : "contém"
    Produto ||--o{ Pedido : "está em"
    Produto ||--|| Estoque : "tem"
    
    Cliente {
        string id PK
        string nome
        string email UK
        string telefone UK
        datetime createdAt
        datetime updatedAt
    }
    
    Produto {
        string id PK
        string nome UK
        string descricao
        float preco
        datetime createdAt
        datetime updatedAt
    }
    
    Estoque {
        string id PK
        int quantidade
        string produtoId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Venda {
        string id PK
        string clienteId FK
        float total
        enum status
        datetime createdAt
        datetime updatedAt
    }
    
    Pedido {
        string id PK
        string vendaId FK
        string produtoId FK
        int quantidade
        datetime createdAt
        datetime updatedAt
    }
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Backend

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ecommerce-apis
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
# Crie um arquivo .env na raiz do projeto
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce_db"
```

4. **Execute as migrações**
```bash
npx prisma migrate dev
```

5. **Inicie o servidor**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

1. **Navegue para a pasta frontend**
```bash
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a URL da API (opcional)**
```bash
# Crie um arquivo .env na pasta frontend
VITE_API_URL=http://localhost:3000
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📡 Exemplos de Uso das APIs

### Criar Cliente
```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999999999"
  }'
```

### Criar Produto
```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Smartphone",
    "descricao": "Smartphone Android",
    "preco": 999.99,
    "estoque": 50
  }'
```

### Criar Venda
```bash
curl -X POST http://localhost:3000/vendas \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "uuid-do-cliente",
    "status": "PENDENTE"
  }'
```

### Criar Pedido
```bash
curl -X POST http://localhost:3000/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "vendaId": "uuid-da-venda",
    "produtoId": "uuid-do-produto",
    "quantidade": 2
  }'
```

## 🔧 Scripts Disponíveis

### Backend
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npx prisma studio` - Interface visual do banco de dados
- `npx prisma migrate dev` - Executa migrações
- `npx prisma generate` - Gera o cliente Prisma

### Frontend
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build

## 🏗️ Arquitetura

```
src/
├── modules/
│   ├── cliente/
│   │   ├── cliente.controllers.ts
│   │   ├── cliente.routes.ts
│   │   ├── cliente.services.ts
│   │   ├── criarCliente.dto.ts
│   │   └── atualizarCliente.dto.ts
│   ├── produto/
│   ├── estoque/
│   ├── pedido/
│   └── venda/
├── routes/
│   └── index.ts
├── app.ts
└── server.ts
```

## 🚦 Status das APIs

| Módulo | CRUD | Validação | Relacionamentos | Status |
|--------|------|-----------|-----------------|--------|
| Clientes | ✅ | ✅ | ✅ | Completo |
| Produtos | ✅ | ✅ | ✅ | Completo |
| Estoque | ✅ | ✅ | ✅ | Completo |
| Pedidos | ✅ | ✅ | ✅ | Completo |
| Vendas | ✅ | ✅ | ✅ | Completo |

## 📝 Validações

- **Clientes**: Nome obrigatório, email único, telefone único
- **Produtos**: Nome único, preço positivo
- **Estoque**: Quantidade não negativa
- **Pedidos**: Quantidade positiva, referências válidas
- **Vendas**: Status enum (PENDENTE, PAGO, CANCELADO)

## 🔒 CORS

O sistema está configurado para aceitar requisições do frontend em:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

## 📄 Licença

ISC License

---

**Desenvolvido com ❤️ usando Node.js, Express, Prisma e React**