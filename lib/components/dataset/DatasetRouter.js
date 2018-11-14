import React from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'

import Base from '../Base'
import Structure from './Structure'
import Meta from './Meta'
import TransformContainer from '../../containers/Transform'
import CommitsContainer from '../../containers/Commits'
import Body from './Body'
import Overview from './Overview'
import DatasetButtonGroup from '../dataset/DatasetButtonGroup'
import Render from './Render'

class DatasetRouter extends Base {
  constructor (props) {
    super(props);
    [
      'renderButtonGroup',
      'renderDatasetSection'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderButtonGroup (css) {
    const { datasetRef, onAdd, onTogglePublish, onEdit, exportPath, onRemove, transfering } = this.props
    return (
      <DatasetButtonGroup
        onAdd={onAdd}
        onPublish={onTogglePublish}
        published={datasetRef.published}
        onEdit={onEdit}
        exportPath={exportPath}
        onRemove={onRemove}
        transfering={transfering}
      />
    )
  }

  renderDatasetSection (css, child) {
    return (
      <div className={`border-left border-right border-bottom ${css('contents')}`}>
        <div className={`${css('info')} border-right`}>{child}</div>
        <div className={`${css('buttons')}`}>{this.renderButtonGroup(css)}</div>
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
      layout,
      path,
      reload,
      loadingBody,
      dataset
    } = this.props

    // const pathname = this.props.location.pathname

    return (
      <Switch>
        {/*  Route to meta */}
        <Route
          path={`${path}/meta`}
          render={props => this.renderDatasetSection(css, <Meta {...props} meta={meta} />)}
        />
        {/*  Route to structure */}
        <Route
          path={`${path}/structure`}
          render={props => this.renderDatasetSection(css, <Structure {...props} structure={structure} />)}
        />
        {/*  Default to body, note: component not wrapped in datasetcontent div */}
        <Route
          path={`${path}/body`}
          render={props => (
            <Body {...props}
              readOnly
              body={body}
              noBody={noBody}
              error={error}
              datasetRef={datasetRef}
              onClick={reload}
              onSetLoadingBody={loadDatasetBody}
              layout={layout}
              loading={loadingBody}
              sessionProfile={sessionProfile} />
          )}
        />
        {/*  Route to Commit */}
        <Route
          path={`${path}/history`}
          render={props => this.renderDatasetSection(css, <CommitsContainer {...props} peername={peername} name={name} />)}
        />
        {/*  Route to Viz */}
        <Route
          path={`${path}/viz`}
          render={props => (
            <div className='datasetContent'>
              <Render {...props} peername={datasetRef.peername} name={datasetRef.name} path={datasetRef.path} layout={layout} />
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
        {/*  Default to dataset summary */}
        <Route
          path={`${path}`}
          render={props => this.renderDatasetSection(css, <Overview {...props} datasetRef={datasetRef} profile={profile} url={url} />)}
        />
      </Switch>
    )
  }

  styles () {
    return {
      contents: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%'
      },
      info: {
        flex: '1 1 960px',
        maxWidth: 900
      },
      buttons: {
        flex: '1 1 300px',
        display: 'flex',
        justifyContent: 'flex-end'
      },
      spinner: {
        marginTop: 100
      }
    }
  }
}

export default withRouter(DatasetRouter)

DatasetRouter.propTypes = {
  // the dataset model to display
  datasetRef: DatasetRefProps,

  // results (if any)
  results: PropTypes.object,
  path: PropTypes.string
  // goBack: PropTypes.func.isRequired
}

DatasetRouter.defaultProps = {
}
