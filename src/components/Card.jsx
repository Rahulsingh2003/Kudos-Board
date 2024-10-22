import React from 'react';
import './Card.css';

const Card = ({ id, title, tag, userId, priority, users }) => {
  const user = users[userId] || {}; // Get user details from the users map

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <div className="profile-info">
          <img src={`https://api.adorable.io/avatars/50/${userId}.png`} alt={user.name || 'Unknown'} className="profile-image" />
          <span>{user.name ? user.name : 'User not found'} {user.available !== undefined ? (user.available ? "(Available)" : "(Not Available)") : ""}</span>
        </div>
      </div>
      <h2 className="card-title">{title}</h2>
      <div className="card-footer">
        <span className="tag">{tag.join(", ")}</span>
        <span className="priority">Priority: {priority}</span>
      </div>
    </div>
  );
};

export default Card;
