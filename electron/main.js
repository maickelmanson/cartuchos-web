const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const express = require('express');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

// Criar janela principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../client/public/favicon.ico'),
  });

  // URL da aplicação
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../client/dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Abrir DevTools em desenvolvimento
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Iniciar servidor Express (backend)
function startServer() {
  return new Promise((resolve, reject) => {
    try {
      // Em produção, usar o servidor compilado
      const serverPath = isDev
        ? path.join(__dirname, '../server/index.ts')
        : path.join(__dirname, '../server/index.js');

      if (isDev) {
        // Em desenvolvimento, usar tsx para rodar TypeScript
        serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
          cwd: path.join(__dirname, '..'),
          stdio: 'inherit',
        });
      } else {
        // Em produção, rodar Node.js diretamente
        serverProcess = spawn('node', ['server/index.js'], {
          cwd: path.join(__dirname, '..'),
          stdio: 'inherit',
        });
      }

      // Aguardar servidor iniciar
      setTimeout(() => {
        resolve();
      }, 2000);

      serverProcess.on('error', (err) => {
        console.error('Erro ao iniciar servidor:', err);
        reject(err);
      });
    } catch (err) {
      console.error('Erro ao iniciar servidor:', err);
      reject(err);
    }
  });
}

// Criar menu da aplicação
function createMenu() {
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Sair',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Editar',
      submenu: [
        { label: 'Desfazer', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Refazer', accelerator: 'CmdOrCtrl+Y', role: 'redo' },
        { type: 'separator' },
        { label: 'Cortar', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copiar', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Colar', accelerator: 'CmdOrCtrl+V', role: 'paste' },
      ],
    },
    {
      label: 'Exibir',
      submenu: [
        { label: 'Recarregar', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        {
          label: 'Ferramentas do Desenvolvedor',
          accelerator: 'CmdOrCtrl+Shift+I',
          role: 'toggleDevTools',
        },
        { type: 'separator' },
        { label: 'Tela Cheia', accelerator: 'F11', role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre',
          click: () => {
            // Implementar diálogo sobre
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Quando Electron termina de inicializar
app.on('ready', async () => {
  try {
    // Iniciar servidor backend
    await startServer();
    
    // Criar janela principal
    createWindow();
    
    // Criar menu
    createMenu();
  } catch (err) {
    console.error('Erro ao inicializar aplicação:', err);
    app.quit();
  }
});

// Quando todas as janelas são fechadas
app.on('window-all-closed', () => {
  // Em macOS, aplicações geralmente permanecem ativas até o usuário sair explicitamente
  if (process.platform !== 'darwin') {
    // Encerrar servidor
    if (serverProcess) {
      serverProcess.kill();
    }
    app.quit();
  }
});

// Quando a aplicação é ativada (macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC: Obter informações da aplicação
ipcMain.handle('get-app-info', () => {
  return {
    version: app.getVersion(),
    name: app.getName(),
    isDev,
  };
});

// IPC: Fechar aplicação
ipcMain.handle('quit-app', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  app.quit();
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
});
