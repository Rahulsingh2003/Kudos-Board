import React, { useState } from 'react';
import NavBar from './NavBar';
import MainBoard from './MainBoard';

const TaskManager = () => {
  const [groupBy, setGroupBy] = useState('Status'); // Default to grouping by 'Status'
  const [orderBy, setOrderBy] = useState('None'); // Set default ordering to 'None'
  const [tasks, setTasks] = useState([]); // Initialize as an empty array

  // Function to update tasks
  const updateTasks = (newTasks) => {
    setTasks(Array.isArray(newTasks) ? newTasks : []);
  };

  return (
    <div>
      <NavBar setGroupBy={setGroupBy} setOrderBy={setOrderBy} updateTasks={updateTasks} />
      <MainBoard tasks={tasks} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
};

export default TaskManager;
