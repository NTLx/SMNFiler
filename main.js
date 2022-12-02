/*
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \SMNFiler\SMNFiler\main.js
 */
var { app, BrowserWindow, globalShortcut } = require("electron");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const path = require("path");
const fs = require("fs");
const url = require("url");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 680,
    height: 410,
    autoHideMenuBar: true,
    frame: true,
    transparent: false,
    resizable: true,
    alwaysOnTop: false, // [true] had bad experience on windows
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, //slove the alarm problem
      enableRemoteModule: true, //ensure renderer.js can be used normally require('electron').remote
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.on("focus", () => {
    globalShortcut.register("CommandOrControl+F", function () {
      if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send("on-find", "");
      }
    });
  });
  mainWindow.on("blur", () => {
    globalShortcut.unregister("CommandOrControl+F");
  });

}
// const ipc = require("electron").ipcMain;
// ipc.on("tab3", () => {

// });
app.on("ready", function () {
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  const { app } = require("electron");
  var filepath = path.join(app.getPath("temp"));
  var filename = "SMNFiler.log";
  fs.unlink(path.join(filepath, filename), function (err) {
    if (err) {
      console.log("An error ocurred updating the file" + err.message);
      return;
    }
    console.log("File successfully deleted");
  });
  app.quit();
  globalShortcut.unregister("CommandOrControl+F");
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
