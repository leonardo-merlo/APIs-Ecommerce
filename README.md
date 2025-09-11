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


## 🚦 Status das Funcionalidades

| Módulo | CRUD | Validação | Relacionamentos |
|--------|------|-----------|-----------------|
| ✅ Clientes | Completo | Zod + Prisma | N:1 com Vendas |
| ✅ Produtos | Completo | Zod + Prisma | 1:1 Estoque, N:M Pedidos | 
| ✅ Estoque | Leitura/Update | Zod + Prisma | 1:1 com Produtos |
| ✅ Pedidos | Completo | Zod + Prisma | N:1 Venda/Produto |
| ✅ Vendas | Completo | Zod + Prisma | 1:N Pedidos, N:1 Cliente |


---

**🚀 APIs completas para e-commerce | Node.js + TypeScript + Prisma + Railway**