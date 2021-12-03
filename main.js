/*
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \SMNFiler\SMNFiler\main.js
 */
const {app, BrowserWindow,globalShortcut} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
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
      contextIsolation:false,//slove the alarm problem
      enableRemoteModule:true //ensure renderer.js can be used normally require('electron').remote
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () { mainWindow = null })
}
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
let newwin=null;
ipc.on('tab3',()=>
{
    if(newwin){
      newwin.show()
    }else{
      newwin = new BrowserWindow({
        width: 600, 
        height: 300,
        autoHideMenuBar: true,
        frame: true,
        transparent: false,
        resizable: true,
        x:1000,
        y:300,
        parent: mainWindow, //mainWindow是主窗口
        webPreferences: {
          nodeIntegration: true,
          contextIsolation:false,//slove the alarm problem
          enableRemoteModule:true //ensure renderer.js can be used normally require('electron').remote
        }
    })
    newwin.loadURL(path.join('file:',__dirname,'new.html')); //new.html是新开窗口的渲染进程
    newwin.on('closed',()=>{newwin = null})
    newwin.on('focus',()=>{
      globalShortcut.register('CommandOrControl+F', function () {
        if (newwin && newwin.webContents) {
          newwin.webContents.send('on-find', '')
        }
      })
    })
    newwin.on('blur', () => {
      globalShortcut.unregister('CommandOrControl+F')
    })
    }
})
app.on('ready', function() { createWindow() })

// Quit when all windows are closed.
app.on('window-all-closed', function () { 
  app.quit() 
  globalShortcut.unregister('CommandOrControl+F')
})

app.on('activate', function () { if (mainWindow === null) createWindow() })