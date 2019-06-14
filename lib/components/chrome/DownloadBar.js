import React from 'react'
import PropTypes from 'prop-types'

import ExternalLink from '../ExternalLink.APP_TARGET'

const DownloadBar = ({ layout, peername, name }) => {
  // get layout from Dataset, assume height is same as topbar => 55px
  return (
    <div className='download-bar-wrap' style={layout} >
      <div className='download-bar-text-wrap'>
        <ExternalLink href='https://qri.io/download' >
          <h4 className='download-bar-dataset'>DOWNLOAD QRI HERE</h4>
          <h5 className='download-bar-text'>to get the underlying data from </h5><h4 className='download-bar-dataset'>{peername}/{name}</h4>
        </ExternalLink>
      </div>
      <div className='download-bar-link'><ExternalLink href='https://qri.io/docs/tutorials/frontend_get_data_from_app_to_desktop'>Need help?</ExternalLink></div>
    </div>
  )
}

DownloadBar.propTypes = {
  layout: PropTypes.object.isRequired,
  peername: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

DownloadBar.defaultProps = {
  layout: { height: 55, left: 0 }
}

export default DownloadBar
