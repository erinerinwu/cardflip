import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import LevelSelector from './components/LevelSelector';
import './App.css'; // Make sure this path is correct

function App() {
  const [level, setLevel] = useState(1);
  const [win, setWin] = useState(false);

  const handleChangeLevel = (newLevel) => {
    console.log(`Changing level to: ${newLevel}`);
    setLevel(newLevel);
    setWin(false); // Reset win state when changing levels
  };

  const handleWin = () => {
    console.log("Win condition met");
    setWin(true); // Set win state to true when the game is won
  };

  const handleNextLevel = () => {
    console.log("Moving to the next level");
    setLevel((prevLevel) => prevLevel + 1);
    setWin(false); // Reset win state for the next level
  };

  console.log(`Current level: ${level}, Win state: ${win}`);

  return (
    <div className="app">
      <div className="app-header" style={{ fontFamily: 'monospace' }}>SIMPLE MEMORY GAME</div>
      <div className="app-level" style={{ fontFamily: 'monospace' }}>Level {level}</div>
      <body>click on any card to start the game </body>
      <LevelSelector onChangeLevel={handleChangeLevel} />
      {!win && <GameBoard level={level} onWin={handleWin} />}
      {win && (
        <div className="modal">
          <div className="modal-content">
            <p style={{ fontFamily: 'monospace' }}>YOU WON!!!</p>
            <button onClick={handleNextLevel} style={{ fontFamily: 'monospace' }}>Next Level</button>
          </div>
        </div>
      )}
      <div className="app-footer" style={{ fontFamily: 'monospace' }}>Created by Erin Wu</div>
    </div>
  );
}

export default App;
