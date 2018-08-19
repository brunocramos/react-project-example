import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@radargovernamental/orbit-style';

import LogoutHOC from '../../../lib/HOC/Logout';

const LogoutButton = (props) => {
  const { logout } = props;
  return (
    <Button primary onClick={() => logout()}>Logout</Button>
  );
};

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};
LogoutButton.defaultProps = {};

export default LogoutHOC(LogoutButton);
