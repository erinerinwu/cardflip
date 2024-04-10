import React from 'react';
import './Card.css'; // Make sure this path is correct

function Card({ id, value, isFlipped, handleClick }) {
  const handleClickInternal = () => {
    if (!isFlipped) {
      handleClick(id);
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClickInternal}>
      <div className="card-content">
        {isFlipped ? value : ''}
      </div>
    </div>
  );
}

export default Card;
