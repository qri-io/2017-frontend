import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Button from '../Button'
import ValidInput from './ValidInput'
import ValidTextarea from './ValidTextarea'

import ProfileProps from '../../propTypes/profile'

export default class ProfileForm extends Base {
  template (css) {
    const { profile, onChange, onSubmit, onCancel } = this.props
    return (
      <div>
        <div className={css('left')}>
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
        </div>
        <div className={css('right')}>
          <ValidTextarea
            name='description'
            label='About Me'
            value={profile.description}
            onChange={onChange}
          />
        </div>
        <Button color='a' type='submit' text='Save' onClick={onSubmit} />
        <Button color='neutral-bold' onClick={onCancel} text='Cancel' />
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
        display: 'inline-block'
      }
    }
  }
}

ProfileForm.propTypes = {
  profile: ProfileProps,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

ProfileForm.defaultProps = {

}
