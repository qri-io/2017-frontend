import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import ValidInput from './ValidInput'
import ValidTextarea from './ValidTextarea'

import ProfileProps from '../../propTypes/profile'

export default class ProfileForm extends Base {
  template (css) {
    const { profile, onChange } = this.props
    return (
      <div>
        <div className={css('left')}>
          <ValidInput
            name='peername'
            label='Peername'
            value={profile.peername}
            onChange={onChange}
          />
          <ValidInput
            name='name'
            label='Name'
            value={profile.name}
            onChange={onChange}
          />
          <ValidInput
            name='email'
            label='Email'
            value={profile.email}
            onChange={onChange}
          />
          <ValidInput
            name='twitter'
            label='Twitter'
            value={profile.twitter}
            onChange={onChange}
          />
          <ValidInput
            name='homeURL'
            label='Home URL'
            value={profile.homeurl}
            onChange={onChange}
          />
        </div>
        <div className={css('right')}>
          <ValidTextarea
            name='description'
            label='About Me'
            value={profile.description}
            onChange={onChange}
          />
        </div>
      </div>
    )
  }
  styles () {
    return {
      left: {
        width: '48%',
        paddingRight: '5px',
        display: 'inline-block',
        float: 'left'
      },
      right: {
        width: '48%',
        paddingLeft: '5px',
        display: 'inline-block',
        float: 'right'
      }
    }
  }
}

ProfileForm.propTypes = {
  profile: ProfileProps,
  onChange: PropTypes.func.isRequired
}

ProfileForm.defaultProps = {

}
