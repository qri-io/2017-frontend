import {
  LAYOUT_RESIZE
} from '../constants/layout'

export function layoutResize (width, height) {
  return {
    type: LAYOUT_RESIZE,
    stage: { width, height }
  }
}
