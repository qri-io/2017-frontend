import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import CodeEditor from './CodeEditor'
import { datasetCompleter } from '../ace/completer/datasets'
import { Palette, defaultPalette } from '../propTypes/palette'

export default class QueryEditor extends Base {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    };
    [
      'handleOnRun'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.setState({error: this.props.error})
  }

  componentWillReceiveProps () {
    this.setState({error: this.props.error})
  }

  handleOnRun (e) {
    this.setState({error: ''})
    this.props.onRun(e)
  }

  template (css) {
    const { name, query, onChange } = this.props
    return (
      <div className={css('wrap')}>
        <CodeEditor
          name={name}
          value={query.queryString}
          completers={[datasetCompleter]}
          width='100%'
          height='200px'
          onChange={value => onChange({ queryString: value, address: query.address })}
          // TODO - reenable when adding back completion
          // setOptions={{
          //   enableBasicAutocompletion: true,
          //   enableLiveAutocompletion: true
          // }}
        />
        <div className={css('details')}>
          <button className={`btn btn-primary ${css('button')}`} onClick={this.handleOnRun}>Run</button>
          <div className={css('inlineBlock', 'error')} >{this.state.error}</div>
        </div>
      </div>
    )
  }

  styles (props) {
    const {palette} = props
    return {
      wrap: {
        zIndex: '0',
        position: 'relative',
        width: '100%',
        marginBottom: 10,
        minHeight: 180
      },
      'codeEditor.wrap .editor': {
        position: 'absolute',
        top: '0',
        right: '0',
        left: '0',
        minHeight: '180',
        background: '#2A2E2E',
        borderRadius: 3
      },
      details: {
        position: 'absolute',
        bottom: '0',
        width: '100%'
      },
      button: {
        float: 'right',
        background: palette.a,
        marginRight: 10,
        marginBottom: 10
      },
      error: {
        color: palette.error,
        width: '80%',
        paddingLeft: 50
      }
    }
  }
}

QueryEditor.propTypes = {
  name: PropTypes.string.isRequired,
  query: PropTypes.object,
  // datasets: PropTypes.array,
  onRun: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  palette: Palette
}

QueryEditor.defaultProps = {
  query: {
    queryString: ''
  },
  palette: defaultPalette
}
