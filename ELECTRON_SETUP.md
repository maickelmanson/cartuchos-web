# Configuração Electron — Cartuchos Web Desktop

Este documento descreve como o Electron foi configurado para transformar o projeto web em um aplicativo de desktop.

## 📋 Estrutura Adicionada

```
electron/
  ├── main.js          ← Processo principal do Electron
  ├── preload.js       ← Script de preload (segurança)
  └── assets/          ← Ícones e recursos (será criado)
```

## 🚀 Como Usar

### Desenvolvimento

Para rodar o aplicativo em modo desenvolvimento:

```bash
pnpm dev:electron
```

Isso irá:
1. Iniciar o servidor backend (Express)
2. Iniciar o frontend (Vite React)
3. Abrir a janela do Electron

### Build para Desktop

#### Windows (NSIS + Portable)
```bash
pnpm build:electron:win
```
Gera: `dist/Cartuchos Web Setup 1.0.0.exe` e `Cartuchos Web 1.0.0.exe`

#### macOS (DMG + ZIP)
```bash
pnpm build:electron:mac
```
Gera: `dist/Cartuchos Web-1.0.0.dmg` e `Cartuchos Web-1.0.0.zip`

#### Linux (AppImage + DEB)
```bash
pnpm build:electron:linux
```
Gera: `dist/Cartuchos Web-1.0.0.AppImage` e `cartuchos-web_1.0.0_amd64.deb`

#### Todos os Sistemas
```bash
pnpm build:electron
```

## 🔧 Configuração

### Arquivo: `electron/main.js`

**Responsabilidades:**
- Criar janela do aplicativo
- Iniciar servidor Express (backend)
- Gerenciar ciclo de vida da aplicação
- Criar menu da aplicação
- Comunicação IPC (Inter-Process Communication)

**Características:**
- Detecta ambiente (dev/prod) com `electron-is-dev`
- Em desenvolvimento: abre DevTools automaticamente
- Em produção: carrega HTML estático do build
- Servidor Express roda como processo filho

### Arquivo: `electron/preload.js`

**Responsabilidades:**
- Expor APIs seguras para o renderer process (React)
- Usar `contextBridge` para evitar XSS

**APIs Disponíveis:**
```javascript
window.electronAPI.getAppInfo()  // Obter informações da app
window.electronAPI.quitApp()     // Fechar aplicação
```

### Arquivo: `package.json`

**Configuração de Build (`build` section):**
- `appId`: ID único da aplicação
- `productName`: Nome exibido
- `files`: Arquivos incluídos no build
- `win`, `mac`, `linux`: Configurações específicas por SO

## 📦 Dependências Adicionadas

- **electron** — Framework desktop
- **electron-builder** — Ferramenta de build
- **electron-is-dev** — Detectar ambiente
- **concurrently** — Rodar múltiplos processos
- **wait-on** — Aguardar servidor iniciar

## 🎯 Próximas Etapas

1. **Criar ícones** — Adicionar `electron/assets/` com:
   - `icon.ico` (Windows)
   - `icon.icns` (macOS)
   - `icon.png` (Linux)

2. **Migração para SQLite** — Trocar MySQL por SQLite para funcionar offline

3. **Sincronização** — Implementar sincronização de dados com servidor (opcional)

4. **Auto-update** — Configurar atualizações automáticas

## 🔐 Segurança

- ✅ `nodeIntegration: false` — Desabilitado
- ✅ `contextIsolation: true` — Isolamento de contexto
- ✅ `preload.js` — Script de preload seguro
- ✅ `contextBridge` — Exposição controlada de APIs

## 🐛 Troubleshooting

### Erro: "Cannot find module 'tsx'"
```bash
pnpm install
```

### Erro: "Port 3000 already in use"
Mude a porta em `client/vite.config.ts` ou mate o processo anterior.

### Erro: "electron not found"
```bash
pnpm add -D electron
```

## 📚 Referências

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build/)
- [Electron Security](https://www.electronjs.org/docs/tutorial/security)

---

**Versão:** 1.0 | **Data:** 26/03/2026
