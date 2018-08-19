import localForage from 'localforage';
import { constants } from './actions';

const DEFAULT_STATE = {
  user: null,
  token: null,
  lastSyncAt: null,
};

/**
 * User sign in
 * @param user    User info
 * @param token   Auth token
 * @returns {{user: *, token: *, lastSyncAt: Date}}
 */
const login = ({ user, token }) => ({ user, token, lastSyncAt: new Date() });

/**
 * User logout, returning default state
 * @returns {{user: null, token: null, lastSyncAt: null}}
 */
const logout = () => DEFAULT_STATE;


/**
 * Reducer map
 * @param state
 * @param action
 * @returns {*}
 */
const auth = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      localForage.setItem('token', action.payload.auth.token);
      return action.payload.auth;
    case constants.LOGIN:
      return login(action.payload);
    case constants.LOGOUT:
      localForage.setItem('token', null);
      return logout();
    default:
      return state;
  }
};


export default auth;
