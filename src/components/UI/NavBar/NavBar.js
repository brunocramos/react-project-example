import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { withRouter, Link } from 'react-router-dom';

import { Text } from '@radargovernamental/orbit-style';

import AuthInfo from '../../../lib/HOC/AuthInfo';
import css from './NavBar.module.scss';

import LogoutButton from '../../Auth/LogoutButton/LogoutButton';

const NavBar = (props) => {
  const { location, primary, user = {} } = props;

  const classes = className({
    [css.navBar]: true,
    [css['navBar--primary']]: primary,
  });

  const { pathname } = location;

  const isLinkActive = route => pathname.substr(0, route.length) === route;

  return (
    <aside className={classes}>
      <nav>
        <ul className={css.navBar__list}>
          <li>
            <Text white>Hello, {user.firstName}!</Text>
          </li>
          <li>
            <Link
              to="/users/list"
              title="Users"
              className={isLinkActive('/users/list') ? css.active : ''}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/users/new"
              title="New User"
              className={isLinkActive('/users/new') ? css.active : ''}
            >
              New User
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

NavBar.propTypes = {
  primary: PropTypes.bool,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
NavBar.defaultProps = {
  primary: false,
};

export default withRouter(AuthInfo(NavBar));
