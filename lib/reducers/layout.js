import { LAYOUT_RESIZE } from '../constants/layout'
import { defaultPalette } from '../propTypes/palette'

const initialState = {
  size: 'xs',
  stage: { width: 100, height: 100 },
  main: { width: 100, height: 100, left: 0, top: 0 },
  sidebar: { width: 80, height: 100, left: 0, top: 0 },
  theme: defaultPalette
}

export default function layoutReducer (state = initialState, action) {
  switch (action.type) {
    case LAYOUT_RESIZE:
      return layout(Object.assign({}, state, action))
  }

  return state
}

function layout (state) {
  const { stage, sidebar } = state

  return {
    size: sizeClass(state.stage.width),
    stage,
    main: {
      width: stage.width - sidebar.width,
      height: stage.height,
      top: 0,
      left: sidebar.width
    },
    sidebar: {
      height: stage.height,
      width: sidebar.width,
      left: 0,
      top: 0
    }
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
