import React from 'react';
import CardColumn from './CardColumn';
import './Board.css';

const MainBoard = ({ tasks, users, groupBy, orderBy }) => {
  // Create a map of users based on the fetched data
  const usersMap = users.reduce((acc, user) => {
    acc[user.id] = { name: user.name, available: user.available };
    return acc;
  }, {});

  // Categorize tasks by priority
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

  // Group tasks based on grouping preference
  const getGroupedTasks = () => {
    if (groupBy === 'User') {
      return tasks.reduce((acc, task) => {
        const user = usersMap[task.userId];
        const userName = user ? user.name : 'Unknown User';
        acc[userName] = acc[userName] || [];
        acc[userName].push(task);
        return acc;
      }, {});
    } else {
      return tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
      }, {});
    }
  };

  // Sort tasks based on ordering preference
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
          title={`${group} (${groupedTasks[group].length})`} 
          cards={groupedTasks[group]} 
          users={usersMap} 
        />
      ))}
    </div>
  );
};

export default MainBoard;
