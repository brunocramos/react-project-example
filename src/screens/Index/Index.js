import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

// Decorators
import AuthInfo from '../../lib/HOC/AuthInfo';

// Layout components
import Authentication from '../../components/Auth/Authentication';
import Main from '../../components/UI/Main/Main';
import NavBar from '../../components/UI/NavBar/NavBar';

// Screens
import ScreensLogin from '../Auth/Login';
import ScreensUsers from '../Users/Users';

const Index = (props) => {
  const {
    userIsAuthenticated,
  } = props;

  return userIsAuthenticated ? (
    <Authentication>
      <NavBar />
      <Main>
        <Switch>
          <Route path="/users" component={ScreensUsers} />
        </Switch>
      </Main>
    </Authentication>
  ) : (
    <ScreensLogin />
  );
};

Index.propTypes = {
  userIsAuthenticated: PropTypes.bool,
};

Index.defaultProps = {
  userIsAuthenticated: false,
};

export default withRouter(AuthInfo(Index));
