import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (!token) {
    return (
      <nav className="navbar">
        <div className="nav-logo">Assignment Portal</div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">Assignment Portal</div>
      <div className="nav-links">
        {role === 'student' ? (
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
        ) : (
          <Link to="/teacher" className={location.pathname === '/teacher' ? 'active' : ''}>
            Dashboard
          </Link>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
