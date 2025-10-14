import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTaskForm.css';

function AddTaskForm({ onAddTask }) {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!taskData.title || !taskData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Add the task
    onAddTask(taskData);

    // Reset form
    setTaskData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });

    // Redirect to home page
    navigate('/home');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-task-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/home')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm; 