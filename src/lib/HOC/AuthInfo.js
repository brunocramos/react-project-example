import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  const AuthInfo = (props) => {
    const { auth, ...otherProps } = props;
    const { token, user } = auth;

    const userIsAuthenticated = !!token;

    return (
      <WrappedComponent
        userIsAuthenticated={userIsAuthenticated}
        authToken={token}
        user={user || {}}
        {...otherProps}
      />
    );
  };

  AuthInfo.propTypes = {
    auth: PropTypes.object,
  };
  AuthInfo.defaultProps = {
    auth: {},
  };

  return connect(state => ({ auth: state.auth || {} }))(AuthInfo);
};
