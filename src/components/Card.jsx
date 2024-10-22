import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">CAM-11</span>
        <img src="profile-image-url" alt="User Profile" className="profile-image" />
      </div>
      <h2 className="card-title">Conduct Security Vulnerability Assessment</h2>
      <div className="card-footer">
        <div className="status">
          <span className="status-icon">!</span>
        </div>
        <span className="status-label">Feature Request</span>
      </div>
    </div>
  );
};

export default Card;
