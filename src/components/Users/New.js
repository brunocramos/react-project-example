import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import {
  Grid,
  Row,
  Col,
} from '@radargovernamental/orbit-style';

import apolloClient from '../../config/apollo-client';

import UserForm from './Form/User';
import graphqlErrorHandler from '../../lib/handlers/graphql-error';

const INSERT_USER = gql`
mutation register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    token
  }
}
`;

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
    };
  }

  handleSubmit(data) {
    const { history } = this.props;
    this.setState({ loading: true });
    apolloClient.mutate({
      mutation: INSERT_USER,
      variables: {
        ...data,
      },
    })
      .then(() => {
        toast.success('User inserted');
        history.push('/users/list');
      })
      .catch((err) => {
        toast.error(graphqlErrorHandler(err).join(', '));
        // not used in finally to prevent setting state in an unmounted component due to redirect if success
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <Grid style={{ margin: 0 }}>
        <Row>
          <Col xs>
            <UserForm
              action="insert"
              onSubmit={this.handleSubmit}
              loading={loading}
              submitTitle="Add"
              showCancel
              cancelLink="/users/list"
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

NewUser.propTypes = {
  history: PropTypes.object.isRequired,
};
NewUser.defaultProps = {
};

export default withRouter(NewUser);
