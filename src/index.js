import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import openSocket from 'socket.io-client';
import { start } from 'repl';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let messageWindow, usersWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);
const path = require('path');
const url = require('url');

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createMessageWindow = async () => {
  // Create the browser window.
  messageWindow = new BrowserWindow({
    title: 'CMT',
    width: 1280,
    height: 768
  });

  const startUrl = url.format({
    pathname: `file://${__dirname}/index.html`,
    hash: 'messages'
  });

  // and load the index.html of the app.

  //messageWindow.loadURL(`file://${__dirname}/index.html`);
  messageWindow.loadURL(startUrl);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    messageWindow.webContents.openDevTools();
  }

  messageWindow.setMenu(null);

  // Emitted when the window is closed.
  messageWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    messageWindow = null;
  });
};

const createUsersWindow = async () => {
  // Create the browser window.
  usersWindow = new BrowserWindow({
    title: 'CMT messenger',
    width: 400,
    height: 700
  });

  // and load the index.html of the app.
  const startUrl = url.format({
    pathname: `file://${__dirname}/index.html`,
    hash: 'users'
  });

  // and load the index.html of the app.

  //messageWindow.loadURL(`file://${__dirname}/index.html`);
  usersWindow.loadURL(startUrl);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    usersWindow.webContents.openDevTools();
  }

  usersWindow.setMenu(null);

  // Emitted when the window is closed.
  usersWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    usersWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMessageWindow);
app.on('ready', createUsersWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (messageWindow === null) {
    createMessageWindow();
  }
  if (usersWindow === null) {
    createUsersWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
