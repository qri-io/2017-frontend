/* global describe, it, expect */
import * as layout from '../layout'
import { defaultPalette } from '../../propTypes/palette'

const initialState = {
  size: 'xs',
  stage: { width: 100, height: 100 },
  main: { width: 100, height: 100, left: 0, top: 0 },
  sidebar: { width: 80, height: 100, left: 0, top: 0 },
  theme: defaultPalette,
  session: true
}

const main = {
  width: 100,
  height: 100,
  left: 0,
  top: 0
}

describe('Layout Main Selector: ', () => {
  it('should return the main section of layout', () => {
    const m = layout.selectLayoutMain(initialState)
    expect(m).toEqual(main)
  })
})
