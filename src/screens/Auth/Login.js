import React from 'react';

import LoginForm from '../../components/Auth/Login';
import css from './Login.module.scss';

const Login = () => (
  <div className={css.main}>
    <div className={css.container}>
      <LoginForm />
    </div>
  </div>
);

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
