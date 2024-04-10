import React from 'react';
import './LevelSelector.css'; // Make sure this path is correct

function LevelSelector({ onChangeLevel }) {
  return (
    <div className="level-selector">
      <button onClick={() => onChangeLevel(1)}>Level 1</button>
      <button onClick={() => onChangeLevel(2)}>Level 2</button>
      <button onClick={() => onChangeLevel(3)}>Level 3</button>
    </div>
  );
}

export default LevelSelector;
