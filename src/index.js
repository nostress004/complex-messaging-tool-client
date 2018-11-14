import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import { start } from 'repl';
const notifier = require('electron-notifications');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let loginWindow, messageWindow, usersWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);
const path = require('path');
const url = require('url');

// auth stuff ************************************************************
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/userSchema');
require('./services/passport');

const PORT = 3000;
const expressApp = express();
const server = expressApp.listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

expressApp.use(bodyParser.json());

expressApp.use(
  cookieSession({
    //30 days before it will automatically expire
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

expressApp.use(passport.initialize());
expressApp.use(passport.session());

expressApp.get('/login', function(req, res, next) {
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })(req, res, next);
  createUsersWindow();
  loginWindow.loadURL(res.getHeaders().location);
});

expressApp.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.sendStatus(200);
    console.log(req.session);
    initStore(req.user);
    if (loginWindow) {
      loginWindow.destroy();
    }
  }
);

expressApp.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

// auth stuff ends *******************************************************************

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createLoginWindow = async () => {
  // Create the browser window.
  loginWindow = new BrowserWindow({
    title: 'CMT',
    width: 900,
    height: 650
  });

  const startUrl = url.format({
    pathname: `file://${__dirname}/index.html`,
    hash: 'login'
  });

  // and load the index.html of the app.

  loginWindow.loadURL(startUrl);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    loginWindow.webContents.openDevTools();
  }

  loginWindow.setMenu(null);

  // Emitted when the window is closed.
  loginWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    loginWindow = null;
  });
};

const createMessageWindow = async () => {
  // Create the browser window.
  messageWindow = new BrowserWindow({
    title: 'CMT',
    width: 1280,
    height: 768,
    show: false
  });

  const startUrl = url.format({
    pathname: `file://${__dirname}/index.html`,
    hash: 'messages'
  });

  // and load the index.html of the app.

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

  usersWindow.loadURL(startUrl);

  // Open the DevTools.
  if (isDevMode && usersWindow.show) {
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
    if (messageWindow) {
      messageWindow.destroy();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createLoginWindow);
app.on('ready', createMessageWindow);

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
  if (loginWindow === null) {
    createLoginWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function initStore(store) {
  usersWindow.webContents.send('storeData', {
    auth: store,
    userList: null,
    messageList: null
  });
}

// IPC listeners

ipcMain.on('messageUser', async (event, store, conversation) => {
  if (!messageWindow) {
    const windowTMP = await createMessageWindow();
  }
  if (messageWindow || windowTMP) {
    console.log();
    messageWindow.show();
    console.log('creaaaaaaaaaaaating window');
    console.log(store);
    messageWindow.webContents.send('messageData', {
      auth: store,
      conversation: conversation
    });
  }
});
