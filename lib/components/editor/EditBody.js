/* globals alert File confirm */

import React from 'react'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'
import MonacoEditor from 'react-monaco-editor'

import {
  generateSchemaFromRow,
  generateCollapsedChanges,
  generateMatchingSchemaAndBody
} from '../../qri/generate'
import ValidSelect from '../form/ValidSelect'
import Button from '../chrome/Button'

import cloneDeep from 'clone-deep'

export default class EditBody extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dropZoneState: ''
    };
    [
      'onAddBody',
      'onRemoveBody',
      'onBeforeChange',
      'onMonacoChange',
      'renderEditor',
      'onSetView',
      'onCreateColumns',
      'onCreateRows',
      'onRemoveColumns',
      'onRemoveRows',
      'setColumnHeaders',
      'schemaItemsToCols',
      'onMoveColumns',
      'setReOrder',
      'onMoveRows',
      'onCollapseChanges',
      'handleSetBodyFile',
      'handleDrop',
      'handleDragOver',
      'handleDragEnd',
      'handleDragLeave',
      'handleUploadBodyFile'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    const { bodyView, structure, body: prevBody, columnHeaders, colOrder, rowOrder } = this.props
    if (prevBody && prevBody.constructor === File) {
      // if we have a body file, we don't need to ensure the schema matches
      // the user inputed body, because that body will have been erased
      // as soon as the user uploaded a body file
      return
    }
    const check = generateMatchingSchemaAndBody(bodyView, structure, prevBody, columnHeaders, colOrder, rowOrder)
    if (typeof check === 'string') {
      this.props.setBodyError(check)
      return
    }
    if (bodyView === 'table') {
      const { body, schema, colOrder, rowOrder } = check
      if (body) {
        this.props.onSetBody(body)
      }
      if (schema) {
        this.props.setSchema(schema)
      }
      if (colOrder) {
        this.props.setColOrder(colOrder)
      }
      if (rowOrder) {
        this.props.setRowOrder(rowOrder)
      }
      this.props.setBodyError()
    }
  }

  componentWillUnmount () {
    const { body, bodyView } = this.props
    if (body && body.constructor !== File && bodyView === 'table') {
      this.onCollapseChanges()
    }
  }

  onCollapseChanges () {
    const { body, columnHeaders, colOrder, rowOrder } = this.props
    const changed = generateCollapsedChanges(body, columnHeaders, colOrder, rowOrder)
    if (changed) {
      this.props.setSchema(changed.schema)
      this.props.onSetBody(changed.body)
      this.props.setRowOrder(changed.rowOrder)
      this.props.setColOrder(changed.colOrder)
    }
  }

  handleDragOver (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ dropZoneState: 'edit-body-drag-over' })
  }

  handleDragLeave (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ dropZoneState: '' })
  }

  handleDrop (e) {
    e.preventDefault()
    const dt = e.dataTransfer
    let file = dt.items[0]
    if (file.kind === 'file') {
      file = file.getAsFile()
      this.handleSetBodyFile([file])
      this.setState({ dropZoneState: '' })
      return
    }
    alert('Files must be in csv, json, or cbor format')
    this.setState({ dropZoneState: '' })
  }

  handleDragEnd (e) {
    e.preventDefault()
    let dt = e.dataTransfer
    if (dt.items) {
      for (var i = 0; i < dt.items.length; i++) {
        dt.items.remove(i)
      }
    } else {
      dt.clearData()
    }
  }

  handleUploadBodyFile (e) {
    this.handleSetBodyFile(e.target.files)
  }

  handleSetBodyFile (files) {
    if (files.length > 1) {
      alert('error, only one file allowed')
      return
    } else if (files[0].name.endsWith('.csv') ||
        files[0].name.endsWith('.json') ||
        files[0].name.endsWith('.cbor')) {
      var cont = confirm('Uploading a body file will remove any unsaved work on the previous body. Press ok to continue.')
      if (cont) {
        this.props.onSetBody(files[0])
      }
      return
    }
    alert('Files must be in csv, json, or cbor format')
  }

  setColumnHeaders (columnHeaders) {
    this.props.setSchema({
      type: 'array',
      items: {
        type: 'array',
        items: columnHeaders
      }
    })
  }

  schemaItemsToCols (items) {
    return !items || items.map(i => i.title)
  }

  onAddBody () {
    // if there is no body before create a basic 2D array.
    // if we are in bodyView json parse that array
    const { bodyView } = this.props
    var body = [['', ''], ['', '']]
    if (bodyView === 'json') {
      this.props.onSetBody(JSON.stringify(body, null, 2))
      return
    }
    // if we are in not in json view generate a schema from that body
    // set the schema, the col and row order, and the body
    const newSchema = generateSchemaFromRow(body[0])
    this.props.setSchema(newSchema)
    this.props.setColOrder(newSchema.items.items.map((elem, index) => index))
    this.props.setRowOrder(body[0].map((elem, index) => index))
    this.props.onSetBody(body)
  }

  onSetView (name, value) {
    this.props.onSetView(value)
  }

  onRemoveBody () {
    this.props.onSetBody()
    this.props.onRemove('body')
  }

  onMonacoChange (body) {
    this.props.onSetBody(body)
  }

  onBeforeChange (changes, source) {
    if (source === 'loadData' || !changes) {
      return
    }
    this.props.onUpdateBody(changes)
  }

  onCreateColumns (index, amount, source) {
    if (source === 'ObserveChanges.change') {
      return
    }
    const { columnHeaders } = this.props
    var newColumnHeaders = cloneDeep(columnHeaders)
    // adding a new column
    newColumnHeaders.splice(index, 0, { 'title': 'col_' + (index + amount) })

    const { colOrder } = this.props
    var newColOrder = colOrder.map(position => position < index ? position : position + amount)
    newColOrder.splice(index, 0, index)

    this.setColumnHeaders(newColumnHeaders)
    this.props.setColOrder(newColOrder)
  }

  onCreateRows (index, amount, source) {
    if (source === 'ObserveChanges.change') {
      return
    }
    const { rowOrder } = this.props
    var newRowOrder = rowOrder.map(position => position < index ? position : position + amount)
    newRowOrder.splice(index, 0, index)

    this.props.setRowOrder(newRowOrder)
  }

  onRemoveColumns (index, amount) {
    const { columnHeaders } = this.props
    var newColumnHeaders = cloneDeep(columnHeaders)
    newColumnHeaders.splice(index, amount)

    const { colOrder } = this.props
    var newColOrder = colOrder
      .filter(position => position < index || position >= index + amount)
      .map(position => position < index + amount ? position : position - amount)

    this.setColumnHeaders(newColumnHeaders)
    this.props.setColOrder(newColOrder)
  }

  onRemoveRows (index, amount) {
    const { rowOrder } = this.props
    var newRowOrder = rowOrder
      .filter(position => position < index || position >= index + amount)
      .map(position => position < index + amount ? position : position - amount)

    this.props.setRowOrder(newRowOrder)
  }

  setReOrder (elems, target, mapped, order, source) {
    if (mapped === target) {
      // no changes, just return
      return
    }
    const len = elems.length
    const newOrder = order.map((lastPos, origPos) => {
      if (elems.includes(origPos)) {
        const delta = elems.indexOf(origPos)
        return target + delta
      }
      if (mapped > target) {
        if (lastPos < target || lastPos > mapped) {
          return lastPos
        }
        return lastPos + len
      }
      if (mapped < (target + len - 1)) {
        if (lastPos < mapped || lastPos > (target + len - 1)) {
          return lastPos
        }
        return lastPos - len
      }
    })

    if (source === 'row') {
      this.props.setRowOrder(newOrder)
      return
    }
    this.props.setColOrder(newOrder)
  }

  onMoveColumns (columns, target) {
    // const { columnHeaders } = this.props
    const { colOrder } = this.props
    if (columns.length === 0 || colOrder.length <= columns[0]) {
      alert('somehow got a move column request without any columns specified')
      return
    }
    const mapped = colOrder[columns[0]]
    this.setReOrder(columns, target, mapped, colOrder, 'col')
  }

  onMoveRows (rows, target) {
    const { rowOrder } = this.props
    if (rows.length === 0 || rowOrder.length <= rows[0]) {
      alert('somehow got a move row request without any rows specified')
      return
    }
    const mapped = rowOrder[rows[0]]
    if (mapped < target) {
      target = target - rows.length
    }
    this.setReOrder(rows, target, mapped, rowOrder, 'row')
  }

  renderEditor () {
    const {
      body,
      bodyView,
      columnHeaders,
      layout
    } = this.props

    const options = {
      selectOnLineNumbers: true
    }

    if (body && body.constructor === File) {
      return (
        <div className='edit-body-file-box'>
          <div className='edit-body-file-name'>
            <div className='edit-body-remove' onClick={this.onRemoveBody}>x</div>
            {body.name}
          </div>
        </div>)
    }

    switch (bodyView) {
      case 'json':
        return (
          <MonacoEditor
            language='json'
            theme='vs-dark'
            value={body}
            options={options}
            onChange={this.onMonacoChange}
            height={layout.height - 100}
            // editorDidMount={this.editorDidMount}
          />
        )
      case 'table':
      default:
        return (
          <HotTable
            colHeaders={!columnHeaders || this.schemaItemsToCols(columnHeaders)}
            // columns={columns}
            // colWidths={100}
            className='editor'
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
            onBeforeChange={this.onBeforeChange}
            afterCreateCol={this.onCreateColumns}
            afterColumnMove={this.onMoveColumns}
            afterRemoveCol={this.onRemoveColumns}
            afterCreateRow={this.onCreateRows}
            afterRemoveRow={this.onRemoveRow}
            afterRowMove={this.onMoveRows}
          />
        )
    }
  }

  render () {
    const {
      body,
      bodyView,
      bodyError
    } = this.props

    const { dropZoneState } = this.state
    let style = 'edit-body-wrap'
    if (dropZoneState) {
      style += style + ' ' + dropZoneState
    }
    return (
      <div
        className={style}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragEnd={this.handleDragEnd}
        onDragLeave={this.handleDragLeave} >
        { body === undefined
          ? <div className='edit-body-center'>
            <Button onClick={this.onAddBody} color='b' text='Add Body' />
          </div>
          : <div className='edit-body-wrap'>
            <header className='edit-body-header'>
              <span style={{ float: 'right' }}>
                <label htmlFor='bodyFileUpload' className='btn'>Upload</label>
                <input
                  className='edit-body-display-none'
                  type='file'
                  name='bodyFile'
                  id='bodyFileUpload'
                  onChange={this.handleUploadBodyFile}
                  ref={(input) => { this.fileUpload = input }} />
                <Button onClick={this.onRemoveBody} color='b' text='Remove' />
              </span>
              { // if there is a body and it is a file, don't show the selector
                body && !(body.constructor === File) &&
                <div className='edit-body-select'>
                  <ValidSelect label='view' name='view' options={[{ value: 'table', text: 'table' }, { value: 'json', text: 'json editor' }]} onChange={this.onSetView} allowEmpty={false} labelTop value={bodyView} />
                </div>}
            </header>
            <div className='edit-body-body editBody'>
              {bodyError
                ? <div className='edit-body-error'>
                  {bodyError}
                  <br /><br />
                Please adjust to view the data in <span style={{ fontWeight: 500 }}>table</span> mode.
                </div>
                : this.renderEditor()}
            </div>
          </div>
        }
      </div>
    )
  }
}

EditBody.propTypes = {
  // body: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  structure: PropTypes.object,
  onSetBody: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired
}

EditBody.defaultProps = {
  structure: {}
}
