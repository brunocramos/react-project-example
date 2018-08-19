export const constants = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
  CONFIG_LOADED: 'AUTH_CONFIG_LOADED',
};

/**
 * User sign in
 * @param user    User info
 * @param token   Authentication token
 * @returns {{type: string, payload: *}}
 */
export const login = (user, token) => ({ type: constants.LOGIN, payload: { user, token } });


/**
 * User sign out
 * @returns {{type: string, payload: *}}
 */
export const logout = () => ({ type: constants.LOGOUT });
