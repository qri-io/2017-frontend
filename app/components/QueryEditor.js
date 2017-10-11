import React, { PropTypes } from 'react'

import Base from './Base'
import CodeEditor from './CodeEditor'
import { datasetCompleter } from '../ace/completer/datasets'

export default class QueryEditor extends Base {
  template (css) {
    const { name, query, onDownload, onRun, onChange, bounds } = this.props

    return (
      <div className={css('wrap')}>
        <CodeEditor
          name={name}
          value={query.queryString}
          completers={[datasetCompleter]}
          width={`${bounds.width - 40}px`}
          height={`${bounds.height - 80}px`}
          onChange={value => onChange({ queryString: value, address: query.address })}
        // TODO - reenable when adding back completion
        // setOptions={{
        //   enableBasicAutocompletion: true,
        //   enableLiveAutocompletion: true
        // }}
      />
        <button className='btn btn-primary' style={{ marginRight: 10 }} onClick={onDownload}>Download</button>
        <button className='btn btn-primary' onClick={onRun}>Run</button>
      </div>
    )
  }

  style () {
    return {
      wrap: {
        zIndex: '0',
        position: 'relative',
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
        minHeight: 180
      },
      'codeEditor.wrap .editor': {
        position: absolute,
        top: '0',
        right: '0',
        left: '0',
        minHeight: '180',
        background: '#2A2E2E',
        borderRadius: 3
      }
    }
  }
}

QueryEditor.propTypes = {
  name: PropTypes.string.isRequired,
  query: PropTypes.object,
  // datasets: PropTypes.array,
  onRun: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  bounds: PropTypes.object
}

QueryEditor.defaultProps = {
  query: {
    queryString: ''
  }
}
