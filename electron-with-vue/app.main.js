// Depencias gerais
const { app, protocol, BrowserWindow } = require('electron')
const isDev = process.env.NODE_ENV === "development"; // Boolean gerado através da variavel de ambiente que define se o aplicativo está rodando como desenvolvimento ou produção

// Dependencias do desenvolvimento
const port = 40992; // Deve ser a mesma porta do Servidor Vue.js (webpack de desenvolvimento): no arquivo que está em app/config/vue/webpacks/dev.js (partindo da raiz do projeto)
const selfHost = `http://localhost:${port}`;

// Dependencias de produção
const Protocol = require("./app/config/electron/protocol");

function createWindow () {
  // Caso estja em produção
  // Registra um protocolo Handler que saberá pegar o arquivo da compilação do vue que será exibido
  // (Precisa ocorrer antes de criar ou carregar a pagina do browser)
  if (!isDev) protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler)
  
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false // false, por questão de segurança
    }
  })
  
  // Caso estja em desenvolvimento
  if (isDev) {
    // Carrega a página do Servidor Vue.js (webpack de desenvolvimento)
    win.loadURL(selfHost)

    // Open the DevTools.
    win.webContents.openDevTools()
  } else {
    // Carrega o arquivo estático (Compilado do vuejs) através do protocolo
    // Está sendo carregado o arquivo html do webpack Vue.js
    win.loadURL(`${Protocol.scheme}://rse/index.html`)
  }
}

// Permite que o nosso scheme tenha acesso e carregue os arquivos necessários
// E também ao armazenamento local, cookies, etc...
// Precisa ser chamado antes do app estiver pronto (Ready)
// (https://electronjs.org/docs/api/protocol#protocolregisterschemesasprivilegedcustomschemes)
protocol.registerSchemesAsPrivileged([{
  scheme: Protocol.scheme,
  privileges: {
    standard: true,
    secure: true
  }
}])

// Esse método será chamado quano o Electron terminar de
// iniciar e estiver pronto para criar o broser window.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Finaliza quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // No macOS é comum a re-criação da janela no aplicativo quando o
  // icone da barra for clicado e não outras janelas abertas
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Nesse arquivo você pode incluir os outros processos principais do seu aplicativo
// Você também pode colocar eles em arquivos separados e requeridos-as aqui.