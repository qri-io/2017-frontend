/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import ConsoleReducer from '../console'

import { QUERY_SET, QUERY_SET_RESULTS, QUERY_RESET_RESULTS } from '../../constants/query'
import { CONSOLE_SET_TOP_PANEL, CONSOLE_SET_BOTTOM_PANEL, CONSOLE_SET_CHART_OPTIONS, CONSOLE_RESET_CHART_OPTIONS, CONSOLE_SET_DATA_LOADING, CONSOLE_SET_LOADING_ERROR, CONSOLE_SET_DATASETS_MESSAGE } from '../../constants/console'

describe('Console Reducer', () => {
  const initialState = {
    topPanelIndex: 0,
    bottomPanelIndex: 2,
    loadingData: false,
    loadingError: '',
    runButton: true,
    datasetsMessage: 'No Datasets',

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

  it('should have an initalState (@@INIT)', () => {
    expect(ConsoleReducer(undefined, {type: '@@INIT'})).toEqual(initialState)
  })

  it('should handle setting a query (QUERY_SET) on an initial state', () => {
    const action = {
      type: QUERY_SET,
      value: {
        address: '',
        statement: 'select * from us_cen_fam limit 10'
      }
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({query: action.value})
  })

  it('should handle setting a query (QUERY_SET) on an existing state', () => {
    const action = {
      type: QUERY_SET,
      value: {
        address: '',
        statement: 'select * from us_cen_fam limit 10'
      }
    }
    const state = {
      topPanelIndex: 0,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
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
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({query: action.value})
  })

  it('should handle setting queryResults (QUERY_SET_RESULTS) on an initial state', () => {
    const action = {
      type: QUERY_SET_RESULTS,
      value: '/ipfs/QmV2jDfynkmBivwFHHDTUEAkffncWiq6wC6WmCiTv96uJU/dataset.json'
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({queryResults: action.value})
  })

  it('should handle setting queryResults (QUERY_SET_RESULTS) on an existing state', () => {
    const action = {
      type: QUERY_SET_RESULTS,
      value: '/ipfs/QmV2jDfynkmBivwFHHDTUEAkffncWiq6wC6WmCiTv96uJU/dataset.json'
    }
    const state = {
      topPanelIndex: 0,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({queryResults: action.value})
  })

  it('should handle resetting queryResults (QUERY_RESET_RESULTS) on an initial state', () => {
    const action = {
      type: QUERY_RESET_RESULTS
    }
    Reducer(ConsoleReducer).expect(action).toReturnState(initialState)
  })

  it('should handle resetting queryResults (QUERY_RESET_RESULTS) on an existing state', () => {
    const action = {
      type: QUERY_RESET_RESULTS
    }
    const state = {
      topPanelIndex: 0,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({queryResults: ''})
  })

  it('should handle setting topPanelIndex (CONSOLE_SET_TOP_PANEL) on an initial state', () => {
    const action = {
      type: CONSOLE_SET_TOP_PANEL,
      value: 3
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({topPanelIndex: 3})
  })

  it('should handle setting topPanelIndex (CONSOLE_SET_TOP_PANEL) on an existing state', () => {
    const action = {
      type: CONSOLE_SET_TOP_PANEL,
      value: 3
    }
    const state = {
      topPanelIndex: 4,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({topPanelIndex: 3})
  })

  it('should handle setting bottomPanelIndex (CONSOLE_SET_BOTTOM_PANEL) on an initial state', () => {
    const action = {
      type: CONSOLE_SET_BOTTOM_PANEL,
      value: 3
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({bottomPanelIndex: 3})
  })

  it('should handle setting bottomPanelIndex (CONSOLE_SET_BOTTOM_PANEL) on an an existing state', () => {
    const action = {
      type: CONSOLE_SET_BOTTOM_PANEL,
      value: 3
    }
    const state = {
      topPanelIndex: 4,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({bottomPanelIndex: 3})
  })

  it('should handle setting chartOptions (CONSOLE_SET_CHART_OPTIONS) on an initial state', () => {
    const action = {
      type: CONSOLE_SET_CHART_OPTIONS,
      value: {
        type: 'bar',
        title: 'count_fam_all',
        xIndex: 4,
        yIndex: 1,
        xTitle: 'med_income_fam_married',
        path: ''
      }
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({ chartOptions: action.value })
  })

  it('should handle setting chartOptions (CONSOLE_SET_CHART_OPTIONS) on an existing state', () => {
    const action = {
      type: CONSOLE_SET_CHART_OPTIONS,
      value: {
        type: 'bar',
        title: 'count_fam_all',
        xIndex: 4,
        yIndex: 1,
        xTitle: 'med_income_fam_married',
        path: ''
      }
    }
    const state = {
      topPanelIndex: 4,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: 'line',
        title: 'med_income_fam_all',
        xTitle: 'geo',
        xIndex: 0,
        yIndex: 2,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({chartOptions: {
      type: 'bar',
      title: 'count_fam_all',
      xIndex: 4,
      yIndex: 1,
      xTitle: 'med_income_fam_married'
    }
    })
  })

  it('should handle resetting chartOptions (CONSOLE_RESET_CHART_OPTIONS) on an initial state', () => {
    const action = {
      type: CONSOLE_RESET_CHART_OPTIONS
    }
    Reducer(ConsoleReducer).expect(action).toReturnState(initialState)
  })

  it('should handle resetting chartOptions (CONSOLE_RESET_CHART_OPTIONS) on an existing state', () => {
    const action = {
      type: CONSOLE_RESET_CHART_OPTIONS
    }
    const state = {
      topPanelIndex: 4,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: 'line',
        title: 'med_income_fam_all',
        xTitle: 'geo',
        xIndex: 0,
        yIndex: 2,
        path: ''
      }
    }
    const result = {
      topPanelIndex: 4,
      bottomPanelIndex: 2,
      loadingData: false,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }

    Reducer(ConsoleReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle setting loadingData (CONSOLE_SET_DATA_LOADING) on an initial state', () => {
    const action = {
      type: CONSOLE_SET_DATA_LOADING,
      value: true
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({loadingData: true})
  })

  it('should handle setting loadingData (CONSOLE_SET_DATA_LOADING) on an existing state', () => {
    const action = {
      type: CONSOLE_SET_DATA_LOADING,
      value: false
    }
    const state = {
      topPanelIndex: 0,
      bottomPanelIndex: 2,
      loadingData: true,
      loadingError: '',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({loadingData: false})
  })

  it('should handle setting loadingError (CONSOLE_SET_LOADING_ERROR) on an initial state', () => {
    const action = {
      type: CONSOLE_SET_LOADING_ERROR,
      value: 'Error loading data'
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({loadingError: 'Error loading data'})
  })

  it('should handle setting loadingError (CONSOLE_SET_LOADING_ERROR) on an existing state', () => {
    const action = {
      type: CONSOLE_SET_LOADING_ERROR,
      value: ''
    }
    const state = {
      topPanelIndex: 0,
      bottomPanelIndex: 2,
      loadingData: true,
      loadingError: 'Error loading data',
      runButton: true,
      datasetsMessage: 'No Datasets',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({loadingError: ''})
  })

  it('should handle setting datasetsMessage (CONSOLE_SET_DATASETS_MESSAGE) on an initial state', () => {
    const action = {
      type: CONSOLE_SET_DATASETS_MESSAGE,
      value: 'Yay, your datasets have loaded'
    }
    Reducer(ConsoleReducer).expect(action).toChangeInState({datasetsMessage: 'Yay, your datasets have loaded'})
  })

  it('should handle setting datasetsMessage (CONSOLE_SET_DATASETS_MESSAGE) on an existing state', () => {
    const action = {
      type: CONSOLE_SET_DATASETS_MESSAGE,
      value: 'No datasets'
    }
    const state = {
      topPanelIndex: 0,
      bottomPanelIndex: 2,
      loadingData: true,
      loadingError: 'Error loading data',
      runButton: true,
      datasetsMessage: 'Yay, your datasets have loaded',

      query: {
        address: '',
        statement: 'select * from us_cen_fam limit 20'
      },

      queryResults: '/ipfs/QmP1MiJZ1MZrLvLyPQWz2ksmREBrVLigcC3med6t9yeEB4/dataset.json',

      chartOptions: {
        type: '',
        title: 'results',
        xTitle: '',
        xIndex: undefined,
        yIndex: undefined,
        path: ''
      }
    }
    Reducer(ConsoleReducer).withState(state).expect(action).toChangeInState({datasetsMessage: 'No datasets'})
  })
})
