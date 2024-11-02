// src/Board.jsx
import React from 'react';
import './Board.css'; // Import the CSS file

const Board = ({ players }) => {
  const rows = 10;
  const columns = 10;

  // Define static colors for border cells
  const borderColors = [
    '#FFB6C1', // Light Pink
    '#FFD700', // Gold
    '#ADFF2F', // Green Yellow
    '#FF69B4', // Hot Pink
    '#B0E0E6', // Powder Blue
    '#FFFACD', // Lemon Chiffon
    '#FFDEAD', // Navajo White
    '#E6E6FA', // Lavender
    '#F5F5DC', // Beige
    '#FFE4E1', // Misty Rose
  ];

  // Create the board grid with player positions
  const board = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => {
      // Check for player presence in the current cell
      const playerAtCell = players.find(player => player.position[0] === rowIndex && player.position[1] === colIndex);
      return playerAtCell ? playerAtCell.name : null; // If a player is in this cell, return their name
    })
  );

  return (
    <div className="board"> {/* Use the CSS class here */}
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isBorderCell =
            rowIndex === 0 ||
            rowIndex === rows - 1 ||
            colIndex === 0 ||
            colIndex === columns - 1;

          // Choose a static color for border cells
          const borderColor = isBorderCell ? borderColors[(rowIndex + colIndex) % borderColors.length] : null;

          return isBorderCell ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell" // Use the CSS class here
              style={{
                backgroundColor: cell ? '#ffcc00' : borderColor, // Highlight if there's a player
              }}
            >
              {cell} {/* Show player's name if present */}
            </div>
          ) : (
            <div key={`${rowIndex}-${colIndex}`} className="emptyCell" /> // Keep empty cells unchanged
          );
        })
      )}
    </div>
  );
};

export default Board;
