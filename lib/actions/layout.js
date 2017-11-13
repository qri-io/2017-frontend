import {
  LAYOUT_RESIZE,
  LAYOUT_SHOW_SIDEBAR,
  LAYOUT_HIDE_SIDEBAR,
  LAYOUT_SET
} from '../constants/layout'

export function layoutResize (width, height) {
  return {
    type: LAYOUT_RESIZE,
    stage: { width, height }
  }
}

export function showSidebar () {
  return {
    type: LAYOUT_SHOW_SIDEBAR
  }
}

export function hideSidebar () {
  return {
    type: LAYOUT_HIDE_SIDEBAR
  }
}

export function setLayout ({ navbar = false, sidebar = false, commandbar = true }) {
  return {
    type: LAYOUT_SET,
    navbar: { navbar },
    sidebar: { sidebar },
    commandbar: { commandbar }
  }
}
