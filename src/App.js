import React from 'react';
import GameBoard from './GameBoard'; // Ensure the path matches where your GameBoard component is located
import './App.css'; // Assuming you have some global styles you want to apply

function App() {
  return (
    <div className="App">
        <h1>Snake Game</h1>
      <main>
        <GameBoard />
      </main>
    </div>
  );
}

export default App;
