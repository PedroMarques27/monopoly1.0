// src/Board.jsx

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Board.css';
import '../assets/carta.png';

import apple from '../assets/fruits/apple.png';
import kiwi from '../assets/fruits/kiwi.png';
import orange from '../assets/fruits/orange.png';
import peach from '../assets/fruits/peach.png';
import pear from '../assets/fruits/pear.png';

// Create a mapping of player names to fruit images
const fruitImages = {
  maçã: apple,
  kiwi: kiwi,
  pêssego: peach,
  pera: pear,
  laranja: orange,
};
const spiralNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 
  27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45      // Left Column
];


const Board = ({ players, currentTurn, currentCard, answerRevealed, cardRevealed, setAnswerRevealed, setCardRevealed, handleAnswer }) => {
  // Reset cardRevealed state if currentCard changes
  useEffect(() => {
    if (!currentCard) {
      setCardRevealed(false);
    }
  }, [currentCard, setCardRevealed]);

  // Spring animation for flipping
  const { transform, opacity } = useSpring({
    opacity: cardRevealed ? 1 : 0,
    transform: `rotateY(${cardRevealed ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const rows = 15;
  const columns = 11;
  const borderColors = ["#e9e96a", '#e38d27'];

  const board = Array.from({ length: rows }, (_, rowIndex) =>
  Array.from({ length: columns }, (_, colIndex) => {
    const playerAtCell = players.find(player => player.position[0] === rowIndex && player.position[1] === colIndex);
    return playerAtCell ? playerAtCell.avatar : null;
  })
);

  const handleCardClick = () => {
    if (currentCard) {
      setCardRevealed(prev => !prev);
      if (cardRevealed) {
        setAnswerRevealed(false);
      }
    }
  };
  const getIndex = (rowIndex, colIndex) => {
    if (rowIndex === 0)
    {
      return spiralNumbers[colIndex]
    }
    else if (colIndex === columns-1){
      return spiralNumbers[columns-1+rowIndex];
    }
    else if (rowIndex === rows - 1 ){
      return spiralNumbers[2*columns + rows  - 3 - colIndex];
    }
    return spiralNumbers[2*columns + 2*rows - 4 - rowIndex];
  } 
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isBorderCell =
            rowIndex === 0 || rowIndex === rows - 1 || colIndex === 0 || colIndex === columns - 1;
          const borderColor = isBorderCell ? borderColors[(rowIndex + colIndex) % borderColors.length] : null;
          
          // Determine the spiral number only for border cells
          const spiralIndex = isBorderCell
            ? (rowIndex === 0 ? colIndex :            // Top row
               colIndex === columns - 1 ? rowIndex + 9 : // Right column
               rowIndex === rows - 1 ? 29 - colIndex :   // Bottom row
               38 - rowIndex)                             // Left column
            : null;
          const cellNumber = isBorderCell ? spiralNumbers[spiralIndex] : null;

          let backgroundColor;
          if (isBorderCell) {
            if ((rowIndex === 0 && colIndex === 0) || // top-left corner
                (rowIndex === 0 && colIndex === columns - 1) || // top-right corner
                (rowIndex === rows - 1 && colIndex === 0) || // bottom-left corner
                (rowIndex === rows - 1 && colIndex === columns - 1)) { // bottom-right corner
              backgroundColor = '#a8de6e'; // Green for corner cells
            } else {
              backgroundColor = borderColors[(rowIndex + colIndex) % borderColors.length]; // Other border cells
            }
          }
          

          return isBorderCell ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell `}
              style={{ backgroundColor: backgroundColor}}
            >
               <span className="cell-number">{getIndex(rowIndex, colIndex)}</span> {/* Display cell number */}
              {cell ? <> <img src={fruitImages[cell]} alt={cell} className="player-icon" /></> : null}
            </div>
          ) : (
            rowIndex > 0 && rowIndex < 9 && colIndex > 0 && colIndex < 9 && (
              <div key={`${rowIndex}-${colIndex}`} className="giant-cell">
                <div className="card-placements">
                  <div className="game-title">
                    <h1>ReBuLiÇo dE fRuTaS</h1>
                  </div>

                  {/* Card is always visible but only flips if currentCard is defined */}
                  <div className="flipping-card" onClick={handleCardClick}>
                    {/* Front side of the card */}
                    <animated.div
                      className="card front"
                      style={{
                        opacity: opacity.to(o => 1 - o),
                        transform,
                      }}
                    >
                      {/* Front content can be added here if needed */}
                    </animated.div>

                    {/* Back side of the card */}
                    <animated.div
                      className="card back"
                      style={{
                        opacity,
                        transform: transform.to(t => `${t} rotateY(180deg)`),
                      }}
                    >
                      <div className="card-content">
                        <h3>{currentCard ? currentCard.tema || currentCard.question : '—'}</h3>
                        {currentCard && (
                          <>
                            <p>{answerRevealed && currentCard.answer}</p>
                          
                            {currentCard.type === "Questão" && (
                              <div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAnswerRevealed(prev => !prev);
                                    }}
                                  >
                                    {answerRevealed ? 'Hide Answer' : 'Show Answer'}
                                  </button>
                                <button onClick={() => handleAnswer(true)}>Correct</button>
                                <button onClick={() => handleAnswer(false)}>Incorrect</button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </animated.div>
                  </div>
                </div>
              </div>
            )
          );
        })
      )}
    </div>
  );
};

export default Board;



