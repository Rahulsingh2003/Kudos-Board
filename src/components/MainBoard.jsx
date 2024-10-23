import React from 'react';
import CardColumn from './CardColumn';
import './Board.css';
import NoPriorityIcon from '../assets/icons_FEtask/No-priority.svg'; 
import UrgentIcon from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg'; 
import HighIcon from '../assets/icons_FEtask/Img - High Priority.svg'; 
import MediumIcon from '../assets/icons_FEtask/Img - Medium Priority.svg'; 
import LowIcon from '../assets/icons_FEtask/Img - Low Priority.svg'; 
import Todosv from '../assets/icons_FEtask/To-do.svg'; 
import Inpo from '../assets/icons_FEtask/in-progress.svg'; 
import Backlo from '../assets/icons_FEtask/Backlog.svg';

const MainBoard = ({ tasks, users, groupBy, orderBy }) => {
  const usersMap = users.reduce((acc, user) => {
    acc[user.id] = { name: user.name, available: user.available };
    return acc;
  }, {});

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

  const displayTasks = () => {
    if (orderBy === 'None') {
      return getGroupedTasks();
    } else if (orderBy === 'Priority') {
      return categorizedTasks(tasks);
    }
    return {};
  };

  const groupedTasks = displayTasks();

  return (
    <div className="board">
      {Object.keys(groupedTasks).map((group) => (
        <CardColumn 
          key={group} 
          title={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              
              {group === "Urgent" && <img src={UrgentIcon} alt="Urgent icon" className="priority-icon" style={{ marginRight: '8px' }} />}
              {group === "High" && <img src={HighIcon} alt="High icon" className="priority-icon" style={{ marginRight: '8px' }} />}
              {group === "Medium" && <img src={MediumIcon} alt="Medium icon" className="priority-icon" style={{ marginRight: '8px' }} />}
              {group === "Low" && <img src={LowIcon} alt="Low icon" className="priority-icon" style={{ marginRight: '8px' }} />}
              {group === "No Priority" && <img src={NoPriorityIcon} alt="No priority icon" className="priority-icon" style={{ marginRight: '8px' }} />}
              
              {group === "Todo" && <img src={Todosv} alt="Todo icon" className="todo-icon" style={{ marginRight: '8px' }} />}
              {group === "In progress" && <img src={Inpo} alt="In progress icon" className="todo-icon" style={{ marginRight: '8px' }} />}
              {group === "Backlog" && <img src={Backlo} alt="Backlog icon" className="todo-icon" style={{ marginRight: '8px' }} />}
              <span style={{ marginLeft: '8px' }}>{group}</span>
            </span>
          } 
          cards={groupedTasks[group].map((task) => ({
            ...task,
            title: (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {task.status === 'In progress' && <img src={Inpo} alt="In progress icon" style={{ marginRight: '8px' }} />}
                {task.title}
              </span>
            )
          }))} 
          users={usersMap} 
        />
      ))}
    </div>
  );
};

export default MainBoard;
