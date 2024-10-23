import React from 'react';
import Card from './Card';
import './Board.css';

const CardColumn = ({ title, cards, users }) => {
  return (
    <div className="column">
      <h3 className="column-title">{title}</h3>
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} {...card} users={users} />
        ))}
      </div>
    </div>
  );
};

export default CardColumn;
