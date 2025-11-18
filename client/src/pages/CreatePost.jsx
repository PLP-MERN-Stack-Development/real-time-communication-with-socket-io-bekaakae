/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking...');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: ''
  });

  // Check server status on component mount
  useEffect(() => {
    checkServerStatus();
    fetchCategories();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5001/');
      setServerStatus('✅ Connected');
      console.log('Server status:', response.data);
    } catch (error) {
      setServerStatus('❌ Disconnected');
      console.error('Server check failed:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const response = await axios.get('http://localhost:5001/api/categories');
      console.log('Categories received:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert(`Failed to load categories: ${error.message}`);
      
      // Fallback data
      setCategories([
        { _id: '1', name: 'Technology' },
        { _id: '2', name: 'Travel' },
        { _id: '3', name: 'Food' }
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting post:', formData);
      
      const response = await axios.post(
        'http://localhost:5001/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log('Post creation response:', response.data);
      alert('✅ Post created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        category: '',
        image: ''
      });

      // REDIRECT TO POSTS PAGE AFTER SUCCESS
      navigate('/posts');

    } catch (error) {
      console.error('Post creation failed:', error);
      
      if (error.response) {
        alert(`Server error: ${error.response.status} - ${error.response.data?.error || error.response.data?.message}`);
      } else if (error.request) {
        alert('No response from server. Backend might be down.');
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const testAllEndpoints = async () => {
    const endpoints = [
      { url: 'http://localhost:5001/', method: 'GET', name: 'Home' },
      { url: 'http://localhost:5001/api/categories', method: 'GET', name: 'Categories' }
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(endpoint.url);
        console.log(`✅ ${endpoint.name}:`, response.data);
        alert(`✅ ${endpoint.name} - Working`);
      } catch (error) {
        console.error(`❌ ${endpoint.name}:`, error.message);
        alert(`❌ ${endpoint.name} - Failed: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Create New Post</h2>
        <button 
          onClick={() => navigate('/posts')}
          style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          View All Posts
        </button>
      </div>
      
      {/* Server Status */}
      <div style={{ 
        padding: '10px', 
        marginBottom: '20px', 
        backgroundColor: serverStatus.includes('✅') ? '#d4edda' : '#f8d7da',
        border: `1px solid ${serverStatus.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        <strong>Server Status:</strong> {serverStatus}
        <button 
          onClick={checkServerStatus}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Refresh Status
        </button>
        <button 
          onClick={testAllEndpoints}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Test All Endpoints
        </button>
        <button 
          onClick={() => window.open('http://localhost:5001/api/categories')}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Open Categories in Browser
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Title: *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Enter post title"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Category: *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading || categories.length === 0}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">{categories.length === 0 ? 'Loading categories...' : 'Select a Category'}</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {categories.length === 0 && (
            <small style={{ color: 'red' }}>
              Categories not loaded. Check server connection.
            </small>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Content: *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={loading}
            rows="6"
            style={{ width: '100%', padding: '8px' }}
            placeholder="Write your post content here..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Image URL (optional):</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            disabled={loading}
            style={{ width: '100%', padding: '8px' }}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || categories.length === 0}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: (loading || categories.length === 0) ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (loading || categories.length === 0) ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
