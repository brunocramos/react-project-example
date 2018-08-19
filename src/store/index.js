import { combineReducers } from 'redux';
import auth from './auth';
import app from './app';

const store = combineReducers({
  auth,
  app,
});

export default store;
