const { app, BrowserWindow } = require('electron')
const port = 40992; // Deve ser a mesma porta do Servidor Vue.js (webpack de desenvolvimento): no arquivo que está em app/config/vue/webpacks/dev.js (partindo da raiz do projeto)
const selfHost = `http://localhost:${port}`;

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Carrega a página do Servidor Vue.js (webpack de desenvolvimento)
  win.loadURL(selfHost);

  // Open the DevTools.
  win.webContents.openDevTools()
}

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