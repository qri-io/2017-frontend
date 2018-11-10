/* globals __BUILD__ */
import { LAYOUT_RESIZE } from '../constants/layout'
import { SESSION_PROFILE_SUCCESS, SESSION_PROFILE_FAILURE } from '../constants/session'

let topbarHeight = 55
if (__BUILD__.ELECTRON) {
  topbarHeight = 75
}

const initialState = {
  size: 'xs',
  stage: { width: 100, height: 100 },
  topbar: { width: 100, height: topbarHeight, left: 0, top: 0 },
  main: { width: 100, height: 100, left: 0, top: 0 },
  sidebar: { width: 0, height: 100, left: 0, top: 0 },
  session: true
}

export default function layoutReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_PROFILE_SUCCESS:
      return layout(Object.assign({}, state, { session: true }))
    case SESSION_PROFILE_FAILURE:
      return layout(Object.assign({}, state, { session: false }))
    case LAYOUT_RESIZE:
      if (action && action.stage && !(action.stage.width < 200) && !(action.stage.height < 200)) {
        return layout(Object.assign({}, state, action))
      }
  }

  return state
}

function layout (state) {
  const { stage, sidebar, session, topbar } = state
  return {
    size: sizeClass(state.stage.width),
    stage,
    topbar: {
      width: stage.width,
      height: topbar.height,
      top: 0,
      left: 0
    },
    main: {
      width: session ? stage.width - sidebar.width : stage.width,
      height: stage.height - topbar.height,
      top: topbar.height,
      left: session ? sidebar.width : 0
    },
    sidebar: {
      height: stage.height - topbar.height,
      width: sidebar.width,
      left: 0,
      top: topbar.height
    },
    session
  }
}

// @return {string} string representation of windowidth size class
function sizeClass (width) {
  if (width >= 1200) {
    return 'xl'
  } else if (width >= 992) {
    return 'lg'
  } else if (width >= 768) {
    return 'md'
  } else if (width >= 544) {
    return 'sm'
  } else {
    return 'xs'
  }
}
