import { app } from 'electron'
import { spawn } from 'child_process'
import { EventEmitter } from 'events'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs'

export default class Backend extends EventEmitter {
  constructor (props) {
    super()
    this.init()
  }

  init () {
   // continually hit server until it's ready
    return new Promise((resolve, reject) => {
      let timer
      const start = new Date()

      const check = () => {
        const now = new Date()

        if ((now.valueOf() - start.valueOf()) > 45000) {
          clearInterval(timer)
          reject('qri backend took too long to start 🙁')
        }

        fetch('http://localhost:3000').then(res => {
          if (res.status === 200) {
            clearInterval(timer)
            resolve()
            this.emit('connect')
          } else {
            this.spawnProcess()
          }
        }).catch(err => {
          this.spawnProcess()
        })
      }
      check()
      timer = setInterval(check, 2000)
    })
  }

  spawnProcess () {
    if (this.backend) { return }
    console.log('starting new qri server...')

    let out = fs.openSync('/tmp/out.log', 'a')
    let err = fs.openSync('/tmp/out.log', 'a')
    let backendPath = path.resolve(`${__dirname}/../../backend`)
    let processEnv = {
      PATH: '/usr/bin',
      IPFS_PATH: `${backendPath}/ipfs`,
      QRI_PATH: `${backendPath}/qri`
    }

    if (process.env.NODE_ENV === 'development') {
      // if we're in dev mode write to this process
      out = 'inherit'
      err = 'inherit'
      // write to project backend path
      backendPath = path.resolve(`${__dirname}/../backend`)
      // overwrite processEnv to inherit settings from
      // executing shell
      processEnv = {}
    }

    try {
      this.backend = spawn(
        backendPath + '/bin/qri',
        ['server', '--init-ipfs'],
        {
          shell: false,
          env: Object.assign({}, process.env, processEnv),
          // cwd: __dirname,
          stdio: ['ignore', out, err]
        }
      )
    } catch (err) {
      throw err
    }

    this.backend.on('close', (code) => {
      // dialog.showErrorBox('qri process closed', `code: ${code}`)
    })

    this.backend.on('error', (err) => {
      // TODO - this might not work b/c not executing on
      // main process?
      dialog.showErrorBox('qri process error', err)
      crashReporter.start({
        productName: 'qri',
        companyName: 'qri.io',
        submitURL: 'https://qri.io/url-to-submit',
        uploadToServer: false,
        extra: err
      })
    })
  }

  destroy () {
    console.log('killing backend process')
    try {
      this.backend.kill()
    } catch (err) {
      console.error('exit backend error', err.stack)
    }
  }
}