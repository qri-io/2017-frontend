import { LAYOUT_RESIZE } from '../constants/layout'
import { SESSION_PEER_SUCCESS, SESSION_PEER_FAILURE } from '../constants/session'
import { defaultPalette } from '../propTypes/palette'

const initialState = {
  size: 'xs',
  stage: { width: 100, height: 100 },
  main: { width: 100, height: 100, left: 0, top: 0 },
  sidebar: { width: 80, height: 100, left: 0, top: 0 },
  theme: defaultPalette,
  session: true
}

export default function layoutReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_PEER_SUCCESS:
      return layout(Object.assign({}, state, {session: true}))
    case SESSION_PEER_FAILURE:
      return layout(Object.assign({}, state, {session: false}))
    case LAYOUT_RESIZE:
      if (action && action.stage && !(action.stage.width < 78) && !(action.stage.height < 38)) {
        return layout(Object.assign({}, state, action))
      }
  }

  return state
}

function layout (state) {
  const { stage, sidebar, session } = state
  return {
    size: sizeClass(state.stage.width),
    stage,
    main: {
      width: session ? stage.width - sidebar.width : stage.width,
      height: stage.height,
      top: 0,
      left: session ? sidebar.width : 0
    },
    sidebar: {
      height: stage.height,
      width: sidebar.width,
      left: 0,
      top: 0
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
