import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from 'modules';

export default function configureStore() {
  let middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middleware = [...middleware, logger];
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );
}
