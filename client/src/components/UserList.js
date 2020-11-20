import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import UserForm from './UserForm';
// import UserDetails from './UserDetails';
import UserUpdate from './UserUpdate';

const GET_USERS = gql`
  query getUsers{
    getUsers {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Int!){
    deleteUser(id: $id)
  }
`;

const UsersList = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [userId, setUserId] = useState(null);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleOnClick = (id) => {
    deleteUser({ variables: { id } });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return <div refetch={refetch()}>
    <UserForm />
    {/* {userId && <UserDetails id={userId}></UserDetails>} */}

    {userId && <UserUpdate id={userId}></UserUpdate>}
    <hr></hr>
    <h4>User List</h4>
    <hr></hr>
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.getUsers.map(({ id, firstName, lastName, email }) =>
          <tr key={id}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td><button className="btn btn-danger" onClick={() => handleOnClick(id)}>Delete</button>&nbsp;&nbsp;
            <button className="btn btn-info" onClick={() => setUserId(id)}>Update</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>;
}
export default UsersList;