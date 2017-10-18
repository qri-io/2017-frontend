import {
  CONSOLE_SET_TOP_PANEL,
  CONSOLE_SET_BOTTOM_PANEL,
  CONSOLE_SET_CHART_OPTIONS,
  CONSOLE_RESET_CHART_OPTIONS
} from '../constants/console'

export function setTopPanel (index) {
  return {
    type: CONSOLE_SET_TOP_PANEL,
    value: index
  }
}

export function setBottomPanel (index) {
  return {
    type: CONSOLE_SET_BOTTOM_PANEL,
    value: index
  }
}

export function setChartOptions (options) {
  return {
    type: CONSOLE_SET_CHART_OPTIONS,
    value: options
  }
}

export function resetChartOptions () {
  return {
    type: CONSOLE_RESET_CHART_OPTIONS,
    value: {
      type: '',
      title: 'results',
      xIndex: undefined,
      yIndex: undefined,
      path: '',
      xTitle: ''
    }
  }
}
