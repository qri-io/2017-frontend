/* globals __BUILD__, self */

if (__BUILD__.ELECTRON) {
  // configure monaco environment
  self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
      if (label === 'json') {
        return './json.worker.bundle.js'
      }
      if (label === 'css') {
        return './css.worker.bundle.js'
      }
      if (label === 'html') {
        return './html.worker.bundle.js'
      }
      if (label === 'typescript' || label === 'javascript') {
        return './ts.worker.bundle.js'
      }
      if (__BUILD__.MODE === 'production') {
        return './editor.worker.prod.js'
      }
      return './editor.worker.bundle.js'
    }
  }
}
