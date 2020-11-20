import React, { useState, useEffect } from 'react';
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

const UPDATE_USER = gql`
  mutation updateUser($userId: Int!,$firstName: String!, $lastName: String!,$email: String!) {
    updateUser(id: $userId,firstName: $firstName,lastName: $lastName,email: $email){
      id
    }
  }
`;

const UserUpdate = ({ id }) => {
  const { data } = useQuery(GET_USER, { variables: { id: id } });
  const [userId, setUserId] = useState({});
  let [firstName, setFirstName] = useState({});
  let [lastName, setLastName] = useState({});
  let [email, setEmail] = useState({});
  const [updateUser] = useMutation(UPDATE_USER);

  const firstNameHandleOnChange = (event) => {
    setFirstName(event.target.value);
  }

  const lastNameHandleOnChange = (event) => {
    setLastName(event.target.value);
  }

  const emailHandleOnChange = (event) => {
    setEmail(event.target.value);
  }

  const updateHandleSubmit = (event) => {
    event.preventDefault();
    updateUser({ variables: { userId, firstName, lastName, email } });
    setFirstName("");
    setLastName("");
    setEmail("");
    window.location.reload();
  }

  if (data && data.getUser) {
    const { getUser: { id, firstName, lastName, email } } = data;

    return <div>
      <hr></hr>
      <h4>Update Details</h4>
      <form onSubmit={updateHandleSubmit} >
        <input className="form-control" defaultValue={firstName} onChange={firstNameHandleOnChange} type="text" name="firstName" placeholder="First Name" required />
        <input className="form-control" defaultValue={lastName} onChange={lastNameHandleOnChange} type="text" name="lastName" placeholder="Last Name" required />
        <input className="form-control" defaultValue={email} onChange={emailHandleOnChange} type="email" name="email" placeholder="Email Address" required />
        <input className="btn btn-success btn-block" onClick={() => setUserId(id)} type="submit" value="Update" />
      </form>
    </div>;
  }

  return null;
}

export default UserUpdate;