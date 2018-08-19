import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../store/auth/actions';

export default (WrappedComponent) => {
  const Logout = (props) => {
    const { dispatch, ...otherProps } = props;

    return (
      <WrappedComponent
        logout={() => dispatch(logout())}
        {...otherProps}
      />
    );
  };

  Logout.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  Logout.defaultProps = {};
  return connect()(Logout);
};
