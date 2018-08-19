export const constants = {
  BOOT_READY: 'APP_BOOT_READY',
  CONFIG_LOADED: 'APP_CONFIG_LOADED',
};

/**
 * Set app boot status
 * @param status
 * @returns {{type: string, payload: *}}
 */
export const appBootReady = status => ({ type: constants.BOOT_READY, payload: status });

/**
 * User config loaded
 * @returns {{type: string, payload: *}}
 */
export const configLoaded = config => ({ type: constants.CONFIG_LOADED, payload: config });
