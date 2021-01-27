import React from 'react';
import './App.css';
import Auth from './Auth';
import UserProvider, { useUser } from './context/UserProvider';

function App() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      {user && <span>{user.email}</span>}
      <Auth />
    </div>
  );
}

export default App;
