import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/authService';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="nav-title">Task Board</h1>
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/create-task" className="nav-link">Create Task</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>

        {user ? (
          <div className="profile-container">
            <button
              className="profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.username}
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <p className="profile-username">{user.username}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-login-btn" aria-label="Login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;