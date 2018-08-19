import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import logdown from 'logdown';
import gql from 'graphql-tag';
import { Loading, Spacer } from '@radargovernamental/orbit-style';
import apolloClient from '../../config/apollo-client';

// UI

// Decorators
import AuthInfo from '../../lib/HOC/AuthInfo';

// Actions
import { login, logout } from '../../store/auth/actions';
import { configLoaded, appBootReady } from '../../store/app/actions';

const logger = logdown('BOOT');

const ME = gql`
{
  me {
    id
    firstName
    lastName
    email
  }
}
`;

class Authentication extends Component {
  componentDidMount() {
    this.checkUser()
      .then(() => this.loadConfig())
      .then(() => {
        logger.info('CHAIN READY');
      });
  }


  checkUser() {
    logger.info('CHECK');
    return new Promise((resolve) => {
      const { dispatch, userIsAuthenticated, authToken } = this.props;
      if (userIsAuthenticated && authToken) {
        apolloClient.query({
          query: ME,
          fetchPolicy: 'network-only',
        })
          .then((result) => {
            dispatch(login(result.data.me, authToken));
            return resolve();
          })
          .catch(() => dispatch(logout()));
      } else {
        logger.info('READY TRUE');
      }
    });
  }

  loadConfig() {
    logger.info('CONFIG');
    return new Promise((resolve) => {
      const { dispatch, lastConfigSyncAt } = this.props;
      logger.info('LAST SYNC', lastConfigSyncAt);

      if (lastConfigSyncAt && moment(lastConfigSyncAt).add(3, 'days').isAfter(moment())) {
        dispatch(appBootReady(true));
        return resolve();
      }

      logger.info('SYNCING config');
      logger.info('SIMULATING CONFIG LOAD');

      const config = {
        constants: { HELLO: 'world' },
      };

      dispatch(configLoaded(config));
      dispatch(appBootReady(true));
      return resolve();
    });
  }

  render() {
    const { children, bootReady } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {bootReady ? children : (
          <Spacer mtLg={3} mtMd={3} mtSm={3} mtXs={3} style={{ textAlign: 'center' }}>
            <Loading white inline lg />
          </Spacer>
        )}
      </div>
    );
  }
}

Authentication.propTypes = {
  authToken: PropTypes.string,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  lastConfigSyncAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  userIsAuthenticated: PropTypes.bool,
  bootReady: PropTypes.bool,
};
Authentication.defaultProps = {
  authToken: null,
  lastConfigSyncAt: null,
  userIsAuthenticated: false,
  bootReady: false,
};

export default AuthInfo(
  connect(state => ({ lastConfigSyncAt: state.app.lastSyncAt, bootReady: state.app.bootReady }))(Authentication),
);
