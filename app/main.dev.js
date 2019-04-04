/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import electron, { app, BrowserWindow, crashReporter, dialog } from 'electron'
import { autoUpdater } from "electron-updater"
import MenuBuilder from './menu'
import Backend from './backend'
import touchbar from './touchbar'

const isDevelopment = (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD !== 'false')

// let mainWindow = null
let backend = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (isDevelopment) {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'src', 'node_modules')
  require('module').globalPaths.push(p)
}

const installExtensions = () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ]

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log)
}

// crashReporter.start({
//   productName: 'Qri',
//   companyName: 'Qri, Inc.',
//   submitURL: 'https://qri.io/crash-reports',
//   uploadToServer: false
// })

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('will-finish-launching', async () => {})

app.on('ready', async () => {
  autoUpdater.checkForUpdatesAndNotify()
  
  // app.setPath('temp', '/tmp')
  electron.session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = 'electron://local.qri.io'
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  if (isDevelopment) {
    await installExtensions()
  }

  backend = new Backend()
  createMainWindow()
  // backend.on('connect', createMainWindow)
})

app.on('quit', () => {
  if (backend) {
    backend.destroy()
  }
})

function createMainWindow () {
  let mainWindow = new BrowserWindow({
    show: false,
    width: 1500,
    height: 728,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#E6E6E6'
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)
  // mainWindow.loadURL(`http://google.com`)

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  // mainWindow.webContents.on('did-finish-load', () => {
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.setTouchBar(touchbar)

  if (isDevelopment && !isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools()

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click () {
          mainWindow.inspectElement(props.x, props.y)
        }
      }]).popup(mainWindow)
    })
  }

  const menuBuilder = new MenuBuilder(mainWindow, createMainWindow)
  menuBuilder.buildMenu()
}
