# Desafio III - App React Native + Backend

Projeto completo de aplicação mobile com backend para gerenciamento de tarefas (CRUD).

## 📁 Estrutura do Projeto

```
Desafio Individual III/
├── backend/          # API Node.js + Express
│   ├── server.js     # Servidor com endpoints CRUD
│   ├── package.json
│   └── README.md
│
└── mobile/           # App React Native + Expo
    ├── App.js        # Interface do app
    ├── api.js        # Comunicação com backend
    ├── package.json
    └── README.md
```

## 🚀 Como Executar o Projeto Completo

### 1. Executar o Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

O servidor estará rodando em `http://localhost:3000`

### 2. Configurar e Executar o Mobile

```bash
# Entre na pasta do mobile
cd mobile

# Instale as dependências (se necessário)
npm install
```

**IMPORTANTE**: Antes de executar, edite o arquivo `mobile/api.js` e configure o IP:

- Encontre seu IP local com `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
- Altere a linha `API_URL` no arquivo `api.js` com seu IP
- Exemplo: `http://192.168.1.100:3000/api/tarefas`

```bash
# Inicie o app
npm start
```

Escaneie o QR Code com o Expo Go no seu smartphone.

## 🎯 Funcionalidades Implementadas

### Backend (API REST)
- ✅ GET /api/tarefas - Listar todas as tarefas
- ✅ GET /api/tarefas/:id - Buscar tarefa por ID
- ✅ POST /api/tarefas - Criar nova tarefa
- ✅ PUT /api/tarefas/:id - Atualizar tarefa
- ✅ DELETE /api/tarefas/:id - Deletar tarefa

### Mobile (React Native)
- ✅ Listagem de tarefas
- ✅ Adicionar nova tarefa
- ✅ Editar tarefa existente
- ✅ Marcar/desmarcar como concluída
- ✅ Excluir tarefa com confirmação
- ✅ Interface moderna e responsiva

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express
- CORS
- Armazenamento em memória

### Mobile
- React Native
- Expo
- Axios
- React Hooks

## 📦 Entregas

- **Repositório Backend**: Pasta `backend/`
- **Repositório Mobile**: Pasta `mobile/`

Ambos incluem README com instruções completas de execução.

## 📝 Observações

- O backend usa armazenamento em memória (os dados serão perdidos ao reiniciar)
- O app mobile precisa estar na mesma rede que o backend
- Certifique-se de configurar o IP correto no `api.js`

## 👨‍💻 Desenvolvido para

Desafio III - Individual
App React Native + Backend

---

**Pronto para uso!** Siga as instruções acima para executar o projeto.
