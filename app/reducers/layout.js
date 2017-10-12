import { LAYOUT_RESIZE, LAYOUT_SHOW_SIDEBAR, LAYOUT_HIDE_SIDEBAR } from '../constants/layout'
import { defaultPalette } from '../propTypes/palette'

const COLLAPSED_WIDTH = 0

const initialState = {
  size: 'xs',
  stage: { width: 100, height: 100 },
  navbar: { width: 100, height: 40, left: 0, bottom: 0, collapsed: false },
  main: { width: 100, height: 100, left: 0, top: 0 },
  sidebar: { width: 80, height: 100, left: 0, top: 0, collapsed: false },
  theme: defaultPalette
}

export default function layoutReducer (state = initialState, action) {
  switch (action.type) {
    case LAYOUT_RESIZE:
      return layout(Object.assign({}, state, action))
    case LAYOUT_SHOW_SIDEBAR:
      return layout(Object.assign({}, state, { sidebar: Object.assign({}, state.sidebar, { collapsed: false }) }))
    case LAYOUT_HIDE_SIDEBAR:
      return layout(Object.assign({}, state, { sidebar: Object.assign({}, state.sidebar, { collapsed: true }) }))
  }

  return state
}

function layout (state) {
  const { stage, navbar, sidebar } = state

  return {
    size: sizeClass(state.stage.width),
    stage,
    navbar: {
      width: stage.width,
      height: navbar.height,
      left: 0,
      top: 0,
      collapsed: navbar.collapsed
    },
    main: {
      width: sidebar.collapsed ? stage.width - COLLAPSED_WIDTH : stage.width - sidebar.width,
      height: stage.height - navbar.height,
      top: navbar.height,
      left: sidebar.collapsed ? stage.width - COLLAPSED_WIDTH : sidebar.width
    },
    sidebar: {
      width: sidebar.collapsed ? COLLAPSED_WIDTH : stage.width * sidebar.pct_width,
      height: stage.height,
      width: sidebar.width,
      left: 0,
      top: 0,
      collapsed: sidebar.collapsed
      // pct_width: sidebar.pct_width
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
