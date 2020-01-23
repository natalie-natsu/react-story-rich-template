import React from 'react';
import PropTypes from 'prop-types';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import history from '@react-story-rich/core/reducers/history';

import allowAudio from 'store/allowAudio';
import layout from 'store/layout';
import settings from 'store/settings';

const middleWares = [thunk];
if (process.env.NODE_ENV === 'development') { middleWares.push(logger); }

const reducers = combineReducers({
  allowAudio,
  history,
  layout,
  settings,
});
const persistedReducers = persistReducer({
  key: 'root',
  storage,
  blacklist: ['allowAudio', 'layout'], // layout will not be persisted
}, reducers);

export const store = createStore(persistedReducers, compose(applyMiddleware(...middleWares)));
export const persistor = persistStore(store);

const Store = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

Store.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Store;
