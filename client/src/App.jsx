import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider, useSocketContext } from './context/SocketContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

// Main App component that uses socket context
const AppContent = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { connect, disconnect } = useSocketContext();

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    connect(user);
  };

  const handleLogout = () => {
    disconnect();
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={
              isLoggedIn ? 
                <Navigate to="/chat" replace /> : 
                <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/chat" 
            element={
              isLoggedIn ? 
                <ChatPage 
                  currentUser={username}
                  onLogout={handleLogout}
                /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

// Wrap the main app with SocketProvider
function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

export default App;