/* globals __BUILD__ */
import { app } from 'electron'
import { spawn } from 'child_process'
import { EventEmitter } from 'events'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs'
import CompareVersions from 'compare-versions'

export default class Backend extends EventEmitter {
  constructor () {
    super()

    if (process.env.NODE_ENV === 'development') {
      // if we're in dev mode write to this process
      this.out = process.stdout
      this.err = process.stderr
    } else {
      this.out = fs.openSync('/tmp/qri.log', 'a')
      this.err = fs.openSync('/tmp/qri.log', 'a')
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

  // ensure updated qri backend exists
  install () {
    this.log('checking for updated install')
    return new Promise((resolve, reject) => {
      let qriPath, proc

      // don't install in dev mode
      if (process.env.NODE_ENV === 'development') {
        resolve(`${this.resourcesPath()}/qri`)
      }

      try {
        proc = spawn(this.installScriptPath(), [], {
          env: {
            'BINARY_PATH': `${this.resourcesPath()}/qri`
          }
        })
      } catch (err) {
        reject(err)
      }

      proc.stdout.on('data', (path) => {
        this.log(`install data: ${path}`)
        // qriPath = new String(path).replace(/\n/, '')
        // TODO - silly hack for the moment
        qriPath = '/usr/local/bin/qri'
      })
      proc.stderr.on('data', (err) => {
        this.log(`install error: ${err}`)
        reject(err)
      })
      proc.on('close', (code) => {
        resolve(qriPath)
      })
      proc.on('error', (err) => {
        this.log(`install: error: ${err}`)
        reject(err)
      })
    })
  }

  start (qriPath) {
    if (this.backend) { return }
    this.log(`starting qri from path ${qriPath}`)

    try {
      this.backend = spawn(
        qriPath,
        ['server', '--init'],
        {
          shell: true,
          env: Object.assign({}, process.env),
          stdio: ['ignore', this.out, this.err]
        }
      )
    } catch (err) {
      throw err
    }

    this.backend.on('close', (code) => {
      this.log('closed backend process')
    })
    this.backend.on('error', (err) => {
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
