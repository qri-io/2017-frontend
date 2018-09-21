import React from 'react'
import { Route, Switch } from 'react-router'

import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'

import Base from './Base'

import NavLinks from './NavLinks'
import Structure from './Structure'
import Meta from './Meta'
import TransformContainer from '../containers/Transform'
import CommitsContainer from '../containers/Commits'
import Body from './Body'
import VizContainer from '../containers/Viz'

import Overview from './Overview'

export default class Dataset extends Base {
  constructor (props) {
    super(props);
    [
      'renderDatasetLinks'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderDatasetLinks (css, url, linkList) {
    return (
      <div className={css('links')}>
        <NavLinks url={url} linkList={linkList} sm />
      </div>
    )
  }

  template (css) {
    const {
      meta,
      structure,
      datasetRef,
      peername,
      name,
      sessionProfile,
      noBody,
      body,
      error,
      loadDatasetBody,
      url,
      profile,
      datasetLinks,
      layout,
      path,
      reload,
      dataset
    } = this.props

    return (
      <div className={css('full')} >
        <div className={css('wrap')} >
          <div className='datasetContent'>
            {this.renderDatasetLinks(css, url, datasetLinks)}
          </div>
        </div>
        <Switch>
          {/*  Route to meta */}
          <Route
            path={`${path}/meta`}
            render={props => (
              <div className='datasetContent'>
                <Meta {...props} meta={meta} />
              </div>
            )}
          />
          {/*  Route to structure */}
          <Route
            path={`${path}/structure`}
            render={props => (
              <div className='datasetContent'>
                <Structure {...props} structure={structure} />
              </div>
            )}
          />
          {/*  Default to body, note: component not wrapped in datasetcontent div */}
          <Route
            path={`${path}/body`}
            render={props => (
              <Body {...props}
                body={body}
                noBody={noBody}
                error={error}
                datasetRef={datasetRef}
                onClick={reload}
                onSetLoadingBody={loadDatasetBody}
                layout={layout}
                sessionProfile={sessionProfile} />
            )}
          />
          {/*  Route to Commit */}
          <Route
            path={`${path}/commit`}
            render={props => (
              <div className='datasetContent'>
                <CommitsContainer {...props} peername={peername} name={name} />
              </div>
            )}
          />
          {/*  Route to Viz */}
          <Route
            path={`${path}/viz`}
            render={props => (
              <div className='datasetContent'>
                <VizContainer {...props} dataset={dataset} />
              </div>
            )}
          />
          {/*  Route to Transform */}
          <Route
            path={`${path}/transform`}
            render={props => (
              <div className='datasetContent'>
                <TransformContainer {...props} dataset={dataset} />
              </div>
            )}
          />
          {/*  Route to dataset summary */}
          <Route
            path={`${path}/summary`}
            render={props => (
              <div className={`datasetContent`}>
                <Overview {...props} datasetRef={datasetRef} profile={profile} url={url} />
              </div>
            )}
          />
          {/*  Default to dataset summary */}
          <Route
            path={`${path}`}
            render={props => (
              <div className='datasetContent'>
                <Overview {...props} datasetRef={datasetRef} profile={profile} url={url} />
              </div>
            )}
          />
        </Switch>
      </div>
    )
  }

  styles () {
    return {
      switch: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      linkSm: {
        margin: '0 10px'
      },
      links: {
        margin: '30px 0'
      },
      wrap: {
        width: '70%'
      },
      full: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }
  }
}

Dataset.propTypes = {
  // the dataset model to display
  datasetRef: DatasetRefProps,

  // results (if any)
  results: PropTypes.object,
  path: PropTypes.string
  // goBack: PropTypes.func.isRequired
}

Dataset.defaultProps = {
}
