import React from 'react'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'
import MonacoEditor from 'react-monaco-editor'
import cloneDeep from 'clone-deep'

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
      'onAfterCreateRow',
      'onAfterRemoveRow',
      'onAfterCreateCol',
      'onAfterRemoveCol',
      'onAfterChange',
      'onMonacoChange',
      'renderEditor'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.body = cloneDeep(this.props.body)
  }

  componentWillReceiveProps (nextProps) {
    if (this.body !== nextProps.body) {
      this.body = cloneDeep(nextProps.body)
    }
  }

  makeColHeaders () {
    const { datasetRef } = this.props
    const schema = extractSchema(datasetRef)
    return schema && schema.map(i => i.title)
  }

  onAddBody () {
    // TODO - check structure & produce proper data format
    this.props.onChangeBody([['', ''], ['', '']])
  }

  onRemoveBody () {
    this.props.onChangeBody('')
  }

  onMonacoChange (body) {
    this.props.onChangeBody(body)
  }

  onAfterCreateRow (start, rows, source) {
    this.props.onChangeBody(cloneDeep(this.body))
  }
  onAfterRemoveRow (changes, source) {
    this.props.onChangeBody(cloneDeep(this.body))
  }
  onAfterCreateCol (changes, source) {
    this.props.onChangeBody(cloneDeep(this.body))
  }
  onAfterRemoveCol (changes, source) {
    this.props.onChangeBody(cloneDeep(this.body))
  }
  onAfterChange (changes, source) {
    if (source === 'loadData' || !changes) {
      return
    }
    this.props.onChangeBody(cloneDeep(this.body))
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
            data={this.body}
            onAfterChange={this.onAfterChange}
            onAfterCreateRow={this.onAfterCreateRow}
            onAfterRemoveRow={this.onAfterRemoveRow}
            onAfterCreateCow={this.onAfterCreateCol}
            onAfterRemoveCow={this.onAfterRemoveCol}
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
