import React from 'react'
import Base from './Base'

export default class Viz extends Base {
  template (css) {
    const { dataset } = this.props
    const scriptPath = dataset && dataset.viz && dataset.viz.scriptPath
    if (scriptPath) {
      return <div className={css('wrap')}><iframe style={{width: '100%', height: '100%', border: 'none'}} src={`http://localhost:2503${scriptPath}`} /></div>
    }
    return <p>No viz provided in this dataset</p>
  }

  styles () {
    return {
      wrap: {
        height: '100%'
      }
    }
  }
}

Viz.propTypes = {

}

Viz.defaultPros = {

}
