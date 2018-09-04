import React from 'react'

import CodeEditor from './CodeEditor'
import Base from './Base'

export default class Transform extends Base {
  template (css) {
    return <CodeEditor mode='html' readOnly />
  }

  styles () {
    return {}
  }
}

Transform.propTypes = {

}

Transform.defaultPros = {

}
