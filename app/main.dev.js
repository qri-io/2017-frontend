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
import { app, BrowserWindow, TouchBar, crashReporter, dialog } from 'electron'
import MenuBuilder from './menu'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
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

app.on('ready', async () => {
  // app.setPath('temp', '/tmp')

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    titleBarStyle: 'hiddenInset'
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
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
  mainWindow.setTouchBar(touchBar)

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  console.log('starting qri...')

  var backgroundProcess = new BrowserWindow({show: false})

  const out = fs.openSync('/tmp/out.log', 'a')
  const err = fs.openSync('/tmp/out.log', 'a')

  // dialog.showErrorBox('process.env', JSON.stringify(Object.assign({}, process.env, {
  //   PATH: '/usr/bin', IPFS_PATH: '/tmp/ipfs', QRI_PATH: '/tmp/qri'
  // })))

  const qriprocess = spawn(
    path.resolve(`${__dirname}/../../backend/qri`),
    ['server'],
    {
      shell: false,
      env: Object.assign({}, process.env, {
        PATH: '/usr/bin',
        IPFS_PATH: '/tmp/ipfs',
        QRI_PATH: '/tmp/qri'
      }),
      // cwd: __dirname,
      stdio: ['ignore', out, err]
    }
  )

  crashReporter.start({
    productName: 'qri',
    companyName: 'qri.io'
  })

  qriprocess.on('close', (code) => {
    dialog.showErrorBox('qri process closed', `code: ${code}`)
  })

  qriprocess.on('error', (err) => {
    // TODO - this might not work b/c not executing on
    // main process
    dialog.showErrorBox('qri process error', err)
    crashReporter.start({
      productName: 'qri',
      companyName: 'qri.io',
      submitURL: 'https://qri.io/url-to-submit',
      uploadToServer: false,
      extra: err
    })
  })
})

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // Ignore clicks if already spinning
    if (spinning) {
      return
    }

    spinning = true
    result.label = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 seconds
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      if ((Date.now() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Slow down a bit on each spin
        timeout *= 1.1
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  return values[Math.floor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size
  if (uniqueValues === 1) {
    // All 3 values are the same
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // No values are the same
    result.label = '🙁 Spin Again'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar([
  spin,
  new TouchBarSpacer({size: 'large'}),
  reel1,
  new TouchBarSpacer({size: 'small'}),
  reel2,
  new TouchBarSpacer({size: 'small'}),
  reel3,
  new TouchBarSpacer({size: 'large'}),
  result
])
