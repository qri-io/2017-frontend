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
      'onCreateColumns',
      'onCreateRows',
      'onRemoveColumns',
      'onRemoveRows',
      'setColumnHeaders',
      'schemaItemsToCols',
      'onMoveColumns',
      'setReOrder',
      'onMoveRows',
      'onCollapseChanges'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { columnHeaders, body } = this.props
    const colOrder = Array.isArray(columnHeaders) && columnHeaders.map((el, index) => index)
    const rowOrder = Array.isArray(body) && body.map((el, index) => index)
    this.props.setRowOrder(rowOrder)
    this.props.setColOrder(colOrder)
  }

  componentWillUnmount () {
    this.onCollapseChanges()
  }

  onCollapseChanges () {
    const changed = this.props.onCollapseChanges()
    this.props.setSchema(changed.schema)
    this.props.onSetBody(changed.body)
    this.props.setRowOrder(undefined)
    this.props.setColOrder(undefined)
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
    // TODO - check structure & produce proper data format
    const body = [['', ''], ['', '']]
    this.props.setRowOrder(body.map((el, index) => index))
    this.props.onSetBody(body)
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
      if (schema) {
        if (!schema.type || schema.type !== 'array' || !schema.items || schema.items.type !== 'array' || !schema.items.items || !Array.isArray(schema.items.items) || schema.items.items.length !== row.length) {
          alert('The current schema does not match the structure of the body. If you remove the current schema, Qri will generate a basic schema for you')
          return
        }
        this.props.onSetView(value)
        return
      }
      const newSchema = generateSchemaFromRow(row)
      this.props.onChangeStructure({
        format: 'json'
      })
      this.props.setSchema(newSchema)
      const cols = this.schemaItemsToCols(newSchema.items.items)
      this.props.setColOrder(cols.map((elem, index) => index))
      this.props.onSetView(value)
      return
    }
    const changed = this.props.onCollapseChanges()
    this.props.setSchema(changed.schema)
    this.props.onSetBody(changed.body)
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
            <ValidSelect label='view' name='view' options={[{ value: 'table', text: 'table' }, { value: 'json', text: 'json editor' }]} onChange={this.onSetView} allowEmpty={false} labelTop value={bodyView} />
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
