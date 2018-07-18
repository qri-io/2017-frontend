/* globals describe, it, expect */
import { Reducer } from 'redux-testkit'
import LayoutReducer from '../layout'

import { LAYOUT_RESIZE } from '../../constants/layout'

describe('Layout Reducer', () => {
  const initialState = {
    size: 'xs',
    stage: { width: 100, height: 100 },
    topbar: { width: 100, height: 46, left: 0, top: 0 },
    main: { width: 100, height: 100, left: 0, top: 0 },
    sidebar: { width: 0, height: 100, left: 0, top: 0 },
    session: true
  }

  it('should have an initialState (@@INIT)', () => {
    expect(LayoutReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should return initialState if trying to give negative size on an initialState', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: -100,
        height: -100
      }
    }
    Reducer(LayoutReducer).expect(action).toReturnState(initialState)
  })

  it('should return state if trying to give a negative size on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: -100,
        height: -100
      }
    }
    const state = {
      size: 'xs',
      stage: {
        width: 78,
        height: 38
      },
      main: {
        width: -2,
        height: 38,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 38,
        width: 80,
        left: 0,
        top: 0
      },
      topbar: {
        width: 78,
        height: 0,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(state)
  })

  it('should return initialState if trying to give a size of zero on an initial state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 0,
        height: 0
      }
    }
    Reducer(LayoutReducer).expect(action).toReturnState(initialState)
  })

  it('should return state if trying to give a size of zero on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 0,
        height: 0
      }
    }
    const state = {
      size: 'xs',
      stage: {
        width: 78,
        height: 38
      },
      main: {
        width: -2,
        height: 38,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 38,
        width: 80,
        left: 0,
        top: 0
      },
      topbar: {
        width: 78,
        height: 0,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(state)
  })

  it('should handle a xs sizeClass on an initial state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 200,
        height: 200
      }
    }
    const result = {
      size: 'xs',
      stage: {
        width: 200,
        height: 200
      },
      main: {
        width: 200,
        height: 154,
        top: 46,
        left: 0
      },
      sidebar: {
        height: 154,
        width: 0,
        left: 0,
        top: 46
      },
      topbar: {
        height: 46,
        left: 0,
        top: 0,
        width: 200
      },
      session: true
    }
    Reducer(LayoutReducer).expect(action).toReturnState(result)
  })

  it('should handle a sm sizeClass on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 200,
        height: 200
      }
    }
    const state = {
      size: 'md',
      stage: {
        width: 850,
        height: 500
      },
      main: {
        width: 770,
        height: 50,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 500,
        width: 0,
        left: 0,
        top: 0
      },
      topbar: {
        width: 850,
        height: 46,
        top: 0,
        left: 0
      },
      session: true
    }
    const result = {
      size: 'xs',
      stage: {
        width: 200,
        height: 200
      },
      main: {
        width: 200,
        height: 154,
        top: 46,
        left: 0
      },
      sidebar: {
        height: 154,
        width: 0,
        left: 0,
        top: 46
      },
      topbar: {
        width: 200,
        height: 46,
        top: 0,
        left: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle a sm sizeClass on an initial state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 580,
        height: 425
      }
    }
    const result = {
      size: 'sm',
      stage: {
        width: 580,
        height: 425
      },
      main: {
        width: 580,
        height: 379,
        top: 46,
        left: 0
      },
      sidebar: {
        height: 379,
        width: 0,
        left: 0,
        top: 46
      },
      topbar: {
        width: 580,
        height: 46,
        top: 0,
        left: 0
      },
      session: true
    }
    Reducer(LayoutReducer).expect(action).toReturnState(result)
  })

  it('should handle a sm sizeClass on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 580,
        height: 425
      }
    }
    const state = {
      size: 'md',
      stage: {
        width: 850,
        height: 500
      },
      main: {
        width: 770,
        height: 50,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 500,
        width: 80,
        left: 0,
        top: 0
      },
      topbar: {
        height: 46,
        width: 850,
        left: 0,
        top: 0
      },
      session: true
    }
    const result = {
      size: 'sm',
      stage: {
        width: 580,
        height: 425
      },
      main: {
        width: 500,
        height: 379,
        top: 46,
        left: 80
      },
      sidebar: {
        height: 379,
        width: 80,
        left: 0,
        top: 46
      },
      topbar: {
        width: 580,
        height: 46,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle a md sizeClass on an initial state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 850,
        height: 500
      }
    }
    const result = {
      size: 'md',
      stage: {
        width: 850,
        height: 500
      },
      main: {
        width: 850,
        height: 454,
        top: 46,
        left: 0
      },
      sidebar: {
        height: 454,
        width: 0,
        left: 0,
        top: 46
      },
      topbar: {
        width: 850,
        height: 46,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).expect(action).toReturnState(result)
  })

  it('should handle a md sizeClass on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 850,
        height: 500
      }
    }
    const state = {
      size: 'sm',
      stage: {
        width: 580,
        height: 425
      },
      main: {
        width: 500,
        height: 425,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 425,
        width: 80,
        left: 0,
        top: 0
      },
      topbar: {
        width: 580,
        height: 46,
        top: 0,
        left: 0
      },
      session: true
    }
    const result = {
      size: 'md',
      stage: {
        width: 850,
        height: 500
      },
      main: {
        width: 770,
        height: 454,
        top: 46,
        left: 80
      },
      sidebar: {
        height: 454,
        width: 80,
        left: 0,
        top: 46
      },
      topbar: {
        width: 850,
        height: 46,
        top: 0,
        left: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle a lg sizeClass on an initial state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 1130,
        height: 700
      }
    }
    const result = {
      size: 'lg',
      stage: {
        width: 1130,
        height: 700
      },
      main: {
        width: 1130,
        height: 654,
        top: 46,
        left: 0
      },
      sidebar: {
        height: 654,
        width: 0,
        left: 0,
        top: 46
      },
      topbar: {
        width: 1130,
        height: 46,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).expect(action).toReturnState(result)
  })

  it('should handle a lg sizeClass on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 1130,
        height: 700
      }
    }
    const state = {
      size: 'sm',
      stage: {
        width: 580,
        height: 425
      },
      main: {
        width: 500,
        height: 425,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 425,
        width: 80,
        left: 0,
        top: 0
      },
      topbar: {
        width: 500,
        height: 46,
        left: 0,
        top: 0
      },
      session: true
    }
    const result = {
      size: 'lg',
      stage: {
        width: 1130,
        height: 700
      },
      main: {
        width: 1050,
        height: 654,
        top: 46,
        left: 80
      },
      sidebar: {
        height: 654,
        width: 80,
        left: 0,
        top: 46
      },
      topbar: {
        height: 46,
        width: 1130,
        top: 0,
        left: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(result)
  })
})
