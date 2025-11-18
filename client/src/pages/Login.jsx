import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement actual login logic with backend
    console.log('Login attempt:', formData);
    
    // Simulate login process
    setTimeout(() => {
      alert('Login functionality will be implemented with backend authentication');
      setLoading(false);
      // navigate('/'); // Redirect after successful login
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login to Your Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            placeholder="Enter your password"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ color: '#666' }}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Sign up here
          </Link>
        </p>
        
        <button 
          onClick={() => navigate('/')}
          style={{ 
            marginTop: '15px',
            padding: '8px 16px', 
            backgroundColor: 'transparent', 
            color: '#666', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;