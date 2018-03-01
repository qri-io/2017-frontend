import {
  CONSOLE_SET_CHART_OPTIONS,
  CONSOLE_RESET_CHART_OPTIONS,
  CONSOLE_SET_DATA_LOADING
} from '../constants/console'

export function setChartOptions (options) {
  return {
    type: CONSOLE_SET_CHART_OPTIONS,
    value: options
  }
}

export function resetChartOptions () {
  return {
    type: CONSOLE_RESET_CHART_OPTIONS
  }
}

export function setLoadingData (loading) {
  return {
    type: CONSOLE_SET_DATA_LOADING,
    value: loading
  }
}
