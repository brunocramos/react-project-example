import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';

import { Heading } from '@radargovernamental/orbit-style';

import UserList from './List/List';

const QUERY = gql`
  query {
    allUsers {
      id
      firstName
      lastName
    }
  }
`;

const List = () => (
  <section>
    <Heading level={1} title="Users">Users</Heading>
    <Query
      query={QUERY}
      fetchPolicy="network-only"
    >
      {({ loading, data }) => {
        const { allUsers } = data || {};
        return <UserList loading={loading} data={allUsers} />;
      }}
    </Query>
  </section>
);

List.propTypes = {};
List.defaultProps = {};

export default withRouter(List);
