/* globals alert, confirm */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import { isEmpty, isEmptyObj } from '../../utils/reflect'
import { Parser } from 'json2csv'

import Results from './Results'
import EditMeta from './EditMeta'
import EditStructure from './EditStructure'
import EditTransform from './EditTransform'
import EditViz from './EditViz'
import EditBody from './EditBody'
import Overview from './Overview'
import NavLinks from '../chrome/NavLinks'
import { addActiveToLink } from '../../utils/links'

import Base from '../Base'
import Button from '../chrome/Button'
import Dropdown from '../chrome/Dropdown'
import DropdownMenu from '../chrome/DropdownMenu'

const RunOpts = [
  'Dry Run',
  'Save'
]

export default class Editor extends Base {
  constructor (props) {
    super(props)

    this.state = {
      runOpt: RunOpts[0],
      resultTab: 'local',
      results: undefined,
      datasetError: '',
      datasetMessage: ''
    };

    [
      'onChooseRunOpt',
      'onRun',
      'onDryRun',
      'onRunAndSave',
      'onReset'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChooseRunOpt (runOpt) {
    this.setState({ runOpt })
  }

  onReset () {
    if (confirm('reset to blank dataset? This\'ll erase any unsaved work')) {
      this.props.initDataset()
    }
  }

  onRun () {
    let { name, dataset, transformScript, vizScript, body } = this.props
    dataset = Object.assign({}, dataset, { name })

    // TODO - this probably shouldn't happen here
    // the schema editor needs to work on a string, our dataset.structure.schema needs JSON
    if (dataset.structure && dataset.structure.schema && dataset.structure.schema.constructor === String) {
      try {
        dataset.structure = Object.assign({}, dataset.structure, { schema: JSON.parse(dataset.structure.schema) })
      } catch (e) {
        alert('dataset schema is invalid, plz fix before running')
        return
      }
    }

    if (body && body.constructor === String) {
      try {
        body = JSON.parse(body)
      } catch (e) {
        alert('dataset body is invalid plz fix before running')
        return
      }
    }

    if (body && dataset.structure.format === 'csv') {
      // TODO - set noHeader based on dataset.structure.formatConfig
      body = new Parser({ header: false }).parse(body)
    } else {
      body = JSON.stringify(body)
    }
    if (body === '""') {
      body = ''
    }

    this.setState({ datasetError: '', datasetMessage: '', results: undefined, loading: true })

    switch (this.state.runOpt) {
      case RunOpts[0]:
        this.onDryRun(name, dataset, transformScript, vizScript, body)
        break
      case RunOpts[1]:
        this.onRunAndSave(name, dataset, transformScript, vizScript, body)
        break
    }
  }

  onDryRun (name, dataset, transformScript, vizScript, body) {
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

  onRunAndSave (name, dataset, transformScript, vizScript, body) {
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
    const { runOpt, resultTab, datasetError, datasetMessage, results, loading } = this.state
    const { match, name, dataset, transformScript, vizScript, body } = this.props
    // TODO - make use of setCommit func props
    const { setName, setMeta, setStructure, setTransform, setViz, setTransformScript, setVizScript, setBody, updateBody } = this.props

    return (
      <div className={`${css('wrap')} editor`}>

        <section className={css('switcher')}>
          <div className={css('sections')}>
            <NavLinks url={match.path} linkList={this.sections()} />
          </div>
          <div className={css('actions')}>
            <div style={{ float: 'right', margin: 10 }}>
              <span style={{ float: 'left', marginRight: 15 }}><Button text='Reset' onClick={this.onReset} name='Reset' /></span>
              <Dropdown text={runOpt} onClick={this.onRun} name='run' dropdown={DropdownMenu} options={RunOpts} onChooseOption={this.onChooseRunOpt} loading={loading} />
            </div>
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
                    onChangeStructure={setStructure}
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
        display: 'flex'
      },
      sections: {
        padding: '15px 20px',
        flex: '1 1 50%'
      },
      actions: {
        flex: '1 1 50%'
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
