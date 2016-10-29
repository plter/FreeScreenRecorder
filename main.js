const electron = require('electron')
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Config = require("./src/Config");
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 380, height: 80});

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/src/views/index/index.html`)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

function createTray() {
    let tray = new electron.Tray(path.join(Config.APP_DIR, "res/images/icon_16.png"));
    const contextMenu = electron.Menu.buildFromTemplate([
        {
            label: '退出',
            accelerator: "CmdOrCtrl+Q",
            click: (item, focusedWindow)=> {
                app.quit();
            }
        }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=> {
    // createTray();
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
