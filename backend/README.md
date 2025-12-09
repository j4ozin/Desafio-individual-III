# Backend - API de Tarefas

Backend Node.js com Express para gerenciamento de tarefas (CRUD completo).

## 🚀 Como executar

### Pré-requisitos
- Node.js instalado

### Instalação e execução

```bash
# Instalar dependências
npm install

# Executar servidor
npm start

# Ou executar em modo desenvolvimento (com auto-reload)
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📋 Endpoints da API

### Listar todas as tarefas
```
GET /api/tarefas
```

### Buscar tarefa por ID
```
GET /api/tarefas/:id
```

### Criar nova tarefa
```
POST /api/tarefas
Body: {
  "titulo": "string",
  "descricao": "string",
  "concluida": boolean
}
```

### Atualizar tarefa
```
PUT /api/tarefas/:id
Body: {
  "titulo": "string",
  "descricao": "string",
  "concluida": boolean
}
```

### Deletar tarefa
```
DELETE /api/tarefas/:id
```

## 🔧 Tecnologias

- Node.js
- Express
- CORS
- Armazenamento em memória
