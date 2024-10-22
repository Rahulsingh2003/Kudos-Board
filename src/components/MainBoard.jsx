import React from 'react';
import CardColumn from './CardColumn';
import "./Board.css"; 

const MainBoard = () => {
  const todoCards = [
    { id: 'CAM-5', image: 'user1.jpg', title: 'Add Multi-Language Support', description: 'Feature Request' },
    { id: 'CAM-8', image: 'user2.jpg', title: 'Create Onboarding Tutorial for New Users', description: 'Feature Request' },
    // more cards...
  ];

  const inProgressCards = [
    { id: 'CAM-3', image: 'user3.jpg', title: 'Optimize Database Queries', description: 'Feature Request' },
    // more cards...
  ];

  const doneCards = [
    { id: 'CAM-6', image: 'user4.jpg', title: 'Enhance Search Functionality', description: 'Feature Request' },
    { id: 'CAM-7', image: 'user5.jpg', title: 'Integrate Third-Party Payment Gateway', description: 'Feature Request' },
    // more cards...
  ];

  return (
    <div className="board">
      <CardColumn title="Todo" cards={todoCards} />
      <CardColumn title="In Progress" cards={inProgressCards} />
      <CardColumn title="Done" cards={doneCards} />
    </div>
  );
};

export default MainBoard;
