# E-commerce Backend API

Sistema robusto de APIs REST para e-commerce desenvolvido em Node.js/Express com TypeScript, gerenciando clientes, produtos, estoque, pedidos e vendas com validações completas e relacionamentos entre entidades.

## 🚀 Tecnologias Principais

- **Node.js** com **Express.js** - Framework web robusto
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Prisma ORM** - Gerenciamento moderno de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação rigorosa de schemas
- **Railway** - Deploy em produção

## 📋 APIs Disponíveis

### 🧑‍💼 **Clientes** (`/clientes`)
- **POST** `/clientes` - Criar cliente (nome, email, telefone)
- **GET** `/clientes` - Listar todos os clientes
- **GET** `/clientes/:id` - Buscar cliente específico
- **PUT** `/clientes/:id` - Atualizar dados do cliente  
- **DELETE** `/clientes/:id` - Remover cliente

### 📦 **Produtos** (`/produtos`)
- **POST** `/produtos` - Criar produto (nome, descrição, preço, estoque inicial)
- **GET** `/produtos` - Listar todos os produtos
- **GET** `/produtos/:id` - Buscar produto específico
- **PUT** `/produtos/:id` - Atualizar produto (exceto estoque)
- **DELETE** `/produtos/:id` - Remover produto

### 📊 **Estoque** (`/estoques`)
- **GET** `/estoques` - Listar todos os itens de estoque
- **GET** `/estoques/:id` - Consultar estoque específico
- **PUT** `/estoques/:id` - Atualizar quantidade em estoque

### 📋 **Pedidos** (`/pedidos`)
- **POST** `/pedidos` - Criar pedido (vendaId, produtoId, quantidade)
- **GET** `/pedidos` - Listar todos os pedidos com detalhes
- **GET** `/pedidos/:id` - Buscar pedido específico
- **PUT** `/pedidos/:id` - Atualizar quantidade do pedido
- **DELETE** `/pedidos/:id` - Cancelar pedido

### 💰 **Vendas** (`/vendas`)
- **POST** `/vendas` - Criar nova venda (clienteId, status)
- **GET** `/vendas` - Listar todas as vendas com relacionamentos
- **GET** `/vendas/:id` - Buscar venda específica com pedidos
- **PUT** `/vendas/:id` - Atualizar status da venda
- **DELETE** `/vendas/:id` - Cancelar venda completa

## 🗄️ Arquitetura do Banco de Dados

```mermaid
erDiagram
    Cliente ||--o{ Venda : "realiza"
    Venda ||--o{ Pedido : "contém"
    Produto ||--o{ Pedido : "compõe"
    Produto ||--|| Estoque : "possui"
    
    Cliente {
        string id PK "UUID"
        string nome "Obrigatório"
        string email UK "Único"
        string telefone UK "Único"
        datetime createdAt
        datetime updatedAt
    }
    
    Produto {
        string id PK "UUID"
        string nome UK "Único"
        string descricao
        decimal preco "Positivo"
        datetime createdAt
        datetime updatedAt
    }
    
    Estoque {
        string id PK "UUID"
        int quantidade "Não negativa"
        string produtoId FK "Referência única"
        datetime createdAt
        datetime updatedAt
    }
    
    Venda {
        string id PK "UUID"
        string clienteId FK
        decimal total "Calculado automaticamente"
        enum status "PENDENTE | PAGO | CANCELADO"
        datetime createdAt
        datetime updatedAt
    }
    
    Pedido {
        string id PK "UUID"
        string vendaId FK
        string produtoId FK
        int quantidade "Positiva"
        datetime createdAt
        datetime updatedAt
    }
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **Node.js 18+**
- **PostgreSQL 12+**
- **npm** ou **yarn**

### Setup Local

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd ecommerce-backend-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie .env na raiz do projeto
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce_db"
PORT=3000
NODE_ENV=development
```

4. **Prepare o banco de dados**
```bash
# Execute as migrações
npx prisma migrate dev

# (Opcional) Visualize o banco
npx prisma studio
```

5. **Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### Deploy no Railway

1. **Conecte ao Railway**
2. **Configure a variável DATABASE_URL** (PostgreSQL automático)
3. **Deploy automático** via Git

## 📡 Exemplos de Uso

### Fluxo Completo de Venda

#### 1. Criar Cliente
```bash
curl -X POST https://sua-api.railway.app/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com", 
    "telefone": "11999999999"
  }'
```

#### 2. Criar Produto com Estoque
```bash
curl -X POST https://sua-api.railway.app/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Smartphone Galaxy",
    "descricao": "Smartphone Android 128GB",
    "preco": 1299.90,
    "estoque": 50
  }'
```

#### 3. Criar Venda
```bash
curl -X POST https://sua-api.railway.app/vendas \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "uuid-do-cliente",
    "status": "PENDENTE"
  }'
```

#### 4. Adicionar Pedido à Venda
```bash
curl -X POST https://sua-api.railway.app/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "vendaId": "uuid-da-venda",
    "produtoId": "uuid-do-produto",
    "quantidade": 2
  }'
```

## 🏗️ Estrutura do Projeto

```
src/
├── modules/                 # Módulos principais
│   ├── cliente/
│   │   ├── cliente.controllers.ts  # Lógica dos endpoints
│   │   ├── cliente.routes.ts       # Definição das rotas
│   │   ├── cliente.services.ts     # Regras de negócio
│   │   ├── criarCliente.dto.ts     # Validação criação
│   │   └── atualizarCliente.dto.ts # Validação atualização
│   ├── produto/             # Mesmo padrão para produtos
│   ├── estoque/             # Gerenciamento de estoque
│   ├── pedido/              # Itens de venda
│   └── venda/               # Transações principais
├── routes/
│   └── index.ts             # Agregador de rotas
├── prisma.ts                # Cliente Prisma
├── app.ts                   # Configuração Express
└── server.ts                # Servidor HTTP
```

## 🔒 Validações Implementadas

### Regras de Negócio
- **Clientes**: Email e telefone únicos, nome obrigatório
- **Produtos**: Nome único, preço sempre positivo
- **Estoque**: Quantidade nunca negativa, um estoque por produto
- **Pedidos**: Quantidade positiva, validação de relacionamentos
- **Vendas**: Status controlado (PENDENTE → PAGO → CANCELADO)

### Validação com Zod
```typescript
// Exemplo: Schema de criação de produto
const criarProdutoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("Preço deve ser positivo"),
  estoque: z.number().int().min(0, "Estoque não pode ser negativo")
});
```

## 🚦 Status das Funcionalidades

| Módulo | CRUD | Validação | Relacionamentos | Testes |
|--------|------|-----------|-----------------|--------|
| ✅ Clientes | Completo | Zod + Prisma | N:1 com Vendas | Manual |
| ✅ Produtos | Completo | Zod + Prisma | 1:1 Estoque, N:M Pedidos | Manual |
| ✅ Estoque | Leitura/Update | Zod + Prisma | 1:1 com Produtos | Manual |
| ✅ Pedidos | Completo | Zod + Prisma | N:1 Venda/Produto | Manual |
| ✅ Vendas | Completo | Zod + Prisma | 1:N Pedidos, N:1 Cliente | Manual |

## 📊 Recursos Avançados

### Relacionamentos Automáticos
- **GET** `/vendas/:id` - Retorna venda com pedidos e detalhes dos produtos
- **GET** `/pedidos` - Lista pedidos com nome do cliente e produto
- Cálculo automático do total das vendas

### Tratamento de Erros
- Validação de entrada com Zod
- Erros de relacionamento (FK constraints)
- Respostas HTTP padronizadas
- Logs detalhados para debug

### Performance
- Queries otimizadas com Prisma
- Índices no banco para consultas rápidas  
- Conexão pooling automática

## 🔧 Scripts & URLs

```bash
npm run dev          # Desenvolvimento  
npx prisma studio    # DB visual
npx prisma migrate dev # Migrações
```

**URLs:**
- Local: `http://localhost:3000`  
- Produção: `https://app.railway.app`
- Health: `/health` | Info: `/`

---

**🚀 APIs completas para e-commerce | Node.js + TypeScript + Prisma + Railway**