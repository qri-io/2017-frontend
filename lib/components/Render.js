import React from 'react'
import Base from './Base'

export default class Render extends Base {
  template (css) {
    const { peername, name } = this.props
    return (
      <iframe style={{width: '100%', height: '100%', border: 'none'}} src={`http://localhost:2503/render/${peername}/${name}`} />
    )
  }
}
