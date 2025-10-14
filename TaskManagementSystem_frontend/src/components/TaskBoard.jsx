import React from 'react';
import './TaskBoard.css';

function TaskBoard({ tasks, setTasks }) {
  const handleDragStart = (e, task, sourceStatus) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceStatus }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const { task, sourceStatus } = JSON.parse(e.dataTransfer.getData('task'));
    
    if (sourceStatus === targetStatus) return;

    setTasks(prev => ({
      ...prev,
      [sourceStatus]: prev[sourceStatus].filter(t => t.id !== task.id),
      [targetStatus]: [...prev[targetStatus], task]
    }));
  };

  const TaskColumn = ({ title, status, tasks }) => (
    <div 
      className="task-column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div 
            key={task.id}
            className="task-card"
            draggable
            onDragStart={(e) => handleDragStart(e, task, status)}
          >
            <div className="task-card-header">
              <h3>{task.title}</h3>
              {task.priority && (
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
              )}
            </div>
            <p className="task-description">{task.description}</p>
            {task.dueDate && (
              <div className="task-due-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="empty-column">
            <p>No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="taskboard-container">
      <div className="taskboard-header">
        <h1>Task Board</h1>
      </div>
      <div className="task-board">
        <TaskColumn 
          title="To Do" 
          status="todo" 
          tasks={tasks.todo} 
        />
        <TaskColumn 
          title="In Progress" 
          status="inProgress" 
          tasks={tasks.inProgress} 
        />
        <TaskColumn 
          title="Completed" 
          status="completed" 
          tasks={tasks.completed} 
        />
      </div>
    </div>
  );
}

export default TaskBoard; 