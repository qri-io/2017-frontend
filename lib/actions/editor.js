import {
  EDITOR_INIT_DATASET,
  EDITOR_SET_NAME,
  EDITOR_SET_COMMIT,
  EDITOR_SET_META,
  EDITOR_SET_STRUCTURE,
  EDITOR_SET_VIZ,
  EDITOR_SET_TRANSFORM,
  EDITOR_SET_BODY,
  EDITOR_UPDATE_BODY,
  EDITOR_SET_VIZ_SCRIPT,
  EDITOR_SET_TRANSFORM_SCRIPT,
  EDITOR_REMOVE_SECTION,
  EDITOR_SET_SCHEMA,
  EDITOR_SET_BODY_VIEW,
  EDITOR_SET_COL_ORDER,
  EDITOR_SET_ROW_ORDER,
  EDITOR_SET_BODY_ERROR
} from '../constants/editor'

import {
  CAFS_TRANSFORM_SUCCESS,
  CAFS_VIZ_SUCCESS
} from '../constants/cafs'

import { selectDatasetByPath } from '../selectors/dataset'
import { selectCAFSString } from '../selectors/cafs'
import { loadViz, loadTransform } from './dataset'
import { loadBody } from './body'

const blankDataset = {}

// initDataset resets the editor to a blank dataset
// TODO - consider renaming this to like "initEditor" or something to avoid confusion with "newDataset", "saveDataset" actions
export function initDataset (name = '', dataset = blankDataset, transformScript = '', vizScript = '', body = undefined) {
  return {
    type: EDITOR_INIT_DATASET,
    name,
    dataset,
    transformScript,
    vizScript,
    body
  }
}

export function editDataset (path) {
  return (dispatch, getState) => {
    const datasetRef = selectDatasetByPath(getState(), path)
    const ds = datasetRef.dataset

    const newEditorState = {
      name: datasetRef.name,
      dataset: ds
    }

    // load all associated files of a dataset that are defined then dispatch
    // newDataset with the loaded details
    // TODO - should probably reject body files that are too large for the editor
    return new Promise(function (resolve, reject) {
      if (!ds.viz || !ds.viz.scriptPath) {
        resolve(newEditorState)
        return
      }

      dispatch(loadViz(ds.viz.scriptPath)).then((action) => {
        if (action.type !== CAFS_VIZ_SUCCESS) {
          reject(new Error('failed to load viz script'))
          return
        }
        newEditorState.vizScript = selectCAFSString(getState(), ds.viz.scriptPath)
        resolve(newEditorState)
      })
    }).then(function (nes) {
      return new Promise(function (resolve, reject) {
        if (!nes.dataset.transform || !nes.dataset.transform.scriptPath) {
          resolve(nes)
          return
        }

        dispatch(loadTransform(nes.dataset.transform.scriptPath)).then((action) => {
          if (action.type !== CAFS_TRANSFORM_SUCCESS) {
            reject(new Error('transform script failed to load'))
            return
          }
          nes.transformScript = selectCAFSString(getState(), nes.dataset.transform.scriptPath)
          resolve(nes)
        })
      })
    }).then(function (nes) {
      return new Promise(function (resolve, reject) {
        if (!nes.dataset.bodyPath) {
          resolve(nes)
          return
        }
        dispatch(loadBody('me', nes.name, nes.dataset.path, nes.dataset.bodyPath, 0, -1)).then((action) => {
          nes.body = action.data
          resolve(nes)
        })
      })
    })
      .then((nes) => dispatch(initDataset(nes.name, nes.dataset, nes.transformScript, nes.vizScript, nes.body)))
  }
}

// setName sets the dataset name within the editor
export function setName (name = '') {
  return {
    type: EDITOR_SET_NAME,
    name
  }
}

// setCommit replaces/updates editor commit object
export function setCommit (commit = {}) {
  return {
    type: EDITOR_SET_COMMIT,
    commit
  }
}

// setMeta replaces/updates the editor meta structure object
export function setMeta (meta = {}) {
  return {
    type: EDITOR_SET_META,
    meta
  }
}

// setStructure replaces/updates the editor structure object
export function setStructure (structure = {}) {
  return {
    type: EDITOR_SET_STRUCTURE,
    structure
  }
}

// setSchema updates/replaces the schema in
// the dataset.structure section
// as well as the the schema string section
export function setSchema (schema = '') {
  return {
    type: EDITOR_SET_SCHEMA,
    schema
  }
}

// setViz replaces/updates the editor viz object
export function setViz (viz = {}) {
  return {
    type: EDITOR_SET_VIZ,
    viz
  }
}

// setTransform replaces/updates the transform transform object
export function setTransform (transform = {}) {
  return {
    type: EDITOR_SET_TRANSFORM,
    transform
  }
}

// setVizScript replaces binary script data for vizualization
// represented as a string
export function setVizScript (vizScript = '') {
  return {
    type: EDITOR_SET_VIZ_SCRIPT,
    vizScript
  }
}

// setVizScript replaces binary script data for vizualization
// represented as a string
export function setTransformScript (transformScript = '') {
  return {
    type: EDITOR_SET_TRANSFORM_SCRIPT,
    transformScript
  }
}

// setVizScript replaces binary script data for vizualization
// represented as a string
export function setBody (body = '') {
  return {
    type: EDITOR_SET_BODY,
    body
  }
}

export function updateBody (changes = []) {
  return {
    type: EDITOR_UPDATE_BODY,
    changes
  }
}

export function removeSection (section = '') {
  return {
    type: EDITOR_REMOVE_SECTION,
    section
  }
}

export function setBodyView (view = '') {
  return {
    type: EDITOR_SET_BODY_VIEW,
    view
  }
}

export function setColOrder (order) {
  return {
    type: EDITOR_SET_COL_ORDER,
    order
  }
}

export function setRowOrder (order) {
  return {
    type: EDITOR_SET_ROW_ORDER,
    order
  }
}

export function setBodyError (error) {
  return {
    type: EDITOR_SET_BODY_ERROR,
    error
  }
}
