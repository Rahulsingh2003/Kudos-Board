import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import MainBoard from './MainBoard';

const TaskManager = () => {
  const [groupBy, setGroupBy] = useState('Status'); 
  const [orderBy, setOrderBy] = useState('None');
  const [tasks, setTasks] = useState([]); 
  const [users, setUsers] = useState([]); 

  const updateTasks = (newTasks) => {
    setTasks(Array.isArray(newTasks) ? newTasks : []);
  };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data.tickets || []); 
        setUsers(data.users || []); 
        updateTasks(data.tickets || []); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div>
      <NavBar 
        groupBy={groupBy} 
        setGroupBy={setGroupBy} 
        orderBy={orderBy} 
        setOrderBy={setOrderBy} 
      />
      <MainBoard tasks={tasks} users={users} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
};

export default TaskManager;
