import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';

import reducers from '../reducers/index';

export const useStoreConfig = () => {
  const initialState = {};
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk))
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
