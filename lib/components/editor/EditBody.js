/* globals alert */

import React from 'react'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'
import MonacoEditor from 'react-monaco-editor'

import {
  generateSchemaFromRow,
  generateCollapsedChanges,
  generateParsedSchema
} from '../../utils/generate'

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
      'onCollapseChanges',
      'checkSchemaAndBody'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { bodyView } = this.props
    const check = this.checkSchemaAndBody(bodyView)
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
    if (this.props.bodyView === 'table') {
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

  checkSchemaAndBody (bodyView) {
    const { structure, body: prevBody, columnHeaders, colOrder, rowOrder } = this.props
    var { schema } = structure
    var body = prevBody
    if (bodyView === 'table') {
      // case where we have the body as a string, but need it to be
      // an object
      if (typeof prevBody === 'string') {
        try {
          body = JSON.parse(prevBody)
          this.props.onSetBody(body)
        } catch (e) {
          return "Body is invalid in it's current state."
        }
      }
      // case where we have the body (which is an object)
      // and we want to display in table view. We need to make sure
      // it is the correct shape:
      if (!Array.isArray(body)) {
        return 'Table view is reserved for two dimentional data, the top level body must be an array.'
      }
      const row = body[0]
      if (body.some(r => !Array.isArray(r) || r.length !== row.length)) {
        return 'Table view is reserved for two dimentional data, each element in the body must be an array and must be the same length.'
      }
      // From now one we know we have a 2D array!
      //
      // if the schema is a string, parse it
      schema = generateParsedSchema(schema)
      //
      // if a string is returned from generateParsedSchema:
      // TODO (ramfox): use actual error handling...
      if (typeof schema === 'string') {
        return schema
      }
      //
      // from here on guarenteed a parsed or undefined schema!
      if (schema) {
        // We have a schema!
        if (!schema.type || schema.type !== 'array' || !schema.items || schema.items.type !== 'array' || !schema.items.items || !Array.isArray(schema.items.items) || schema.items.items.length !== row.length) {
          return 'The current schema does not match the structure of the body. If you remove the current schema, Qri will generate a basic schema for you'
        }
        // case where the body is a 2D array and we have schema that
        // matches the body!
        return {
          schema,
          colOrder: schema.items.items.map((elem, index) => index),
          rowOrder: row.map((elem, index) => index),
          body
        }
      }
      // We have do not have a schema, so we must generate it!
      schema = generateSchemaFromRow(row)
      return {
        schema,
        colOrder: schema.items.items.map((elem, index) => index),
        rowOrder: row.map((elem, index) => index),
        body
      }
    }
    // From here on in, we want the bodyView to be json:
    // case where we want to have json view, and the body is already a string
    // we don't have to make any changes
    if (typeof body === 'string') {
      return { body }
    }
    // case where we are trying to set view to json, and we have a
    // non-string body
    // we have to collapse the changes and stringify that (when we no longer use stringify)
    const changed = generateCollapsedChanges(body, columnHeaders, colOrder, rowOrder)
    if (changed) {
      body = JSON.stringify(changed.body, null, 2)
      return {
        body,
        schema: changed.schema,
        colOrder: changed.colOrder,
        rowOrder: changed.rowOrder
      }
    }

    body = JSON.stringify(body, null, 2)
    return { body }
  }

  onSetView (name, value) {
    const check = this.checkSchemaAndBody(value)
    if (typeof check === 'string') {
      this.props.setBodyError(check)
      this.props.onSetView(value)
      return
    }

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
            value={body}
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
      bodyView,
      bodyError
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
          {bodyError
            ? <div className={css('error')}>
              {bodyError}
              <br />
            Please fix these errors or return to the Json editor view.
            </div>
            : this.renderEditor(css)}
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
      },
      error: {
        margin: 'auto',
        color: '#ffffff'
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
