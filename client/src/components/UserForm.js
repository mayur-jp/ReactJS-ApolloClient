import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const ADD_USER = gql`
  mutation addUser($firstName: String!,$lastName: String!,$email: String!) {
    addUser(firstName: $firstName,lastName: $lastName,email: $email) {
        id,
        firstName,
        lastName,
        email
    }
  }
`;

const UserForm = () => {
    const [addUser] = useMutation(ADD_USER);
    const [firstName, setFirstName] = useState({});
    const [lastName, setLastName] = useState({});
    const [email, setEmail] = useState({});

    const firstNameHandleOnChange = (event) => {
        setFirstName(event.target.value);
    }

    const lastNameHandleOnChange = (event) => {
        setLastName(event.target.value);
    }

    const emailHandleOnChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addUser({ variables: { firstName, lastName, email } });
        setFirstName("");
        setLastName("");
        setEmail("");
        window.location.reload();
    }

    return <div>
        <h4>Add User</h4>
        <hr></hr>
        <form onSubmit={handleSubmit}>
            <div class="row center">
                <div class="col-md-8">
                    <input className="form-control" value={firstName.length ? firstName : ''} onChange={firstNameHandleOnChange} type="text" name="firstName" placeholder="First Name" required />
                </div>
                <div class="col-md-8 mt-2">
                    <input className="form-control" value={lastName.length ? lastName : ''} onChange={lastNameHandleOnChange} type="text" name="lastName" placeholder="Last Name" required />
                </div>
                <div class="col-md-8 mt-2">
                    <input className="form-control" value={email.length ? email : ''} onChange={emailHandleOnChange} type="email" name="email" placeholder="Email Address" required />
                </div>
                <div class="col-md-8 mt-2">
                    <input className="btn btn-success btn-block" type="submit" value="Add" />
                </div>
            </div>
        </form>
    </div>;
}

export default UserForm;