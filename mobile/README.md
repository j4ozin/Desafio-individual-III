# App Mobile - Gerenciador de Tarefas

App React Native com Expo para gerenciar tarefas (CRUD completo).

## 🚀 Como executar

### Pré-requisitos
- Node.js instalado
- Expo Go instalado no seu smartphone (Android/iOS)
- Backend rodando (veja pasta `backend`)

### Configuração importante

**ANTES DE EXECUTAR**, você precisa configurar o IP do backend no arquivo `api.js`:

1. Descubra o IP da sua máquina na rede local:
   - **Windows**: Abra o CMD e digite `ipconfig` (procure por "IPv4 Address")
   - **Mac/Linux**: Abra o terminal e digite `ifconfig` ou `ip addr`

2. Edite o arquivo `api.js` e altere a linha:
   ```javascript
   const API_URL = 'http://192.168.1.100:3000/api/tarefas';
   ```
   Substitua `192.168.1.100` pelo IP da sua máquina.

3. **Alternativas**:
   - Emulador Android: use `http://10.0.2.2:3000/api/tarefas`
   - Localhost (navegador): use `http://localhost:3000/api/tarefas`

### Instalação e execução

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Iniciar o app
npm start
```

### Como usar

1. Escaneie o QR Code com o app Expo Go (Android) ou Camera (iOS)
2. O app abrirá no seu dispositivo
3. Certifique-se de que o backend está rodando

## 📱 Funcionalidades

- ✅ Listar todas as tarefas
- ✅ Adicionar nova tarefa
- ✅ Editar tarefa existente
- ✅ Marcar tarefa como concluída
- ✅ Deletar tarefa
- ✅ Interface moderna e intuitiva

## 🔧 Tecnologias

- React Native
- Expo
- Axios
- React Hooks

## 📝 Estrutura

- `App.js` - Componente principal com toda a lógica e interface
- `api.js` - Funções para comunicação com o backend
