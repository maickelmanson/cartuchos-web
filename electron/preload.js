const { contextBridge, ipcMain } = require('electron');

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getAppInfo: () => ipcMain.invoke('get-app-info'),
  quitApp: () => ipcMain.invoke('quit-app'),
});
