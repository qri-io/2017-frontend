/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import LayoutReducer from '../layout'

import { LAYOUT_RESIZE } from '../../constants/layout'
import { defaultPalette } from '../../propTypes/palette'

describe('Layout Reducer', () => {
  const initialState = {
    size: 'xs',
    stage: { width: 100, height: 100 },
    main: { width: 100, height: 100, left: 0, top: 0 },
    sidebar: { width: 80, height: 100, left: 0, top: 0 },
    theme: defaultPalette,
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
        width: 120,
        height: 200,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 200,
        width: 80,
        left: 0,
        top: 0
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
        width: 80,
        left: 0,
        top: 0
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
        width: 120,
        height: 200,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 200,
        width: 80,
        left: 0,
        top: 0
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
        width: 770,
        height: 500,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 500,
        width: 80,
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
        height: 500,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 500,
        width: 80,
        left: 0,
        top: 0
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
        width: 1050,
        height: 700,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 700,
        width: 80,
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
        height: 700,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 700,
        width: 80,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle a xl sizeClass on an initial state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 1400,
        height: 810
      }
    }
    const result = {
      size: 'xl',
      stage: {
        width: 1400,
        height: 810
      },
      main: {
        width: 1320,
        height: 810,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 810,
        width: 80,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).expect(action).toReturnState(result)
  })

  it('should handle a xl sizeClass on an existing state', () => {
    const action = {
      type: LAYOUT_RESIZE,
      stage: {
        width: 1400,
        height: 810
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
      session: true
    }
    const result = {
      size: 'xl',
      stage: {
        width: 1400,
        height: 810
      },
      main: {
        width: 1320,
        height: 810,
        top: 0,
        left: 80
      },
      sidebar: {
        height: 810,
        width: 80,
        left: 0,
        top: 0
      },
      session: true
    }
    Reducer(LayoutReducer).withState(state).expect(action).toReturnState(result)
  })
})
