/* globals File */
import React from 'react'
import { Route, Switch } from 'react-router'

import EditHeader from './EditHeader'
import Results from './Results'

import EditMeta from './EditMeta'
import EditTransform from './EditTransform'
import EditViz from './EditViz'

import Base from '../Base'

export default class Editor extends Base {
  constructor (props) {
    super(props);

    [
      'onRun'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onRun () {
    const starter = [
      '',
      'def transform(ds):',
      '  print("hello Qri!\\n")',
      '  ds.set_body(["this","is","dataset","data"])',
      '  return ds'
    ].join('\n')
    const tfFile = new File([starter], 'transform', {
      type: 'text/plain'
    })
    // name, file, body, transform, url
    this.props.initDataset('test', undefined, undefined, tfFile, undefined).then((res) => {
      console.log(res)
    })
  }

  template (css) {
    const { match } = this.props

    return (
      <div className={css('wrap')}>
        <div className={css('header')}>
          <EditHeader url={match.path} onRun={this.onRun} />
        </div>
        <div className={css('contents')}>
          <div className={css('switch')} >
            <Switch>
              <Route
                path={`${match.path}/meta`}
                render={props => (
                  <EditMeta {...props} />
                )}
              />
              <Route
                path={`${match.path}/transform`}
                render={props => (
                  <EditTransform {...props} />
                )}
              />
              <Route
                path={`${match.path}/viz`}
                render={props => (
                  <EditViz {...props} />
                )}
              />
              <Route
                path={`${match.path}`}
                render={props => (
                  <div>
                    <h2>Hallo</h2>
                  </div>
                )}
              />
            </Switch>
          </div>
          <div className={css('results')}>
            <Results />
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
      contents: {
        flex: '2 2 80%',
        display: 'flex',
        flexDirection: 'row'
      },
      switch: {
        overflow: 'hidden',
        flex: '2 1 60%'
      },
      results: {
        flex: '1 2 40%'
      }
    }
  }
}

Editor.propTypes = {

}

Editor.defaultProps = {

}
