import React from 'react'
import Base from './Base'

export default class Transform extends Base {
  template (css) {
    const { dataset, palette } = this.props
    const scriptPath = dataset && dataset.transform && dataset.transform.scriptPath
    if (scriptPath) {
      return <div className={css('wrap')}><iframe style={{width: '100%', height: '100%', border: 'none'}} src={`http://localhost:2503${scriptPath}`} /></div>
    }
    return <p>No transform provided in this dataset</p>
  }

  styles () {
    return {
      wrap: {
        height: '100%'
      }
    }
  }
}

Transform.propTypes = {

}

Transform.defaultProps = {
}
