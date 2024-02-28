import React, { useState, useEffect } from 'react';
import './GameBoard.css';

const GameBoard = () => {
  const numRows = 20;
  const numCols = 20;
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateRandomFood());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Function to generate food in a position not occupied by the snake
  function generateRandomFood() {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * numCols),
        y: Math.floor(Math.random() * numRows)
      };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    return newFoodPosition;
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) {
      alert(`Game Over. Your score: ${score}`);
      return;
    }

    const moveSnake = () => {
      setSnake((prevSnake) => {
        let head = prevSnake[0];
        let newHead = { ...head };

        switch (direction) {
          case 'UP':
            newHead.y -= 1;
            break;
          case 'DOWN':
            newHead.y += 1;
            break;
          case 'LEFT':
            newHead.x -= 1;
            break;
          case 'RIGHT':
            newHead.x += 1;
            break;
          default:
            break;
        }

        if (newHead.x >= numCols) newHead.x = 0;
        else if (newHead.x < 0) newHead.x = numCols - 1;
        if (newHead.y >= numRows) newHead.y = 0;
        else if (newHead.y < 0) newHead.y = numRows - 1;

        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateRandomFood()); // Generate new food position
          setScore(prevScore => prevScore + 0.5); // Increase score
          return [newHead, ...prevSnake]; // Grow the snake without removing the last segment
        }

        return [newHead, ...prevSnake.slice(0, prevSnake.length - 1)];
      });
    };

    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [direction, food, numCols, numRows, gameOver, score, snake]);

  if (gameOver) {
    return <div className="game-over">Game Over! Refresh to play again.</div>;
  }

  return (
    <div>
      <div className="score">Score: {score}</div>
      <div className="game-board">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: numCols }).map((_, colIndex) => {
              const isSnakePart = snake.some(segment => segment.x === colIndex && segment.y === rowIndex);
              const isFood = food.x === colIndex && food.y === rowIndex;
              return (
                <div key={colIndex} className={`cell ${isSnakePart ? 'snake' : ''} ${isFood ? 'food' : ''}`}></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
