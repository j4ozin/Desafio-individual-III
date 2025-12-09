const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Banco de dados em memória
let tarefas = [
  { id: 1, titulo: 'Estudar React Native', descricao: 'Aprender sobre componentes', concluida: false },
  { id: 2, titulo: 'Fazer exercícios', descricao: 'Praticar JavaScript', concluida: true }
];

let nextId = 3;

// Rotas CRUD

// GET - Listar todas as tarefas
app.get('/api/tarefas', (req, res) => {
  res.json(tarefas);
});

// GET - Buscar tarefa por ID
app.get('/api/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  
  if (tarefa) {
    res.json(tarefa);
  } else {
    res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
});

// POST - Criar nova tarefa
app.post('/api/tarefas', (req, res) => {
  const { titulo, descricao, concluida } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }
  
  const novaTarefa = {
    id: nextId++,
    titulo,
    descricao: descricao || '',
    concluida: concluida || false
  };
  
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// PUT - Atualizar tarefa
app.put('/api/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  
  const { titulo, descricao, concluida } = req.body;
  
  tarefas[index] = {
    ...tarefas[index],
    titulo: titulo !== undefined ? titulo : tarefas[index].titulo,
    descricao: descricao !== undefined ? descricao : tarefas[index].descricao,
    concluida: concluida !== undefined ? concluida : tarefas[index].concluida
  };
  
  res.json(tarefas[index]);
});

// DELETE - Remover tarefa
app.delete('/api/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  
  tarefas.splice(index, 1);
  res.status(204).send();
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Tarefas - Backend funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
