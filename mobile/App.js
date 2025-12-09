import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getTarefas, createTarefa, updateTarefa, deleteTarefa } from './api';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState({ id: null, titulo: '', descricao: '', concluida: false });

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    setLoading(true);
    try {
      const data = await getTarefas();
      setTarefas(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas. Verifique se o backend está rodando.');
    }
    setLoading(false);
  };

  const abrirModal = (tarefa = null) => {
    if (tarefa) {
      setEditando(true);
      setTarefaAtual(tarefa);
    } else {
      setEditando(false);
      setTarefaAtual({ id: null, titulo: '', descricao: '', concluida: false });
    }
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setTarefaAtual({ id: null, titulo: '', descricao: '', concluida: false });
  };

  const salvarTarefa = async () => {
    if (!tarefaAtual.titulo.trim()) {
      Alert.alert('Atenção', 'O título é obrigatório!');
      return;
    }

    try {
      if (editando) {
        await updateTarefa(tarefaAtual.id, tarefaAtual);
        Alert.alert('Sucesso', 'Tarefa atualizada!');
      } else {
        await createTarefa(tarefaAtual);
        Alert.alert('Sucesso', 'Tarefa criada!');
      }
      fecharModal();
      carregarTarefas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  };

  const removerTarefa = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTarefa(id);
              Alert.alert('Sucesso', 'Tarefa removida!');
              carregarTarefas();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover a tarefa.');
            }
          }
        }
      ]
    );
  };

  const toggleConcluida = async (tarefa) => {
    try {
      await updateTarefa(tarefa.id, { ...tarefa, concluida: !tarefa.concluida });
      carregarTarefas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tarefaContainer}>
      <TouchableOpacity 
        style={styles.tarefaContent}
        onPress={() => toggleConcluida(item)}
      >
        <View style={[styles.checkbox, item.concluida && styles.checkboxConcluida]}>
          {item.concluida && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.tarefaTexto}>
          <Text style={[styles.titulo, item.concluida && styles.tituloConcluido]}>
            {item.titulo}
          </Text>
          {item.descricao ? (
            <Text style={styles.descricao}>{item.descricao}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
      <View style={styles.acoes}>
        <TouchableOpacity 
          style={styles.botaoEditar}
          onPress={() => abrirModal(item)}
        >
          <Text style={styles.botaoTexto}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botaoDeletar}
          onPress={() => removerTarefa(item.id)}
        >
          <Text style={styles.botaoTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Minhas Tarefas</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={tarefas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma tarefa cadastrada</Text>
              <Text style={styles.emptySubtext}>Toque no + para adicionar</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.botaoAdicionar}
        onPress={() => abrirModal()}
      >
        <Text style={styles.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>
              {editando ? 'Editar Tarefa' : 'Nova Tarefa'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Título *"
              value={tarefaAtual.titulo}
              onChangeText={(texto) => setTarefaAtual({ ...tarefaAtual, titulo: texto })}
            />

            <TextInput
              style={[styles.input, styles.inputDescricao]}
              placeholder="Descrição (opcional)"
              value={tarefaAtual.descricao}
              onChangeText={(texto) => setTarefaAtual({ ...tarefaAtual, descricao: texto })}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalAcoes}>
              <TouchableOpacity 
                style={[styles.botaoModal, styles.botaoCancelar]}
                onPress={fecharModal}
              >
                <Text style={styles.botaoModalTexto}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.botaoModal, styles.botaoSalvar]}
                onPress={salvarTarefa}
              >
                <Text style={[styles.botaoModalTexto, styles.botaoSalvarTexto]}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lista: {
    padding: 15,
  },
  tarefaContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tarefaContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxConcluida: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tarefaTexto: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoEditar: {
    padding: 8,
  },
  botaoDeletar: {
    padding: 8,
  },
  botaoTexto: {
    fontSize: 20,
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  botaoAdicionarTexto: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  inputDescricao: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
  botaoModal: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#F0F0F0',
  },
  botaoSalvar: {
    backgroundColor: '#007AFF',
  },
  botaoModalTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  botaoSalvarTexto: {
    color: '#FFF',
  },
});
