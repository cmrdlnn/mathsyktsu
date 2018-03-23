import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import rootReducer from 'modules';

function loadState() {
  const token = localStorage.getItem('JWT');
  return token && { user: { role: jwtDecode(token).role } };
}

export default function configureStore() {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const createStoreArgs = [rootReducer, applyMiddleware(...middleware)];
  const defaultState = loadState();

  if (defaultState) {
    createStoreArgs.splice(1, 0, defaultState);
  }

  return createStore(...createStoreArgs);
}
