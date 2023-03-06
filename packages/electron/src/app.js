const { app, BrowserWindow } = require('electron');

// 创建窗口
const createWindow = () => {
  const win = new BrowserWindow({ width: 1000, height: 600 });
  win.loadURL('https://www.baidu.com/');
};

// ready 事件处理
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭窗口监听
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


