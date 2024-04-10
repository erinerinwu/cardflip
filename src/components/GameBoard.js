import React, { useState, useEffect } from 'react';
import Card from './Card';
import './GameBoard.css'; // Make sure this path is correct

function GameBoard({ level, onWin }) {
  const [cards, setCards] = useState([]);
  const [flips, setFlips] = useState([]);

  useEffect(() => {
    const initializedCards = initializeCards(level);
    setCards(initializedCards);
    setFlips([]);
  }, [level]);

  const initializeCards = (level) => {
    // Determine the number of pairs needed based on the level
    let pairs = 3; // default for level 1
    if (level === 2) {
      pairs = 4; // 4 pairs for a 4x2 grid
    } else if (level === 3) {
      pairs = 6; // 6 pairs for a 4x3 grid
    }

    const initialValues = ['❤️', '⭐', '🔵', '◼️', '🔶', '🔺']; // values for cards
    let initializedCards = [];
    for (let i = 0; i < pairs; i++) {
      // create two cards for each value
      initializedCards.push({ id: i * 2, value: initialValues[i % initialValues.length], isFlipped: false });
      initializedCards.push({ id: i * 2 + 1, value: initialValues[i % initialValues.length], isFlipped: false });
    }

    // Shuffle the cards
    initializedCards.sort(() => Math.random() - 0.5);
    return initializedCards;
  };

  const handleClick = (id) => {
    // Do nothing if the card is already flipped or two cards are flipped
    if (flips.includes(id) || flips.length === 2) {
      return;
    }

    const newFlips = [...flips, id];
    setFlips(newFlips);

    if (newFlips.length === 2) {
      const [firstCardId, secondCardId] = newFlips;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.value === secondCard.value) {
        // Cards match, keep them flipped
        setCards(prevCards => {
          const updatedCards = prevCards.map(card => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, isFlipped: true };
            }
            return card;
          });
          
          // Moved check for win condition here inside the setState callback
          // This ensures it's checked after the state has actually been updated
          const allFlipped = updatedCards.every(card => card.isFlipped);
          if (allFlipped) {
            onWin(); // Notify parent component of win
          }
          
          return updatedCards;
        });
      
        setFlips([]);
      } else {
        // No match, flip them back after a delay
        setTimeout(() => {
          setFlips([]);
        }, 1000);
      }
      
    }
  };


  const levelClass = `level-${level}`; // This will create a string like 'level-1', 'level-2', or 'level-3'

  return (
    <div className={`game-board ${levelClass}`}>
      {cards.map(card => (
        <Card 
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={card.isFlipped || flips.includes(card.id)}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;
