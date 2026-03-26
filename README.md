# 🚀 Finance API

## 📌 Sobre

Esta é a API de um sistema de controle financeiro pessoal, desenvolvida com foco em **boas práticas**, **arquitetura limpa** e **controle total sobre queries SQL**.

A aplicação permite que usuários gerenciem receitas, despesas, categorias e metas financeiras.

> ⚠️ Projeto desenvolvido para portfólio, simulando um ambiente real de produção.

---

## 🧠 Arquitetura

O projeto segue princípios inspirados em **Clean Architecture**, com separação clara de responsabilidades:

```id="arch2"
src/
├── app/
│   ├── domain/      # Entidades e regras de negócio
│   ├── interactor/  # Casos de uso
│   └── gateway/     # Interfaces (contratos)
│
├── infrastructure/
│   ├── adapter/     # Controllers (Express)
│   ├── repository/  # Implementação com Knex
│   └── routes/      # Rotas
│
├── database/        # Configuração do Knex
├── infra/           # Configurações gerais
└── main.ts
```

---

## 🛠️ Tecnologias

* Node.js
* TypeScript
* Express
* Knex.js (Query Builder)
* PostgreSQL (Supabase)
* JWT (autenticação)
* Bcrypt (hash de senha)
* Zod (validação)

---

## 🔐 Funcionalidades

### Autenticação

* Cadastro de usuário
* Login com JWT
* Proteção de rotas

### Transações

* CRUD de receitas e despesas
* Associação com categorias

### Categorias

* Criação e gerenciamento

### Dashboard

* Resumo financeiro
* Filtros por período

### Metas

* Controle de objetivos financeiros

### Diferencial

* Previsão de gastos baseada em média histórica

---

## ⚙️ Como Rodar

### Instalação

```bash id="inst2"
npm install
```

---

### Configuração (.env)

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=8080
```

---

### Rodar aplicação

```bash id="run2"
npm run dev
```

---

## 🔌 Endpoints (Exemplo)

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Transactions

* `GET /transactions`
* `POST /transactions`
* `PUT /transactions/:id`
* `DELETE /transactions/:id`

---

## 🧱 Camadas

### Domain

Entidades e regras puras (sem dependência externa)

### Interactor

Casos de uso (ex: criar transação)

### Gateway

Interfaces de repositório

### Repository

Implementação com Knex (queries SQL)

### Adapter

Controllers (entrada HTTP)

---

## 🔐 Segurança

* Senhas com hash (bcrypt)
* Autenticação JWT
* Isolamento por usuário

---

## 🧠 Boas Práticas

* Uso de TypeScript
* Queries explícitas com Knex
* Separação de camadas
* Validação com Zod
* Uso de variáveis de ambiente

---

## 🚀 Deploy

* Backend: Render / Railway
* Banco: Supabase

---

## 📈 Melhorias Futuras

* Testes automatizados
* Cache com Redis
* Logs estruturados
* Rate limiting

---

## 👨‍💻 Autor

Desenvolvido por Victor Hugo

---

## ⭐ Observação

Projeto focado em demonstrar domínio de backend, arquitetura e manipulação de banco de dados com SQL.
