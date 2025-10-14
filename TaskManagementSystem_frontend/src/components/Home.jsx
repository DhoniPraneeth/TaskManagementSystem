import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ tasks }) {
  const totalTasks = tasks.todo.length + tasks.inProgress.length + tasks.completed.length;
  const completedTasks = tasks.completed.length;
  const inProgressTasks = tasks.inProgress.length;
  const pendingTasks = tasks.todo.length;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Task Management</h1>
        <Link to="/create-task" className="add-task-button">
          + Add New Task
        </Link>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">{totalTasks}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">{inProgressTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{pendingTasks}</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/tasks" className="action-card">
          <h3>View Task Board</h3>
          <p>Manage and organize your tasks</p>
        </Link>
        <Link to="/create-task" className="action-card">
          <h3>Create New Task</h3>
          <p>Add a new task to your board</p>
        </Link>
      </div>
    </div>
  );
}

export default Home; 