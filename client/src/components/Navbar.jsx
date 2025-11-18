import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { currentUser, logout } = useAuth()

  return (
    <nav style={navStyles}>
      <div className="container">
        <div style={navContentStyles}>
          <Link to="/" style={brandStyles}>
            MERN Blog
          </Link>
          
          <div style={navLinksStyles}>
            <Link to="/" style={linkStyles}>Home</Link>
            
            {currentUser ? (
              <>
                <Link to="/create-post" style={linkStyles}>Create Post</Link>
                <span style={userStyles}>Hello, {currentUser.username}</span>
                <button onClick={logout} style={buttonStyles}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyles}>Login</Link>
                <Link to="/register" style={linkStyles}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

const navStyles = {
  backgroundColor: '#343a40',
  padding: '1rem 0',
  marginBottom: '2rem'
}

const navContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const brandStyles = {
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textDecoration: 'none'
}

const navLinksStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
}

const linkStyles = {
  color: 'white',
  textDecoration: 'none'
}

const userStyles = {
  color: '#ccc'
}

const buttonStyles = {
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer'
}

export default Navbar