import React from 'react'

import CodeEditor from './CodeEditor'
import Base from './Base'

export default class Viz extends Base {
  template (css) {
    return <CodeEditor mode='python' readOnly />
  }

  styles () {
    return {}
  }
}

Viz.propTypes = {

}

Viz.defaultPros = {

}
