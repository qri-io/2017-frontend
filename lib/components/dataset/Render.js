import React from 'react'
export default class Render extends React.PureComponent {
  render () {
    const { peername, name, path, layout } = this.props
    var url = `${peername}/${name}`
    if (path !== '') {
      url += `/at${path}`
    }
    console.log(url)
    return (
      <iframe style={{ width: '100%', height: layout.height, border: 'none' }} src={`http://localhost:2503/render/${url}`} />
    )
  }
}
