import {
  EDITOR_INIT_DATASET,
  EDITOR_SET_NAME,
  EDITOR_SET_COMMIT,
  EDITOR_SET_META,
  EDITOR_SET_STRUCTURE,
  EDITOR_SET_BODY,
  EDITOR_SET_VIZ,
  EDITOR_SET_VIZ_SCRIPT,
  EDITOR_SET_TRANSFORM,
  EDITOR_SET_TRANSFORM_SCRIPT
} from '../constants/editor'

const initialState = {
  dirty: false,
  name: '',
  dataset: {
    structure: {
      format: 'json',
      schema: { type: 'array' }
    }
  },
  vizScript: undefined,
  transformScript: undefined,
  body: undefined
}

// TODO - TESTS!
export default function editorReducer (state = initialState, action) {
  switch (action.type) {
    case EDITOR_INIT_DATASET:
      return {
        dirty: false,
        name: action.name || '',
        dataset: action.dataset || {},
        vizScript: action.vizScript,
        transformScript: action.transformScript,
        body: action.body
      }

    case EDITOR_SET_NAME:
      return Object.assign({}, state, { dirty: true, name: action.name })
    case EDITOR_SET_COMMIT:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { commit: action.commit })
      })
    case EDITOR_SET_META:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { meta: action.meta })
      })
    case EDITOR_SET_STRUCTURE:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { structure: action.structure })
      })
    case EDITOR_SET_TRANSFORM:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { transform: action.transform })
      })
    case EDITOR_SET_VIZ:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { viz: action.viz })
      })

    case EDITOR_SET_BODY:
      return Object.assign({}, state, { dirty: true, body: action.body })
    case EDITOR_SET_VIZ_SCRIPT:
      return Object.assign({}, state, { dirty: true, vizScript: action.vizScript })
    case EDITOR_SET_TRANSFORM_SCRIPT:
      return Object.assign({}, state, { dirty: true, transformScript: action.transformScript })

    default:
      return state
  }
}
