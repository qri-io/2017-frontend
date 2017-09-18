import { QUERY_SET, QUERY_SET_RESULTS } from '../actions/query'
import { CONSOLE_SET_TOP_PANEL, CONSOLE_SET_BOTTOM_PANEL, CONSOLE_SET_CHART_OPTIONS } from '../actions/console'

const initialState = {
  topPanelIndex: 0,
  bottomPanelIndex: 2,

  query: {
    address: '',
    statement: ''
  },

  queryResults: '',

  chartOptions: {
    type: 'line',
    title: 'results',
    xIndex: undefined,
    yIndex: undefined
  }
}

export default function consoleReducer (state = initialState, action) {
  switch (action.type) {
    case QUERY_SET:
      return Object.assign({}, state, { query: action.value })
    case QUERY_SET_RESULTS:
      return Object.assign({}, state, { queryResults: action.value })
    case CONSOLE_SET_TOP_PANEL:
      return Object.assign({}, state, { topPanelIndex: action.value })
    case CONSOLE_SET_BOTTOM_PANEL:
      return Object.assign({}, state, { bottomPanelIndex: action.value })
    case CONSOLE_SET_CHART_OPTIONS:
      return Object.assign({}, state, { chartOptions: action.value })
  }

  return state
}
