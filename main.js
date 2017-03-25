const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Config = require("./src/Config");
const path = require('path');
const globalShortcut = electron.globalShortcut;

//additions
require("./src/main/DialogsImplements");

class Main {

    constructor() {
        this.addListeners();
    }

    createWindow() {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({width: 380, height: 280});

        // and load the index.html of the app.
        this.mainWindow.loadURL("file://" + path.join(Config.getRenderersDir(), "index", "index.html"));

        // Open the DevTools.
        // this.mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        this.mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null;
        });
    }

    createTray() {
        this.tray = new electron.Tray(path.join(Config.getImagesDir(), "icon_16.png"));
        const contextMenu = electron.Menu.buildFromTemplate([
            {
                label: '退出',
                accelerator: "CmdOrCtrl+Q",
                click: (item, focusedWindow) => {
                    app.quit();
                }
            }
        ]);
        this.tray.setToolTip('This is my application.');
        this.tray.setContextMenu(contextMenu);
    }

    addListeners() {
        app.on('ready', () => {
            this.createTray();
            this.createWindow();
            this.registerGlobalShortcuts();
        });

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
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });

        app.on('will-quit', () => {
            this.unregisterAllGlobalShortcuts();
        });


        ipcMain.on("stopped", event => {
            this.tray.setImage(path.join(Config.getImagesDir(), "icon_16.png"));
            event.returnValue = 1;
        });

        ipcMain.on("paused", event => {
            this.tray.setImage(path.join(Config.getImagesDir(), "icon_paused_16.png"));
            event.returnValue = 1;
        });

        ipcMain.on("recording", event => {
            this.tray.setImage(path.join(Config.getImagesDir(), "icon_recording_16.png"));
            event.returnValue = 1;
        });

    }

    registerGlobalShortcuts() {
        //Start or stop button
        globalShortcut.register("CommandOrControl+8", () => {
            this.sendStartOrStopButtonClickedEvent();
        });
        //Pause or resume button
        globalShortcut.register("CommandOrControl+9", () => {
            this.sendPauseOrResumeButtonClickedEvent();
        });
    }

    sendPauseOrResumeButtonClickedEvent() {
        this.mainWindow.webContents.send("pauseOrResume");
    }

    sendStartOrStopButtonClickedEvent() {
        this.mainWindow.webContents.send("startOrStop");
    }

    unregisterAllGlobalShortcuts() {
        globalShortcut.unregisterAll();
    }
}

new Main();