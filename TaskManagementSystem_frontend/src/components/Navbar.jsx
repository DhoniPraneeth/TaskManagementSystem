import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="nav-title">Task Board</h1>
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/create-task" className="nav-link">Create Task</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
        <Link to="/signup" className="nav-link">Sign Up</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar; 