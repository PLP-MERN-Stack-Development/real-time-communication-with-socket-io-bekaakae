import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/posts');
      console.log('Posts fetched:', response.data);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Loading posts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchPosts}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>All Posts</h1>
        <button 
          onClick={fetchPosts}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Refresh Posts
        </button>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No posts yet</h3>
          <p>Create your first post to see it here!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {posts.map(post => (
            <div 
              key={post._id} 
              style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '20px', 
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h2 style={{ marginTop: 0, color: '#333' }}>{post.title}</h2>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '14px', color: '#666' }}>
                <span>
                  <strong>Category:</strong> {getCategoryName(post.category)}
                </span>
                <span>
                  <strong>Created:</strong> {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div style={{ lineHeight: '1.6', color: '#444' }}>
                {post.content}
              </div>

              {post.image && (
                <div style={{ marginTop: '15px' }}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    style={{ maxWidth: '100%', borderRadius: '4px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to get category name from ID
const getCategoryName = (categoryId) => {
  const categories = {
    '1': 'Technology',
    '2': 'Travel',
    '3': 'Food',
    '4': 'Lifestyle',
    '5': 'Programming',
    '6': 'Health',
    '7': 'Business'
  };
  return categories[categoryId] || 'Uncategorized';
};

export default Posts;