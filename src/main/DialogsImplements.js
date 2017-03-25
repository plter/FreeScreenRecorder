/**
 * Created by plter on 3/25/17.
 */

const electron = require("electron");
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

function addListeners() {
    ipcMain.on("showOpenDirectoryDialog", (event, title, defaultPath) => {
        dialog.showOpenDialog({
                title: title,
                defaultPath: defaultPath,
                properties: [
                    "openDirectory",
                    "createDirectory",
                    "promptToCreate"
                ]
            },
            function (filePaths) {
                if (filePaths) {
                    event.returnValue = filePaths[0];
                } else {
                    event.returnValue = null;
                }
            }
        );
    });
}

function init() {
    addListeners();
}

init();