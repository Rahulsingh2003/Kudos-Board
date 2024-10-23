import React from 'react';
import './Card.css';

const Card = ({ id, title, tag, userId, users }) => {
  // Access user details based on userId from users map
  const user = users[userId] || { name: 'Unknown User', available: false };

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
      <h2 className="card-title">{title}</h2>
      <div className="card-footer">
        <span className="tag">{tag.join(", ")}</span>
      </div>
    </div>
  );
};

export default Card;
