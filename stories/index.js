import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../lib/components/chrome/Button.js'
import '../lib/app.global.scss'

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')} text='qri button' />)
  .add('loading', () => <Button loading text='loading button' />)
