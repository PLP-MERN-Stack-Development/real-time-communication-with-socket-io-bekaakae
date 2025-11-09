import React from 'react';
import Login from '../components/Login';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;