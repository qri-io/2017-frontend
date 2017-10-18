import { QUERY_SET, QUERY_SET_RESULTS } from '../constants/query'
import { CONSOLE_SET_TOP_PANEL, CONSOLE_SET_BOTTOM_PANEL, CONSOLE_SET_CHART_OPTIONS, CONSOLE_RESET_CHART_OPTIONS, CONSOLE_SET_DATA_LOADING } from '../constants/console'

const initialState = {
  topPanelIndex: 0,
  bottomPanelIndex: 2,
  loadingData: false,

  query: {
    address: '',
    statement: ''
  },

  queryResults: '',

  chartOptions: {
    type: '',
    title: 'results',
    xTitle: '',
    xIndex: undefined,
    yIndex: undefined,
    path: ''
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
    case CONSOLE_RESET_CHART_OPTIONS:
      return Object.assign({}, state, { chartOptions: action.value })
    case CONSOLE_SET_DATA_LOADING:
      return Object.assign({}, state, { loadingData: action.value }
      )
  }

  return state
}
