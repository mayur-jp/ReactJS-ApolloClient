import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
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

const UserDetails = ({ id }) => {
  const { data } = useQuery(GET_USER, { variables: { id: id } });
  const [deleteUser] = useMutation(DELETE_USER);

  const handleOnClick = () => {
    deleteUser({ variables: { id } });
  }

  if (data && data.getUser) {
    const { getUser: { id, firstName, lastName, email } } = data;
    return <div>
      <hr></hr>
      <h4>Details</h4>
      <p>First Name: {firstName} </p>
      <p>Last Name: {lastName} </p>
      <p>Email: {email} </p>

      <button className="btn btn-danger" onClick={handleOnClick}>Remove</button>
    </div>;
  }

  return null;
}

export default UserDetails;