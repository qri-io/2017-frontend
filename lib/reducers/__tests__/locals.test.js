/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import locals from '../locals'

import { REMOVE_MODEL } from '../../constants/app'
import Schemas from '../../schemas'

describe('Locals Reducer', () => {
  const initialState = {
    datasets: {}
  }

  it('should have an initialState (@@INIT)', () => {
    expect(locals(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle adding a local modal to an initial state', () => {
    const action = {
      locals: {
        entities: {
          datasets: {
            '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
              name: 'movies',
              path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
              dataset: {}
            }
          }
        }
      }
    }
    const result = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).expect(action).toReturnState(result)
  })

  it('should handle adding a local modal to an existing state that has data in a different entity', () => {
    const action = {
      locals: {
        entities: {
          datasets: {
            '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
              name: 'movies',
              path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
              dataset: {}
            }
          }
        }
      }
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    const result = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(result)
  })

  it('should handle updating a local modal that has already been added', () => {
    const action = {
      locals: {
        entities: {
          datasets: {
            '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
              name: 'new name',
              path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
              dataset: {}
            }
          }
        }
      }
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    const result = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'new name',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(result)
  })

  it('should handle adding a local modal to an existing state', () => {
    const action = {
      locals: {
        entities: {
          datasets: {
            '/ipfs/Qmom1BzRRf3Xc1Y1XWE7MkrJhkTbof4JoB6U4VZdKsFiQ2Z/dataset.json': {
              name: 'new name',
              path: '/ipfs/Qmom1BzRRf3Xc1Y1XWE7MkrJhkTbof4JoB6U4VZdKsFiQ2Z/dataset.json',
              dataset: {}
            }
          }
        }
      }
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    const result = {
      datasets: {
        '/ipfs/Qmom1BzRRf3Xc1Y1XWE7MkrJhkTbof4JoB6U4VZdKsFiQ2Z/dataset.json': {
          name: 'new name',
          path: '/ipfs/Qmom1BzRRf3Xc1Y1XWE7MkrJhkTbof4JoB6U4VZdKsFiQ2Z/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(result)
  })

  it('should return the initial state if there is no action.locals on an initial state', () => {
    const action = {
      locals: undefined
    }
    Reducer(locals).expect(action).toReturnState(initialState)
  })

  it('should return the same state if there is no action.locals on an existing state', () => {
    const action = {
      locals: undefined
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(state)
  })

  it('should return the initial state if there is no action.locals.entities on an initial state', () => {
    const action = {
      locals: {
        entities: undefined
      }
    }
    Reducer(locals).expect(action).toReturnState(initialState)
  })

  it('should return the same state if there is no action.locals.entities on an existing state', () => {
    const action = {
      locals: {
        entities: undefined
      }
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(state)
  })

  it('should, on an initial state, return the initial state when trying to add a local model whose model data is undefined', () => {
    const action = {
      locals: {
        entities: {
          datasets: undefined
        }
      }
    }
    Reducer(locals).expect(action).toReturnState(initialState)
  })

  it('should, on an existing state, return the same state when trying to add a local model whose model data is undefined', () => {
    const action = {
      locals: {
        entities: {
          datasets: undefined
        }
      }
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(state)
  })

  it('should return the initial state if removing a local modal from an initial state', () => {
    const action = {
      type: REMOVE_MODEL,
      schema: Schemas.DATASET,
      id: 'test'
    }
    Reducer(locals).expect(action).toReturnState(initialState)
  })

  it('should handle removing a local modal from an existing state ', () => {
    const action = {
      type: REMOVE_MODEL,
      schema: Schemas.DATASET,
      id: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json'
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    const result = {
      datasets: {}
    }
    Reducer(locals).withState(state).expect(action).toReturnState(result)
  })

  it('should return the same state if it tries to remove a modal that does not exist from an existing state', () => {
    const action = {
      type: REMOVE_MODEL,
      schema: Schemas.DATASET,
      id: '/ipfs/Qmom1BzRRf3Xc1Y1XWE7MkrJhkTbof4JoB6U4VZdKsFiQ2Z/dataset.json'
    }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(state)
  })

  it('should return the same state after accepting a non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(locals).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting a non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    const state = {
      datasets: {
        '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json': {
          name: 'movies',
          path: '/ipfs/QmZ2QiFsKdZV4U6BoJ4obTkhJrkM7EWX1Y1vX3fRRzB1mo/dataset.json',
          dataset: {}
        }
      }
    }
    Reducer(locals).withState(state).expect(action).toReturnState(state)
  })
})
