/**
 * Created by plter on 3/25/17.
 */

const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

const DialogInterfaces = {
    showOpenDirectoryDialog: function (title, defaultPath, callback) {
        let result = ipcRenderer.sendSync("showOpenDirectoryDialog", title, defaultPath);
        callback(result);
    }
};

module.exports = DialogInterfaces;