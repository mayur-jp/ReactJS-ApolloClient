import React from "react";
import { GET_USERS } from "./Query";
import { useQuery } from "@apollo/react-hooks";

const User = () => {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
        <ul>
            {data.map(user => (
                <li>{user.id}</li>
            ))}
        </ul>
    );
};

export { User };