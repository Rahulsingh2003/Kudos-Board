import React from 'react';
import './Card.css';

import NoPriorityIcon from '../assets/icons_FEtask/No-priority.svg';
import UrgentIcon from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import HighPriorityIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import MediumPriorityIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import LowPriorityIcon from '../assets/icons_FEtask/Img - Low Priority.svg';

import TodoIcon from '../assets/icons_FEtask/To-do.svg';
import InProgressIcon from '../assets/icons_FEtask/in-progress.svg'; 
import BacklogIcon from '../assets/icons_FEtask/Backlog.svg'; 

const Card = ({ id, title, tag, userId, users, status, priority }) => {
  const user = users[userId] || { name: 'Unknown User', available: false };

 
  let priorityIcon;
  switch (priority) {
    case 4:
      priorityIcon = UrgentIcon;
      break;
    case 3:
      priorityIcon = HighPriorityIcon;
      break;
    case 2:
      priorityIcon = MediumPriorityIcon;
      break;
    case 1:
      priorityIcon = LowPriorityIcon;
      break;
    case 0:
    default:
      priorityIcon = NoPriorityIcon;
      break;
  }

  let statusIcon;
  switch (status) {
    case 'Todo':
      statusIcon = TodoIcon;
      break;
    case 'In Progress':
      statusIcon = InProgressIcon;
      break;
    case 'Backlog':
      statusIcon = BacklogIcon;
      break;
    default:
      statusIcon = null;
      break;
  }

  const handleTagClick = (tag) => {
    console.log(`Tag clicked: ${tag}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <div className="profile-info">
          <img 
            src={`https://api.adorable.io/avatars/50/${userId}.png`} 
            alt={user.name} 
            className="profile-image" 
          />
          <span>
            {user.name} {user.available !== undefined ? (user.available ? " (Available)" : " (Not Available)") : ""}
          </span>
        </div>
      </div>
      <h2 className="card-title">
        {statusIcon && <img src={statusIcon} alt={`${status} icon`} className="status-icon" />}
        {title}
      </h2>
      <div className="card-footer">
        {tag.map((t, index) => (
          <div key={index} className="tag-container">
            {t === "Feature Request" && priorityIcon && (
              <img src={priorityIcon} alt={`${priority} priority icon`} className="priority-icon" />
            )}
            <button className="tag-button" onClick={() => handleTagClick(t)}>
              {t}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
