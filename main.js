const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

const argv = process.argv.slice(2);
let mainWindow;
let willQuitApp = false;  // 控制退出方式

function createWindow(width=1200, height=600) {
  // electron 5.0.6 在window默认顶部左上角加菜单栏，用此方法可以去掉
  Menu.setApplicationMenu(null);

  return new BrowserWindow({
    width,
    height,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: false,
    title: 'lego-web',
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: false, // 不集成 Nodejs
      webSecurity: false,
      preload: path.join(__dirname, `./public/renderer.js`) // 预加载的 js 文件内仍可以使用 Nodejs 的 API
    }
  })
}

/**
 * 主程序启动
 */
app.on('ready', function () {
  mainWindow = createWindow();
  mainWindow.on('close', (e) => {
    if (!willQuitApp) {
      e.preventDefault();
      mainWindow.hide();
    } else {
      mainWindow = null
    }
  });
  mainWindow.on('closed',() =>mainWindow = null);

  if (argv && argv[1] === 'dev') {
    mainWindow.loadURL(`http://localhost:5000`);
    mainWindow.webContents.openDevTools();
    globalShortcut.register('f5', function() {
      mainWindow.reload();
    });
  } else if (argv && argv[1] === 'build') {
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.webContents.openDevTools();
    globalShortcut.register('f5', function() {
      mainWindow.reload();
    });
  } else {
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  }
});

/**
 * 全部窗口都被销毁
 */
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * 销毁前
 */
app.on('before-quit', () => {
  willQuitApp = true
});

/**
 * 点击引用桌面图标
 */
app.on('activate', () => mainWindow.show());
