import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'
import rootReducer from '../modules'


function defaultStoreStructure(token) {
  return {
    session: {
      token,
      role: token ? jwtDecode(token).role : null,
    },
    magazine: {
      rubrics: {
        all: [],
        active_rubric: null,
      },
      issues: {
        all: [],
        active_issue: null,
      },
    },
  }
}


function loadState() {
  try {
    const token = localStorage.getItem('auth_token')
    return defaultStoreStructure(token)
  } catch (err) {
    return defaultStoreStructure(null)
  }
}

export default function configureStore() {
  let middleware = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger()
    middleware = [...middleware, logger]
  }
  return createStore(
    rootReducer,
    loadState(),
    applyMiddleware(...middleware),
  )
}
