import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import rootReducer from '../../src/store/rootReducer'

function rootReducer(state, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default (preloadedState, extraMiddlewares = []) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, ...extraMiddlewares))
