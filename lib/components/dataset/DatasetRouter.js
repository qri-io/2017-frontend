import React from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'
import Structure from './Structure'
import Meta from './Meta'
import TransformContainer from '../../containers/Transform'
import CommitsContainer from '../../containers/Commits'
import Body from './Body'
import Overview from './Overview'
import DatasetButtonGroup from '../dataset/DatasetButtonGroup'
import Render from './Render'

class DatasetRouter extends React.PureComponent {
  constructor (props) {
    super(props);
    [
      'renderButtonGroup',
      'renderDatasetSection'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderButtonGroup () {
    const {
      datasetRef,
      onAdd,
      onTogglePublish,
      publishing,
      onEdit,
      onExport,
      onRemove,
      onRename,
      transfering,
      onUpdate,
      updating,

      isLocal,
      fromRegistry,
      isLatestDataset,
      isInNamespace,
      sessionProfile } = this.props

    return (
      sessionProfile &&
      <DatasetButtonGroup
        onAdd={onAdd}
        onPublish={onTogglePublish}
        published={datasetRef.published}
        publishing={publishing}
        onEdit={onEdit}
        onExport={onExport}
        onRemove={onRemove}
        transfering={transfering}
        onRename={onRename}
        onUpdate={onUpdate}
        updating={updating}

        isLocal={isLocal}
        fromRegistry={fromRegistry}
        isLatestDataset={isLatestDataset}
        isInNamespace={isInNamespace}
      />
    )
  }

  renderDatasetSection (child) {
    return (
      <div className='border-left border-right border-bottom dataset-router-contents'>
        <div className='dataset-border-info border-right'>{child}</div>
        <div className='dataset-router-buttons'>{this.renderButtonGroup()}</div>
      </div>
    )
  }

  render () {
    const {
      meta,
      structure,
      datasetRef,
      peername,
      name,
      sessionProfile,
      url,
      profile,
      layout,
      path,
      reload,
      dataset,
      fromRegistry,
      registryVersion,

      body,
      noBody,
      bodypath,
      bodyError,
      bodyLength,
      bodyLoading,
      bodyFetchedAll,
      loadBody
    } = this.props

    // const pathname = this.props.location.pathname
    return (
      <Switch>
        {/*  Route to meta */}
        <Route
          path={`${path}/meta`}
          render={props => this.renderDatasetSection(<Meta {...props} meta={meta} />)}
        />
        {/*  Route to structure */}
        <Route
          path={`${path}/structure`}
          render={props => this.renderDatasetSection(<Structure {...props} structure={structure} />)}
        />
        {/*  Default to body, note: component not wrapped in datasetcontent div */}
        <Route
          path={`${path}/body`}
          render={props => (
            <Body {...props}
              onClick={reload}
              onLoadMore={loadBody}

              sessionProfile={sessionProfile}
              readOnly
              datasetRef={datasetRef}
              layout={layout}

              body={body}
              path={path}
              bodypath={bodypath}
              noBody={noBody}
              error={bodyError}
              fetchedAll={bodyFetchedAll}
              loading={bodyLoading}
              offset={bodyLength} />
          )}
        />
        {/*  Route to Commit */}
        <Route
          path={`${path}/history`}
          render={props => this.renderDatasetSection(<CommitsContainer {...props} peername={peername} name={name} datasetRef={datasetRef} registryVersion={registryVersion} fromRegistry={fromRegistry} />)}
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
          render={props => this.renderDatasetSection(<Overview {...props} datasetRef={datasetRef} profile={profile} url={url} registryVersion={registryVersion} sessionProfile={sessionProfile} layout={layout} />)}
        />
      </Switch>
    )
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
