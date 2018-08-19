import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Loading } from '@radargovernamental/orbit-style';

const UserList = (props) => {
  const { loading, data } = props;

  if (loading) return <Loading />;
  if (!data || !data.length) return <p>Not Found.</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          <Link to={`/users/edit/${user.id}`}>{user.firstName}</Link>
        </li>
      ))}
    </ul>
  );
};

UserList.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
};
UserList.defaultProps = {
  loading: false,
  data: null,
};

export default UserList;
