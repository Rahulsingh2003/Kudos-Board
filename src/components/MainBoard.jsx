import React, { useEffect, useState } from 'react';
import CardColumn from './CardColumn';
import "./Board.css";

const MainBoard = ({ tasks, groupBy, orderBy }) => {
  const [users, setUsers] = useState({}); // Initialize as an empty object

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-users');
        const userData = await response.json();
        // Create a map of userId to user details
        const userMap = userData.reduce((acc, user) => {
          acc[user.id] = {
            name: user.name,
            available: user.available, // Assuming you have this field
          };
          return acc;
        }, {});
        setUsers(userMap); // Set users into state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Categorize tasks based on their priority
  const categorizedTasks = (tasks) => {
    const categorized = {
      "No Priority": [],
      "Urgent": [],
      "High": [],
      "Medium": [],
      "Low": [],
    };

    tasks.forEach((task) => {
      switch (task.priority) {
        case 0:
          categorized["No Priority"].push(task);
          break;
        case 4:
          categorized["Urgent"].push(task);
          break;
        case 3:
          categorized["High"].push(task);
          break;
        case 2:
          categorized["Medium"].push(task);
          break;
        case 1:
          categorized["Low"].push(task);
          break;
        default:
          break;
      }
    });

    return categorized;
  };

  // Get the grouped tasks based on grouping preference
  const getGroupedTasks = () => {
    if (groupBy === 'User') {
      return tasks.reduce((acc, task) => {
        acc[task.userId] = acc[task.userId] || [];
        acc[task.userId].push(task);
        return acc;
      }, {});
    } else {
      // Default grouping by Status
      return tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
      }, {});
    }
  };

  // Determine how to display tasks based on orderBy selection
  const displayTasks = () => {
    if (orderBy === 'None') {
      return getGroupedTasks();
    } else if (orderBy === 'Priority') {
      return categorizedTasks(tasks); // Categorize by priority
    }
    return {};
  };

  const groupedTasks = displayTasks();

  return (
    <div className="board">
      {Object.keys(groupedTasks).map((group) => (
        <CardColumn 
          key={group} 
          title={`${group} (${groupedTasks[group].length})`} // Show task count
          cards={groupedTasks[group]} 
          users={users} // Pass users to CardColumn
        />
      ))}
    </div>
  );
};

export default MainBoard;
