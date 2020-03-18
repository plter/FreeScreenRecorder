// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.electron = require("electron");
window.path = require("path");
window.appPath = window.electron.remote.app.getAppPath();