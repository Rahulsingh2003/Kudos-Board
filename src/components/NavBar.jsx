import React, { useState, useEffect } from 'react';
import './NavBar.css'; // Custom styling

const NavBar = ({ setGroupBy, setOrderBy, updateTasks }) => {
  const [tasks, setTasks] = useState([]); // Store tasks fetched from the API
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTasks(data.tickets || []); // Assuming the API returns an array of tickets
        updateTasks(data.tickets || []); // Update tasks in the parent
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [updateTasks]);

  // Function to group tasks based on selected option
  const getGroupedTasks = (groupBy) => {
    const groupedTasks = groupBy === 'User'
      ? tasks.reduce((acc, task) => {
          acc[task.userId] = acc[task.userId] || [];
          acc[task.userId].push(task);
          return acc;
        }, {})
      : tasks.reduce((acc, task) => {
          acc[task.status] = acc[task.status] || [];
          acc[task.status].push(task);
          return acc;
        }, {});

    return groupedTasks;
  };

  const handleGroupByChange = (value) => {
    setGroupBy(value);
    const groupedTasks = getGroupedTasks(value);
    updateTasks(groupedTasks); // Update tasks in parent
  };

  return (
    <div>
      <nav className="navbar">
        <div className="left-section">
          <button
            className="display-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="icon">&#9881;</span> Display
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <label htmlFor="groupBy">Grouping:</label>
                <select
                  id="groupBy"
                  onChange={(e) => handleGroupByChange(e.target.value)}
                >
                  <option value="Status">Status</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="dropdown-item">
                <label htmlFor="orderBy">Ordering:</label>
                <select
                  id="orderBy"
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Priority">Priority</option>

                </select>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
