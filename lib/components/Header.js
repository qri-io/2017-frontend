import React from 'react'
import PropTypes from 'prop-types'

// import NavLinks from './chrome/NavLinks'
import PageTitle from './PageTitle'
// import Spinner from './chrome/Spinner'

export default class Header extends React.PureComponent {
  render () {
    // const { text, leftChild, rightChild, linkList, url, smLink, spinner } = this.props

    return (
      <div className='section header-wrap'>
        {/*
        <div className='datasetContent' >
          <div className='header-spinner-wrap'>
            {spinner && <div className='header-spinner'><Spinner button white center={false} /></div>}
          </div>
          <div className='header-top' >
            {leftChild || <h2 style={{ color: 'white', marginTop: 10 }}>{text}</h2>}
            {rightChild}
          </div>
          <div>
            { url && linkList && <NavLinks url={url} linkList={linkList} sm={smLink} /> }
          </div>
        </div>
      */}
        <PageTitle pageTitle='Network' sectionTitle='peers' />
      </div>
    )
  }
}

Header.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape(
      {
        link: PropTypes.string,
        name: PropTypes.string
      }
    )
  ),
  text: PropTypes.string,
  leftChild: PropTypes.object,
  rightChild: PropTypes.object,
  smLink: PropTypes.bool
}

Header.defaultProps = {
}
