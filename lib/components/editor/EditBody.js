import React from 'react'
import PropTypes from 'prop-types'
import HotTable from 'react-handsontable'
import MonacoEditor from 'react-monaco-editor'

import { extractColumnHeaders } from '../../selectors/dataset'

import { generateSchemaFromRow } from '../../utils/generateSchema'

import Base from '../Base'
import ValidSelect from '../form/ValidSelect'
import ValidCheck from '../form/ValidCheck'
import Button from '../chrome/Button'

export default class EditBody extends Base {
  constructor (props) {
    super(props);
    [
      'makeColHeaders',
      'onAddBody',
      'onRemoveBody',
      'onBeforeChange',
      'onMonacoChange',
      'renderEditor',
      'onSetView'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  makeColHeaders () {
    const { structure } = this.props
    const schema = extractColumnHeaders({ dataset: { structure } })
    if (!schema) {
      // make a schema and return
      return true
    }
    const cols = schema && schema.map(i => i.title)
    return cols
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
        .then(this.props.onSetView(value))
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

  renderEditor () {
    const {
      body,
      bodyString,
      structure,
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
            colHeaders={this.makeColHeaders()}
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
          />
        )
    }
  }

  template (css) {
    const {
      body,
      structure,
      bodyView,
      toggleColumnHeaders
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
