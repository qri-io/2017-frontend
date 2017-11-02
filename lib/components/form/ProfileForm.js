import React, { PropTypes } from 'react'

import Base from '../Base'
import ValidInput from './ValidInput'
import ValidTextarea from './ValidTextarea'

import ProfileProps from '../../propTypes/profileProps'

export default class ProfileForm extends Base {
  template (css) {
    const { profile, onChange, onSubmit, onCancel } = this.props
    return (
      <div>
        <ValidInput
          name='username'
          label='Username'
          value={profile.username}
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
        <ValidTextarea
          name='description'
          label='About Me'
          value={profile.description}
          onChange={onChange}
				/>
        <input className='btn' type='submit' value='Save' onClick={onSubmit} />
        <button className='btn btn-primary' onClick={onCancel}>Cancel</button>
      </div>
    )
  }
  styles () {
  	return {

  	}
  }
}

ProfileForm.PropTypes = {

}

ProfileForm.defaultProps = {

}
