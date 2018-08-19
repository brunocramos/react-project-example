import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import localForage from 'localforage';
import { Text } from '@radargovernamental/orbit-style';

// Apollo client to call mutation
import apolloClient from '../../config/apollo-client';
import graphqlErrorHandler from '../../lib/handlers/graphql-error';

import { login } from '../../store/auth/actions';

import LoginForm from './LoginForm/LoginForm';

const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  onSubmit(data) {
    const { dispatch } = this.props;

    if (data) {
      this.setState({ isLoading: true });
      apolloClient.mutate({
        variables: data,
        mutation: LOGIN,
      })
        .then(async (res) => {
          if (res.errors) return Promise.reject(res.errors);
          const { token } = res.data.login;

          await localForage.setItem('token', token);
          return dispatch(login(null, token));
        })
        .catch((error) => {
          toast.error(graphqlErrorHandler(error).join(', '));
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <Text>Provide any email and password</Text>
        <LoginForm
          isLoading={isLoading}
          onSubmit={data => this.onSubmit(data)}
        />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
Login.defaultProps = {};

export default connect()(Login);
