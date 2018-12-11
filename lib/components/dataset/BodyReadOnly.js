import React from 'react'
import Base from '../Base'
import Button from '../chrome/Button'
import ExternalLink from '../ExternalLink.APP_TARGET'

export default class BodyReadOnly extends Base {
  template (css) {
    const { peername, name } = this.props
    return (
      <div className={css('readOnly')}>
        <p>View the dataset body using the Qri Desktop App</p>
        <ExternalLink href='https://qri.io/download/' target='_blank' ><Button large text='Download the Qri App' /></ExternalLink>
        <p className={css('marginTop')}>Launch the app and navigate to: </p>
        <p className='linkMedium'>{`${peername}/${name}`}</p>
        <p>Then add the dataset to view the body!</p>
      </div>
    )
  }
  styles () {
    return {
      readOnly: {
        margin: 'auto',
        marginTop: 40,
        width: 600,
        textAlign: 'center'
      },
      marginTop: {
        marginTop: 20
      }
    }
  }
}

BodyReadOnly.propTypes = {
}

BodyReadOnly.defaultProps = {
}
