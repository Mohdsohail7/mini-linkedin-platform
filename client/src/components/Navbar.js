import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>LinkedIn Lite</Link>

      <div>
        {!token ? (
          <>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        ) : (
          <>
            <Link to={`/profile/${user?.id}`} style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: '#0073b1',
    color: '#fff',
    alignItems: 'center',
    marginBottom: '20px'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#fff',
    textDecoration: 'none'
  },
  link: {
    marginRight: '15px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#005e93',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Navbar;
