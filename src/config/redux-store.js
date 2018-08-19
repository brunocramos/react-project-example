import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';

import reducer from '../store';

localForage.config({
  name: 'Boilerplate',
  storeName: 'boilerplate',
});

const persistConfig = {
  key: 'boilerplate',
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //eslint-disable-line
);

export const persistor = persistStore(store);
