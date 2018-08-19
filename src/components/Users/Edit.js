import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import gql from 'graphql-tag';
import {
  Text,
  Heading,
  Row,
  Col,
  Grid,
  Loading,
} from '@radargovernamental/orbit-style';

import UserForm from './Form/User';

const USER = gql`
query User(
  $id: ID!
) {
  User(id: $id) {
    firstName
    lastName
    email
  }
}
`;

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loadingSubmit: false,
    };
  }

  handleSubmit(data) {
    const { history } = this.props;

    this.setState({ loadingSubmit: true });
    // Simulate update
    return new Promise((resolve) => {
      console.log('UPDATED with form: ', data); //eslint-disable-line
      toast.success('User updated');
      history.push('/users/list');
      resolve();
    });
  }

  render() {
    const { loadingSubmit } = this.state;
    const { match } = this.props;

    const { id } = match.params;

    return (
      <Grid style={{ margin: 0 }}>
        <Row>
          <Col xs>
            <Query
              query={USER}
              variables={{ id }}
              fetchPolicy="network-only"
            >
              {({ loading, error, data }) => {
                if (loading) return <Loading primary />;
                if (error) return <Text>Error</Text>;

                const userData = get(data, ['User']);
                if (!userData) return <Text>User not found</Text>;
                return (
                  <div>
                    <Heading level={2}>{userData.firstName}</Heading>
                    <UserForm
                      action="update"
                      onSubmit={this.handleSubmit}
                      loading={loadingSubmit}
                      submitTitle="Save"
                      data={userData}
                      showCancel
                      cancelLink="/users"
                    />
                  </div>
                );
              }}
            </Query>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Edit.defaultProps = {
};

export default withRouter(Edit);
