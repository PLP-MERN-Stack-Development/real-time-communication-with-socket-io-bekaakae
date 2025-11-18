import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
        Welcome to MERN Blog
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#666', lineHeight: '1.6' }}>
        Share your thoughts, stories, and ideas with the world. Create beautiful blog posts and connect with other writers.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#007bff', marginBottom: '15px' }}>📝 Write Posts</h3>
          <p>Create and publish your own blog posts on any topic you're passionate about.</p>
        </div>
        
        <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#007bff', marginBottom: '15px' }}>📚 Read Content</h3>
          <p>Discover amazing content from other writers and expand your knowledge.</p>
        </div>
        
        <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#007bff', marginBottom: '15px' }}>👥 Join Community</h3>
          <p>Become part of our growing community of writers and readers.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('/posts')}
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          View All Posts
        </button>
        
        <button 
          onClick={() => navigate('/create')}
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Create New Post
        </button>
        
        <button 
          onClick={() => navigate('/login')}
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Login / Register
        </button>
      </div>
    </div>
  );
};

export default Home;