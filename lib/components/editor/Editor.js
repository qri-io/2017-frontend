/* globals alert, confirm */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import { isEmpty, isEmptyObj } from '../../utils/reflect'
import { Parser } from 'json2csv'

import { extractSchema } from '../../selectors/dataset'
import Results from './Results'
import EditMeta from './EditMeta'
import EditStructure from './EditStructure'
import EditTransform from './EditTransform'
import EditViz from './EditViz'
import EditBody from './EditBody'
import Overview from './Overview'
import NavLinks from '../chrome/NavLinks'
import ReadOnly from '../ReadOnly'
import { addActiveToLink } from '../../utils/links'

import Base from '../Base'

export default class Editor extends Base {
  constructor (props) {
    super(props)

    this.state = {
      resultTab: 'local',
      results: undefined,
      datasetError: '',
      datasetMessage: ''
    };

    [
      'onRun',
      'onDryRun',
      'onRunAndSave',
      'onReset'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onReset () {
    if (confirm('reset to blank dataset? This\'ll erase any unsaved work')) {
      this.props.initDataset()
    }
  }

  onRun () {
    let { name, dataset, transformScript, vizScript, body, valid } = this.props
    dataset = Object.assign({}, dataset, { name })

    var bodyParsed = []

    if (valid !== true) {
      alert(valid)
      return
    }

    if (body && body.constructor === String) {
      try {
        body = JSON.parse(body)
      } catch (e) {
        alert('dataset body is invalid plz fix before running')
        return
      }
    }

    if (body && dataset && dataset.structure && dataset.structure.format === 'csv') {
      // TODO - set noHeader based on dataset.structure.formatConfig
      const headerRow = dataset && dataset.structure && dataset.structure.formatConfig && dataset.structure.formatConfig.headerRow
      if (headerRow) {
        const schema = extractSchema({ dataset })
        var row = []
        // add space for each row
        // len = schema or row length whichever is less
        //  for len, put schema[i] in row[i]if schema, for each of schema, insert title
        body[0].forEach(r => row.push(''))

        if (schema) {
          schema.forEach(r => row.push(r.title))
        } else {
        }
        bodyParsed.push(row)
        body.forEach(r => bodyParsed.push(r))
        bodyParsed = new Parser({ header: false }).parse(bodyParsed)
      } else {
        bodyParsed = new Parser({ header: false }).parse(body)
      }
    } else {
      bodyParsed = JSON.stringify(body)
    }
    if (bodyParsed === '""') {
      bodyParsed = ''
    }
    this.setState({ datasetError: '', datasetMessage: '', results: undefined, loading: true })
    return { name, dataset, transformScript, vizScript, body: bodyParsed }
  }

  onDryRun () {
    const { name, dataset, transformScript, vizScript, body } = this.onRun()
    this.props.dryRunDataset(name, dataset, transformScript, vizScript, body).then((action) => {
      let results
      if (action.response && action.response.result && action.response.result.meta) {
        if (action.response.entities && action.response.entities.datasetDryRuns) {
          results = action.response.entities.datasetDryRuns[Object.keys(action.response.entities.datasetDryRuns)[0]]
        }
        this.setState({ datasetMessage: action.response.result.meta.message, results, loading: false })
      }
    }).catch((err) => {
      this.setState({ datasetError: err, loading: false })
    })
  }

  onRunAndSave () {
    const { name, dataset, transformScript, vizScript, body } = this.onRun()
    this.props.saveDataset(name, dataset, transformScript, vizScript, body).then((action) => {
      const { response = {} } = action

      this.setState({ loading: false })
      if (response.result && response.result.data) {
        // TODO - update local refs in dataset list
        const ref = response.entities.datasets[response.result.data]
        this.props.history.push(`/${ref.peername}/${ref.name}/at${ref.path}`)
      }
    })
      .catch((err) => {
        this.setState({ datasetError: err, loading: false })
      })
  }

  sections () {
    const { location, dataset, transformScript, vizScript, body } = this.props

    return addActiveToLink([
      { name: 'overview', link: '', faded: false },
      { name: 'meta', link: 'meta', faded: isEmptyObj(dataset.meta) },
      { name: 'structure', link: 'structure', faded: isEmptyObj(dataset.structure) },
      { name: 'transform', link: 'transform', faded: isEmpty(transformScript) },
      { name: 'viz', link: 'viz', faded: isEmpty(vizScript) },
      { name: 'body', link: 'body', faded: isEmpty(body) }
    ], location.pathname, 'overview')
  }

  template (css) {
    const {
      resultTab,
      datasetError,
      datasetMessage,
      results
    } = this.state

    const {
      match,
      name,
      dataset,
      transformScript,
      vizScript,
      body,
      bodyString,
      schemaString,
      bodyView
    } = this.props

    // TODO - make use of setCommit func props
    const {
      setName,
      setMeta,
      setStructure,
      setSchema,
      setTransform,
      setViz,
      setTransformScript,
      setVizScript,
      setBody,
      setBodyView,
      updateBody,
      id
    } = this.props

    if (!id) {
      return <ReadOnly />
    }
    return (
      <div className={`${css('wrap')} editor`}>

        <section className={css('switcher')}>
          <div className={css('sections')}>
            <NavLinks url={match.path} linkList={this.sections()} />
          </div>
          <div className={css('actions')}>
            <div className={css('opts')}><a className='white' onClick={this.onReset} >Reset</a></div>
            <div className={css('opts')}><a className='white' onClick={this.onDryRun} >Dry Run</a></div>
            <div className={css('opts')}><a className='white' onClick={this.onRunAndSave} >Save</a></div>
          </div>
        </section>

        <div className={css('contents')}>
          <div className={css('switch')} >
            <Switch>
              <Route
                path={`${match.path}/meta`}
                render={props => (
                  <EditMeta
                    meta={dataset.meta}
                    onChange={setMeta}
                    onRemove={this.props.removeSection}
                  />
                )}
              />
              <Route
                path={`${match.path}/structure`}
                render={props => (
                  <EditStructure
                    structure={dataset.structure}
                    schemaString={schemaString}
                    onChangeStructure={setStructure}
                    onChangeSchema={setSchema}
                    onRemove={this.props.removeSection}
                  />
                )}
              />
              <Route
                path={`${match.path}/transform`}
                render={props => (
                  <EditTransform
                    transform={dataset.transform}
                    onChangeTransform={setTransform}
                    script={transformScript}
                    onChangeScript={setTransformScript}
                    onRemove={this.props.removeSection}
                  />
                )}
              />
              <Route
                path={`${match.path}/viz`}
                render={props => (
                  <EditViz
                    viz={dataset.viz}
                    onChangeViz={setViz}
                    script={vizScript}
                    onChangeScript={setVizScript}
                    onRemove={this.props.removeSection}
                  />
                )}
              />
              <Route
                path={`${match.path}/body`}
                render={props => (
                  <EditBody
                    body={body}
                    structure={dataset.structure}
                    onSetBody={setBody}
                    onUpdateBody={updateBody}
                    onRemove={this.props.removeSection}
                    onSetView={setBodyView}
                    bodyView={bodyView}
                    bodyString={bodyString}
                  />
                )}
              />
              <Route
                path={`${match.path}`}
                render={props => (
                  <Overview
                    localDataset={dataset}
                    name={name}
                    onChangeName={setName}
                  />
                )}
              />
            </Switch>
          </div>
          <div className={css('results')}>
            <Results
              currentTab={resultTab}
              resultDataset={results}
              message={datasetMessage}
              error={datasetError}
            />
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      },
      header: {
        flex: '1 1 90px'
      },
      switcher: {
        flex: '1 1 40px',
        background: '#262626',
        display: 'flex',
        justifyContent: 'space-between'
      },
      sections: {
        padding: '15px 20px',
        flex: '1 1 50%',
        display: 'flex',
        justifyContent: 'space-between'
      },
      actions: {
        flex: '1 1 50%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      contents: {
        flex: '2 2 90%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        background: '#1e1e1e'
      },
      switch: {
        overflow: 'hidden',
        flex: '2 1 60%'
      },
      results: {
        flex: '1 1 40%',
        overflow: 'auto'
      },
      opts: {
        margin: 10
      }
    }
  }
}

Editor.propTypes = {
  // session props
  profilePeername: PropTypes.string,

  // dataset props
  name: PropTypes.string,
  // TODO - make dataset prop types
  dataset: PropTypes.object.isRequired,
  transformScript: PropTypes.string,
  vizScript: PropTypes.string,
  // TODO - body can be undefined
  // body: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

  // TODO - make dataset prop types
  resultDataset: PropTypes.object,

  // editor actions
  initDataset: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setCommit: PropTypes.func.isRequired,
  setMeta: PropTypes.func.isRequired,
  setStructure: PropTypes.func.isRequired,
  setTransform: PropTypes.func.isRequired,
  setViz: PropTypes.func.isRequired,
  setTransformScript: PropTypes.func.isRequired,
  setVizScript: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,

  // dataset manipulation actions
  dryRunDataset: PropTypes.func.isRequired,
  saveDataset: PropTypes.func.isRequired
}

Editor.defaultProps = {}
