import { LAYOUT_RESIZE, LAYOUT_SHOW_SIDEBAR, LAYOUT_HIDE_SIDEBAR } from '../actions/layout'

const COLLAPSED_WIDTH = 0

const initialState = {
  size: 'xs',
  stage: { width: 100, height: 100 },
  navbar: { width: 100, height: 50, left: 0, bottom: 0, collapsed: false },
  commandbar: { width: 100, height: 0, left: 0, bottom: 0, collapsed: false },
  main: { width: 100, height: 100, left: 0, top: 0 },
  sidebar: { width: COLLAPSED_WIDTH, height: 100, left: 0, top: 0, collapsed: true, pct_width: 0.35 }
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
  const { stage, navbar, sidebar, commandbar } = state

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
    commandbar: {
      width: stage.width,
      height: commandbar.height,
      left: 0,
      bottom: 0,
      collapsed: commandbar.collapsed
    },
    main: {
      width: sidebar.collapsed ? stage.width - COLLAPSED_WIDTH : stage.width * (1 - sidebar.pct_width),
      height: stage.height - navbar.height - commandbar.height,
      top: navbar.height,
      left: 0
    },
    sidebar: {
      width: sidebar.collapsed ? COLLAPSED_WIDTH : stage.width * sidebar.pct_width,
      height: stage.height - navbar.height,
      left: sidebar.collapsed ? stage.width - COLLAPSED_WIDTH : stage.width * (1 - sidebar.pct_width),
      top: 0,
      collapsed: sidebar.collapsed,
      pct_width: sidebar.pct_width
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
