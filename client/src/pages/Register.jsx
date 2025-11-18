import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    
    // TODO: Implement actual registration logic with backend
    console.log('Registration attempt:', formData);
    
    // Simulate registration process
    setTimeout(() => {
      alert('Registration functionality will be implemented with backend authentication');
      setLoading(false);
      // navigate('/login'); // Redirect to login after successful registration
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Create Your Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            placeholder="Enter your full name"
          />
        </div>

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

        <div style={{ marginBottom: '20px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            placeholder="Create a password"
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            placeholder="Confirm your password"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ color: '#666' }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Login here
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

export default Register;