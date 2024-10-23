import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import MainBoard from './MainBoard';

const TaskManager = () => {
  const [groupBy, setGroupBy] = useState('Status'); // Default to grouping by 'Status'
  const [orderBy, setOrderBy] = useState('None'); // Default ordering to 'None'
  const [tasks, setTasks] = useState([]); // Stores tasks
  const [users, setUsers] = useState([]); // Stores users

  // Function to update tasks
  const updateTasks = (newTasks) => {
    setTasks(Array.isArray(newTasks) ? newTasks : []);
  };

  // Fetch tasks and users from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data.tickets || []); // Assuming tickets are returned
        setUsers(data.users || []); // Assuming users are returned
        updateTasks(data.tickets || []); // Update tasks in parent
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Fetch only on component mount

  return (
    <div>
      <NavBar setGroupBy={setGroupBy} setOrderBy={setOrderBy} updateTasks={updateTasks} />
      <MainBoard tasks={tasks} users={users} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
};

export default TaskManager;
