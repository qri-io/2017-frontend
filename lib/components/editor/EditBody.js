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
    super(props)
    this.state = {
      cols: undefined,
      order: undefined
    };
    [
      'onAddBody',
      'onRemoveBody',
      'onBeforeChange',
      'onMonacoChange',
      'renderEditor',
      'onSetView',
      'removeColumnHeaders',
      'createColumnHeader',
      'setColumnHeaders',
      'schemaItemsToCols'
      // 'moveColumnHeaders',
      // 'setReOrder'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { columnHeaders } = this.props
    // Note: why do we need a separate state for the columnsHeaders, and why don't we
    // just pass in the
    // HandsonTable tracks column _movement_ changes internally
    // and maps the given columnHeaders to the data
    // These maps reset when you remount
    // But
    // But we need to keep track of the columnHeaders and their movement
    // because these are part of our schema
    // When we remount, the columns get reloaded from the state tree
    //
    const cols = this.schemaItemsToCols(columnHeaders)
    const order = Array.isArray(cols) && cols.map((el, index) => index)
    this.setState({ cols, order })
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
      const order = cols.map((elem, index) => index)
      this.setState({ cols, order })
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

    const { order } = this.state
    var newOrder = order.map(position => position < index ? position : position + 1)
    newOrder.splice(index, 0, index)

    this.setColumnHeaders(newColumnHeaders)
    this.setState({ cols: this.schemaItemsToCols(newColumnHeaders), order: newOrder })
  }

  removeColumnHeaders (index, amount) {
    const { columnHeaders } = this.props
    var newColumnHeaders = cloneDeep(columnHeaders)
    newColumnHeaders.splice(index, amount)

    const { order } = this.state
    var newOrder = order
      .filter(position => position < index || position >= index + amount)
      .map(position => position < index + amount ? position : position - amount)

    this.setColumnHeaders(newColumnHeaders)
    this.setState({ cols: this.schemaItemsToCols(newColumnHeaders), order: newOrder })
  }

  /*

  TODO (ramfox): reordering columnHeaders works! Unfortunately, the underlying data doesn't make those same changes. So if you navigate away from the editor and navigate back, the data flips back to the original order, even while the header stays in the corret place. So until we are good about tracking these changes to the data, I'm hiding this feature. What's nice is that when it's time to get that up and running, we have a model!
  setReOrder (columns, target, mappedFirstMoveColumn) {
    const { order } = this.state
    if (mappedFirstMoveColumn === target) {
      // no changes, just return
      return
    }
    const len = columns.length
    const newOrder = order.map((lastPos, origPos) => {
      if (columns.includes(origPos)) {
        const delta = columns.indexOf(origPos)
        return target + delta
      }
      if (mappedFirstMoveColumn > target) {
        if (lastPos < target || lastPos > mappedFirstMoveColumn) {
          return lastPos
        }
        return lastPos + len
      }
      if (mappedFirstMoveColumn < (target + len - 1)) {
        if (lastPos < mappedFirstMoveColumn || lastPos > (target + len - 1)) {
          return lastPos
        }
        return lastPos - len
      }
    })
    this.setState({ order: newOrder })
  }

  moveColumnHeaders (columns, target) {
    const { columnHeaders } = this.props
    const { order } = this.state
    if (columns.length === 0 || order.length <= columns[0]) {
      alert('somehow got a move column request without any columns specified')
      return
    }

    const mappedFirstMoveColumn = order[columns[0]]

    var mutable = cloneDeep(columnHeaders)
    var move = mutable.splice(mappedFirstMoveColumn, columns.length)
    if (target > mappedFirstMoveColumn) {
      target = target - columns.length
    }
    var newColumnHeaders = []
    newColumnHeaders = newColumnHeaders.concat(mutable.slice(0, target), move, mutable.slice(target))

    this.setReOrder(columns, target, mappedFirstMoveColumn)
    this.setColumnHeaders(newColumnHeaders)
  }
  */

  renderEditor () {
    const {
      body,
      bodyString,
      bodyView
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
            colHeaders={this.state.cols}
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
            // afterColumnMove={this.moveColumnHeaders}
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
