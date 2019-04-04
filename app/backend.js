/* globals __BUILD__ */
// import {chunksToLinesAsync, chomp} from '@rauschma/stringio'
import { app, dialog } from 'electron'
import { spawn } from 'child_process'
import { EventEmitter } from 'events'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs'
import os from 'os'
import CompareVersions from 'compare-versions'

export default class Backend extends EventEmitter {
  constructor () {
    super()

    if (process.env.NODE_ENV === 'development') {
      // if we're in dev mode write to this process
      this.out = process.stdout
      this.err = process.stderr
    } else {
      const logPath = path.join(os.tmpdir(), 'qri.log')
      this.out = fs.openSync(logPath, 'a')
      this.err = fs.openSync(logPath, 'a')
    }

    let methods = [
      'log',
      'installScriptPath',
      'resourcesPath',
      'init',
      'install',
      'start',
      'destroy'
    ]
    methods.forEach((m) => { this[m] = this[m].bind(this) })

    this.init().catch((err) => {
      this.log(`init error ${err}`)
    })
  }

  log (str) {
    (process.env.NODE_ENV === 'development')
      ? console.log(str)
      : fs.write(this.out, str + '\n', () => { })
  }

  installScriptPath () {
    return path.resolve(this.resourcesPath(), 'install.sh')
  }

  resourcesPath () {
    return (process.env.NODE_ENV === 'development')
      ? path.resolve(__dirname, '../resources/')
      : process.resourcesPath
  }

  init () {
    let timer, start = new Date()

    return this
      .install()
      .then((qriPath) => {
      // continually hit server until it's ready
        return new Promise((resolve, reject) => {
          const check = () => {
            const now = new Date()

            if ((now.valueOf() - start.valueOf()) > 30000) {
              clearInterval(timer)
              reject('qri backend took too long to start 🙁')
            }

            fetch(process.env.API_URL).then(res => {
              if (res.status === 200) {
                clearInterval(timer)
                resolve()
                this.emit('connect')
              } else {
                this.start(qriPath)
              }
            }).catch(err => {
              this.start(qriPath)
            })
          }
          check()
          timer = setInterval(check, 2000)
        })
      })
  }

  // ensure updated qri backend exists, resolve with path to binary
  install () {
    // this.log('checking for updated install')
    return new Promise((resolve, reject) => {
      resolve(`${this.resourcesPath()}/${platformName()}/qri`)
    })
  }

  start (qriPath) {
    if (this.backend) { return }
    this.log(`starting qri from path ${qriPath}`)

    try {
      this.backend = spawn(
        qriPath,
        ['connect', '--setup'],
        {
          // shell: true,
          // env: Object.assign({}, process.env),
          stdio: ['ignore', this.out, this.err]
        }
      )
    } catch (err) {
      throw err
    }

    this.backend.on('close', (code) => {
      if (process.env.NODE_ENV !== 'development') {
        dialog.showErrorBox("Qri Backend Closed", "For some unexpected reason the Qri backend process has closed. Things aren't going to work well. Mind restarting?")
      }
      this.log('closed backend process')
    })
    this.backend.on('error', (err) => {
      if (process.env.NODE_ENV !== 'development') {
        dialog.showErrorBox("Qri Backend Error", err)
      }
      this.log(`backend error: ${err}`)
    })
  }

  destroy () {
    if (!this.backend) {
      return
    }
    console.log('killing backend process')
    try {
      this.backend.kill()
    } catch (err) {
      console.error('exit backend error', err.stack)
    }
  }
}

// return a conventional name for the current platform OS
function platformName() {
  switch (process.platform) {
    case 'darwin':
    return 'mac'
  case 'win32':
    return 'win'
  case 'linux':
    return 'linux'
  }
  // unsupported: 'aix' 'freebsd' 'openbsd' 'sunos'
  return ''
}