import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../lib/components/chrome/Button.js'
import DownloadBar from '../lib/components/chrome/DownloadBar.js'

// Don't forget to import our stylesheet:
import '../lib/app.global.scss'

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')} text='qri button' />)
  .add('loading', () => <Button loading text='loading button' />)

storiesOf('Download bar', module)
  .add('standard', () => <DownloadBar layout={{ height: 55, top: 0, left: 0 }} peername='test_peer' name='test_dataset' />)
