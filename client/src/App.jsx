import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Posts from './pages/Posts';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav style={{ 
          padding: '15px 20px', 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <a 
                href="/" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#007bff', 
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                MERN Blog
              </a>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  Home
                </a>
                <a href="/posts" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  Posts
                </a>
                <a href="/create" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  Create Post
                </a>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <a 
                href="/login" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#007bff', 
                  fontWeight: '500',
                  padding: '8px 16px',
                  border: '1px solid #007bff',
                  borderRadius: '4px'
                }}
              >
                Login
              </a>
              <a 
                href="/register" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#fff', 
                  fontWeight: '500',
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  borderRadius: '4px'
                }}
              >
                Register
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#f8f9fa' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;