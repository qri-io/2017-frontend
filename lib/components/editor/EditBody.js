import React from 'react'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'
import MonacoEditor from 'react-monaco-editor'

import { extractSchema } from '../../selectors/dataset'

import Base from '../Base'
import Button from '../chrome/Button'

export default class EditBody extends Base {
  constructor (props) {
    super(props);
    [
      'makeColHeaders',
      'onAddBody',
      'onRemoveBody',
      'onAfterChange',
      'onMonacoChange',
      'renderEditor'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  makeColHeaders () {
    const { datasetRef } = this.props
    const schema = extractSchema(datasetRef)
    return schema && schema.map(i => i.title)
  }

  onAddBody () {
    this.props.onChangeBody([['', ''], ['', '']])
  }

  onRemoveBody () {
    this.props.onChangeBody(undefined)
  }

  onMonacoChange (body) {
    this.props.onChangeBody(body)
  }

  onAfterChange (changes, source) {
    const { body } = this.props
    if (source === 'loadData' || !changes) {
      return
    }

    const newBody = body.concat([])
    changes.forEach((a) => {
      if (!a) {
        return
      }

      const [row, column,, newValue] = a
      if (!newBody[row]) {
        return
      }

      newBody[row] = newBody[row].map((item, i) => {
        if (i === column) {
          return newValue
        }
        return item
      })
    })

    this.props.onChangeBody(newBody)
  }

  renderEditor () {
    const { body, structure } = this.props

    const options = {
      selectOnLineNumbers: true
    }

    switch (structure.format) {
      case 'csv':
        return (
          <HotTable
            // colHeaders={[]}
            // columns={columns}
            // colWidths={100}
            rowHeaders
            manualColumnMove
            manualRowMove
            manualColumnResize
            manualRowResize
            stretchH='all'
            sortIndicator
            autoWrapRow
            viewportColumnRenderingOffset={100}
            viewportRowRenderingOffset={100}
            columnSorting
            allowInsertRow
            allowInsertColumn
            contextMenu
            data={body}
            onAfterChange={this.onAfterChange}
          />
        )
      case 'json':
        let stringBody = body
        // if we're JSON, pretty print so things are less gross
        if (body.constructor !== String) {
          // TODO - what happens in the unlikely event that this JSON data is corrupt?
          stringBody = JSON.stringify(stringBody, null, 2)
        }
        return (
          <MonacoEditor
            language='json'
            theme='vs-dark'
            value={stringBody}
            options={options}
            onChange={this.onMonacoChange}
            // editorDidMount={this.editorDidMount}
          />
        )
    }
  }

  template (css) {
    const { body, structure } = this.props

    if (!body) {
      return (
        <div className={css('wrap')}>
          <div className={css('center')}>
            <Button onClick={this.onAddBody} color='b' text='Add Body' />
          </div>
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <span style={{ float: 'right' }}>
            <Button onClick={this.onRemoveBody} color='b' text='Remove' />
          </span>
          <p>{structure.format}</p>
        </header>
        <div className={`${css('body')} editBody`}>
          {this.renderEditor()}
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      center: {
        width: 200,
        margin: '150px auto'
      },
      header: {
        flex: '1 1 30px',
        padding: '10px 4px 2px 10px'
      },
      body: {
        color: 'black',
        flex: '2 1 95%',
        width: '100%',
        overflow: 'auto'
      }
    }
  }
}

EditBody.propTypes = {
  // body: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  structure: PropTypes.object,
  onChangeBody: PropTypes.func.isRequired
}

EditBody.defaultProps = {
  structure: {}
}
