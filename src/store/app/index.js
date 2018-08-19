import { constants } from './actions';
import { constants as authConstants } from '../auth/actions';

const DEFAULT_STATE = {
  bootReady: false,
  lastSyncAt: null,
  data: {},
};


/**
 * Reducer map
 * @param state
 * @param action
 * @returns {*}
 */
const app = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      // only bootReady must not persist
      return Object.assign({}, state, { ...(action.payload || {}).app || {}, bootReady: false });

    case constants.BOOT_READY:
      return Object.assign({}, state, { bootReady: action.payload });

    case constants.CONFIG_LOADED:
      return Object.assign({}, state, { lastSyncAt: new Date(), data: action.payload });

    // User logout
    case authConstants.LOGOUT:
      return DEFAULT_STATE;

    default:
      return state;
  }
};


export default app;
