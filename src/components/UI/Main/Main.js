import React from 'react';
import PropTypes from 'prop-types';

import css from './Main.module.scss';

const Main = (props) => {
  const { children } = props;
  return (
    <main className={css.main}>
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};
Main.defaultProps = {
  children: null,
};

export default Main;
