import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'

import SectionPicker from './SectionPicker'
import Results from './Results'
import EditMeta from './EditMeta'
import EditTransform from './EditTransform'
import EditViz from './EditViz'
import Overview from './Overview'

import Base from '../Base'
import Button from '../Button'

export default class Editor extends Base {
  constructor (props) {
    super(props)

    this.state = {
      resultTab: 'local',
      datasetError: '',
      datasetMessage: ''
    };

    [
      'onRun',
      'onSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.localDataset) {
      this.props.newDataset({ peername: 'me', name: 'new', path: 'new' })
    }
  }

  onRun () {
    const { localDataset } = this.props

    this.setState({ datasetError: '', datasetMessage: '' })

    // name, file, body, viz, transform, url
    this.props.dryRunDataset('test', localDataset).then((action) => {
      if (action.response && action.response.result && action.response.result.meta) {
        this.setState({ datasetMessage: action.response.result.meta.message })
      }
    }).catch((err) => {
      this.setState({ datasetError: err })
    })
  }

  onSave () {

  }

  sections (url) {
    return [{ title: 'overview', url: url }, { title: 'meta', url: `${url}/meta` }, { title: 'viz', url: `${url}/viz` }, { title: 'transform', url: `${url}/transform` }]
  }

  template (css) {
    const { resultTab, datasetError, datasetMessage } = this.state
    const { match, location, localDataset, resultDataset, updateDataset } = this.props

    return (
      <div className={`${css('wrap')} editor`}>

        <section className={css('switcher')}>
          <div className={css('sections')}>
            <SectionPicker links={this.sections(match.path)} current={location.pathname} />
          </div>
          <div className={css('actions')}>
            <span style={{ color: '#111', float: 'left' }}>Dataset Editor</span>
            <div style={{ float: 'right', margin: 10 }}>
              <Button text='Run' onClick={this.onRun} color='c' name='run' />
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
                    meta={localDataset.meta}
                    onChange={(meta) => {
                      updateDataset(Object.assign({}, localDataset, { meta }))
                    }}
                  />
                )}
              />
              <Route
                path={`${match.path}/transform`}
                render={props => (
                  <EditTransform
                    transform={localDataset.transform}
                    onChange={(transform) => {
                      updateDataset(Object.assign({}, localDataset, { transform }))
                    }}
                  />
                )}
              />
              <Route
                path={`${match.path}/viz`}
                render={props => (
                  <EditViz
                    viz={localDataset.viz}
                    onChange={(viz) => {
                      updateDataset(Object.assign({}, localDataset, { viz }))
                    }}
                  />
                )}
              />
              <Route
                path={`${match.path}`}
                render={props => (
                  <Overview
                    localDataset={localDataset}
                  />
                )}
              />
            </Switch>
          </div>
          <div className={css('results')}>
            <Results
              currentTab={resultTab}
              resultDataset={resultDataset}
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
  // TODO - make dataset prop types
  resultDataset: PropTypes.object,
  localDataset: PropTypes.object,

  initDataset: PropTypes.func.isRequired,
  dryRunDataset: PropTypes.func.isRequired,
  newDataset: PropTypes.func.isRequired,
  updateDataset: PropTypes.func.isRequired,
  cancelDatasetEdit: PropTypes.func.isRequired
}

Editor.defaultProps = {
  localDataset: {}
}
