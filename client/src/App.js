import React from 'react';
import './App.css';
import { UsersList } from './components';

function App() {
  return (
    <div className="app container-fluid">
      <div className="container-fluid mt-2">
        <h3>Apollo Client Graphql Demo</h3>
        <hr></hr>
        <UsersList />
      </div>
    </div>
  );
}

export default App;