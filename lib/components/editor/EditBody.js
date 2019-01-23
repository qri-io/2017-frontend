/* globals alert */

import React from 'react'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'
import MonacoEditor from 'react-monaco-editor'

import { generateSchemaFromRow } from '../../utils/generateSchema'

import Base from '../Base'
import ValidSelect from '../form/ValidSelect'
import Button from '../chrome/Button'

import cloneDeep from 'clone-deep'

export default class EditBody extends Base {
  constructor (props) {
    super(props);
    [
      'onAddBody',
      'onRemoveBody',
      'onBeforeChange',
      'onMonacoChange',
      'renderEditor',
      'onSetView',
      'removeColumnHeaders',
      'moveColumnHeaders',
      'createColumnHeader',
      'setColumnHeaders',
      'colHeaders'
    ].forEach((m) => { this[m] = this[m].bind(this) })
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

  onAddBody () {
    // TODO - check structure & produce proper data format
    this.props.onSetBody([['', ''], ['', '']])
  }

  onSetView (name, value) {
    const { structure, bodyParsable, body } = this.props
    const { schema } = structure
    if (value === 'table') {
      if (!bodyParsable) {
        alert("Body is invalid in it's current state. Please fix it before changing to table view")
        return
      }
      if (!Array.isArray(body)) {
        alert('Table view is reserved for two dimentional data, the top level body must be an array.')
        return
      }
      const row = body[0]
      if (body.some(r => !Array.isArray(r) || r.length !== row.length)) {
        alert('Table view is reserved for two dimentional data, each element in the body must be an array and must be the same length.')
        return
      }
      if (schema && (!schema.type || schema.type !== 'array' || !schema.items || schema.items.type !== 'array' || !schema.items.items || !Array.isArray(schema.items.items) || schema.items.items.length !== row.length)) {
        alert('The current schema does not match the structure of the body. If you remove the current schema, Qri will generate a basic schema for you')
        return
      }
      const newSchema = generateSchemaFromRow(row)
      this.props.setSchema(newSchema)
      this.props.onSetView(value)
      return
    }
    this.props.onSetView(value)
  }

  onRemoveBody () {
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

  createColumnHeader (index, amount, source) {
    if (source === 'ObserveChanges.change') {
      return
    }
    const { columnHeaders } = this.props
    var newColumnHeaders = cloneDeep(columnHeaders)
    // adding a new column
    newColumnHeaders.splice(index, 0, { 'title': 'col_' + (index + 1) })
    // TODO (ramfox): is this a problem? re-writing the entire schema?
    this.setColumnHeaders(newColumnHeaders)
  }

  removeColumnHeaders (index, amount) {
    const { columnHeaders } = this.props
    var newColumnHeaders = cloneDeep(columnHeaders)
    newColumnHeaders.splice(index, amount)
    this.setColumnHeaders(newColumnHeaders)
  }

  moveColumnHeaders (columns, target) {
    const { columnHeaders } = this.props
    console.log(columns)
    console.log(columns[0])
    console.log(columns.length)
    var mutable = cloneDeep(columnHeaders)
    var move = mutable.splice(columns[0], columns.length)
    if (target > columns[0]) {
      target = target - columns.length
    }
    var newColumnHeaders = []
    console.log(mutable.slice(0, target))
    console.log(move)
    console.log(mutable.slice(target))
    newColumnHeaders = newColumnHeaders.concat(mutable.slice(0, target), move, mutable.slice(target))
    this.setColumnHeaders(newColumnHeaders)
  }

  colHeaders () {
    const { columnHeaders } = this.props
    console.log('columnHeaders')
    console.log(columnHeaders)
    return !columnHeaders || columnHeaders.map(i => i.title)
  }

  renderEditor () {
    const {
      body,
      bodyString,
      bodyView,
      columnHeaders
    } = this.props

    const options = {
      selectOnLineNumbers: true
    }

    switch (bodyView) {
      case 'json':
        return (
          <MonacoEditor
            language='json'
            theme='vs-dark'
            value={bodyString}
            options={options}
            onChange={this.onMonacoChange}
            // editorDidMount={this.editorDidMount}
          />
        )
      case 'table':
      default:
        return (
          <HotTable
            colHeaders={this.colHeaders()}
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
            afterCreateCol={this.createColumnHeader}
            afterColumnMove={this.moveColumnHeaders}
            afterRemoveCol={this.removeColumnHeaders}
          />
        )
    }
  }

  template (css) {
    const {
      body,
      bodyView
    } = this.props

    if (body === undefined) {
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
          <div className={css('select')}>
            <ValidSelect label='view' name='view' options={['table', { value: 'json', text: 'json editor' }]} onChange={this.onSetView} allowEmpty={false} labelTop value={bodyView} />
          </div>
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
      },
      select: {
        width: 100,
        display: 'inline-block'
      },
      columnHeaders: {
        width: 200,
        display: 'inline-block',
        marginLeft: 20
      }
    }
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
