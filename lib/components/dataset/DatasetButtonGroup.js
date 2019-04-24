import React from 'react'
import PropTypes from 'prop-types'

import Button from '../chrome/Button'
export default class DatasetButtonGroup extends React.PureComponent {
  render () {
    const {
      onAdd,
      onUpdate,
      onPublish,
      published,
      onEdit,
      onExport,
      onRemove,
      onRename,
      isLocal,
      fromRegistry,
      isLatestDataset,
      isInNamespace,

      publishing,
      transfering,
      updating
    } = this.props

    var buttons = []

    if (!isLocal && onAdd) {
      buttons.push({ onClick: onAdd, text: 'Add', loading: transfering })
    }

    if (isLocal && isInNamespace) {
      buttons.push({ onClick: onUpdate, text: 'Update', loading: updating })
    }

    const publishedText = published ? 'Unpublish' : 'Publish'
    if (isLocal && isInNamespace && isLatestDataset && onPublish) {
      buttons.push({ onClick: onPublish, text: publishedText, loading: publishing })
    }

    if (isLatestDataset && !fromRegistry && onEdit) {
      buttons.push({ onClick: onEdit, text: 'Edit' })
    }
    if (isLocal && onExport) {
      buttons.push({ onClick: onExport, text: 'Export' })
    }

    return (
      <div className='dataset-button-group-wrap'>
        <div className='dataset-button-group-buttons'>
          {buttons.map((b, i) => {
            return (<div className='dataset-button-group-button' key={i}>
              <Button
                download={b.download}
                downloadName={b.downloadName}
                onClick={b.onClick}
                text={b.text}
                loading={b.loading}
              />
            </div>)
          })}
        </div>
        <div className='dataset-button-group-buttons'>
          { isLocal && isLatestDataset && onRemove &&
          <a className='errLinkMedium' onClick={onRemove} >Remove</a> }
          { isLocal && isLatestDataset && onRename &&
          <a className='linkMedium' onClick={onRename} >Rename</a> }
        </div>
      </div>
    )
  }
}

DatasetButtonGroup.propTypes = {
  onAdd: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  transfering: PropTypes.bool,
  onPublish: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  published: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  exportPath: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
}

DatasetButtonGroup.defaultProps = {
}
