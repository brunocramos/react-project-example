import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import AuthInfo from '../../lib/HOC/AuthInfo';

// Screens
import ScreensUsersList from './List/List';
import ScreensUsersEdit from './Edit/Edit';
import ScreensUsersNew from './New/New';

const ScreensUsers = (props) => {
  const { userIsAuthenticated } = props;
  return userIsAuthenticated ? (
    <Switch>
      <Route path="/users/list" component={ScreensUsersList} />
      <Route path="/users/new" component={ScreensUsersNew} />
      <Route path="/users/edit/:id" component={ScreensUsersEdit} />
    </Switch>
  ) : null;
};

ScreensUsers.propTypes = {
  userIsAuthenticated: PropTypes.bool.isRequired,
};

ScreensUsers.defaultProps = {
};

export default withRouter(AuthInfo(ScreensUsers));
