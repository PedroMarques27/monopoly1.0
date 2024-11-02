// src/Hopper.jsx
import React, { useState } from 'react';
import Board from './Board';

const Hopper = () => {
  const [players, setPlayers] = useState([
    { name: 'Player 1', position: [0, 0], id: 1 },
    { name: 'Player 2', position: [0, 0], id: 2 }, // Additional players can be added here
  ]);
  const [currentTurn, setCurrentTurn] = useState(0); // Track current player's turn
  const [hopCount, setHopCount] = useState(0);

  const hop = (number) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      const currentPlayer = newPlayers[currentTurn];
      const originalPosition = currentPlayer.position.slice();

      // Create an array to hold the intermediate positions
      let positionsToVisit = [];
      
      for (let steps = 0; steps < number; steps++) {
        const [row, col] = currentPlayer.position;

        if (row === 0 && col < 9) {
          // Move right across the top row
          currentPlayer.position = [row, col + 1];
        } else if (col === 9 && row < 9) {
          // Move down the right column
          currentPlayer.position = [row + 1, col];
        } else if (row === 9 && col > 0) {
          // Move left across the bottom row
          currentPlayer.position = [row, col - 1];
        } else {
          // Move up the left column
          currentPlayer.position = [row - 1, col];
        }
        
        // Add the new position to the array
        positionsToVisit.push(currentPlayer.position.slice());
      }

      // Animate through each position
      const animateHops = async () => {
        for (const position of positionsToVisit) {
          currentPlayer.position = position;

          // Trigger the hop animation
          setPlayers([...newPlayers]); // Update state to re-render the board

          // Add animation class
          const cells = document.querySelectorAll('.playerName');
          cells.forEach((cell) => {
            if (cell.textContent === currentPlayer.name) {
              cell.classList.add('animate-hop');
              setTimeout(() => {
                cell.classList.remove('animate-hop');
              }, 500); // Duration of the animation
            }
          });

          // Wait for a bit before moving to the next position
          await new Promise(resolve => setTimeout(resolve, 600)); // Duration between hops
        }
      };

      animateHops();

      // Update hop count and switch to the next player after the animation is complete
      setHopCount(hopCount + 1);
      setCurrentTurn((currentTurn + 1) % players.length); // Switch to the next player

      return newPlayers;
    });
  };

  return (
    <div>
      <h1>Hopper</h1>
      <Board players={players} />
      <div>
        <button onClick={() => hop(6)}>Hop 6</button>
        <button onClick={() => hop(3)}>Hop 3</button>
      </div>
      <p>Current Player: {players[currentTurn].name}</p>
      <p>Hop Count: {hopCount}</p>
    </div>
  );
};

export default Hopper;
