import axios from 'axios';

// Altere este IP para o IP da sua máquina na rede local
// Para encontrar seu IP: ipconfig (Windows) ou ifconfig (Mac/Linux)
// Para web use localhost
const API_URL = 'http://localhost:3000/api/tarefas';

// Se estiver usando emulador Android, use: http://10.0.2.2:3000/api/tarefas
// Se estiver usando dispositivo físico, use o IP da sua máquina na rede

export const getTarefas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const createTarefa = async (tarefa) => {
  try {
    const response = await axios.post(API_URL, tarefa);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
};

export const updateTarefa = async (id, tarefa) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tarefa);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

export const deleteTarefa = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};
