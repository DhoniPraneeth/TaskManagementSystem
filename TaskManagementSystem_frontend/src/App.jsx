import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import TaskBoard from './components/TaskBoard';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });

  const handleAddTask = (newTask) => {
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, { ...newTask, id: Date.now() }]
    }));
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Make the root path render Home so the app starts on the Home page */}
          <Route path="/" element={<Home tasks={tasks} />} />
          <Route path="/home" element={<Home tasks={tasks} />} />
          <Route path="/tasks" element={<TaskBoard tasks={tasks} setTasks={setTasks} />} />
          <Route path="/create-task" element={<AddTaskForm onAddTask={handleAddTask} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Fallback: unknown routes -> home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
