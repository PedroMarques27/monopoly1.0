import React, { useState, useEffect, memo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Dice from './Dice';
import Card from './Card';
import './Board.css';
import '../assets/carta.png';
import { decks } from './decks';

import apple from '../assets/fruits/apple.png';
import kiwi from '../assets/fruits/kiwi.png';
import orange from '../assets/fruits/orange.png';
import peach from '../assets/fruits/peach.png';
import pear from '../assets/fruits/pear.png';

const fruitImages = {
  maçã: apple,
  kiwi: kiwi,
  pêssego: peach,
  pera: pear,
  laranja: orange,
};

const spiralNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49
];
const Board = ({ players_setup, rows, columns, whiteCells }) => {
  const [players, setPlayers] = useState(players_setup);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isBonus, setIsBonus] = useState(false)
  const [hopCount, setHopCount] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [canRoll, setCanRoll] = useState(true);
  const [cardsDisabled, setCardsDisabled] = useState(true); // New state variable to control card disabled status

  useEffect(() => {
    if (!currentCard) {
      setCardRevealed(false);
    }
  }, [currentCard]);

  const board = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => {
      const playerAtCell = players.find(player => player.position[0] === rowIndex && player.position[1] === colIndex);
      return playerAtCell ? playerAtCell.avatar : null;
    })
  )

  const handleLanding = (rowIndex, colIndex) => {
    const isCornerCell =
    (rowIndex === 0 && colIndex === 0) ||
    (rowIndex === 0 && colIndex === columns - 1) ||
    (rowIndex === rows - 1 && colIndex === 0) ||
    (rowIndex === rows - 1 && colIndex === columns - 1);
    const isWhiteCell = whiteCells.some(
      ([whiteRow, whiteCol]) => whiteRow === rowIndex && whiteCol === colIndex
    );
    if (isWhiteCell || isBonus ) {
      setCurrentCard(null); // No card on white cells
      setCardsDisabled(true); // Disable cards on white cells
      setCanRoll(true);
      setIsBonus(true);
      handleAnswer(true);
      return;
    }
   

    const availableCards = isCornerCell
      ? decks.filter(deck => deck.type === "Curiosidade")
      : decks.filter(deck => deck.type === "Questão");

    if (availableCards.length > 0) {
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setCurrentCard(randomCard);
      setAnswerRevealed(false);
      setCardRevealed(false);
      setIsQuestionAnswered(false);
      setCardsDisabled(false); // Enable cards on non-white cells
      setCanRoll(randomCard.type === "Curiosidade");
      if (isCornerCell){
        let nextTurn = currentTurn + 1;
        if (currentTurn === players.length - 1) nextTurn = 0;
        setCurrentTurn(nextTurn);
        return;
      } 
    } else {
      setCurrentCard(null);
      setCardsDisabled(true); // Disable cards if no card is available
      setCanRoll(false);
    }
  };

  const handleCardClick = () => {
    if (currentCard && !cardsDisabled) {  // Only allow clicking if cards are enabled
      setCardRevealed(prev => !prev);
     
      if (cardRevealed) {
        setAnswerRevealed(false);

      }
    }
  };


  const getIndex = (rowIndex, colIndex) => {
    if (rowIndex === 0) {
      return spiralNumbers[colIndex];
    } else if (colIndex === columns - 1) {
      return spiralNumbers[columns - 1 + rowIndex];
    } else if (rowIndex === rows - 1) {
      return spiralNumbers[2 * columns + rows - 3 - colIndex];
    }
    return spiralNumbers[2 * columns + 2 * rows - 4 - rowIndex];
  };

  const hop = async (number) => {
    if (isHopping) return;
    setHopCount((prevCount) => prevCount + 1);
    setCardRevealed(false);  // Reset card revealed state
    setAnswerRevealed(false);  // Reset answer revealed state
    setIsQuestionAnswered(false);  // Reset question answered state
    setIsHopping(true);
    const newPlayers = [...players];
    const currentPlayer = newPlayers[currentTurn];
  
    const hopThroughPositions = async () => {
      let [row, col] = currentPlayer.position;
  
      for (let steps = 0; steps < number; steps++) {
        if (row === 0 && col < 14) {
          col += 1;
        } else if (col === 14 && row < 10) {
          row += 1;
        } else if (row === 10 && col > 0) {
          col -= 1;
        } else if (col === 0 && row > 0) {
          row -= 1;
        }
  
        currentPlayer.position = [row, col];
        setPlayers([...newPlayers]);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      handleLanding(row, col);
    };
  
    await hopThroughPositions();
    setIsHopping(false);
  };



  const handleAnswer = (isCorrect) => {
    setIsQuestionAnswered(true);
    setCanRoll(true); 
    console.log(currentTurn)
    if (isCorrect && !isBonus) {
      setCurrentTurn(currentTurn);
      setIsBonus(true);
    } else {
      let nextTurn = currentTurn + 1;
      if (currentTurn === players.length - 1) nextTurn = 0;
      setCurrentTurn(nextTurn);
      console.log(currentTurn)
      setIsBonus(false);
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isBorderCell =
              rowIndex === 0 || rowIndex === rows - 1 || colIndex === 0 || colIndex === columns - 1;
            const isWhiteCell = whiteCells.some(
                ([whiteRow, whiteCol]) => whiteRow === rowIndex && whiteCol === colIndex
              );
            let backgroundColor;
            if (isWhiteCell) {
              backgroundColor = '#e38d27';
            } else if (isBorderCell) {
              if ((rowIndex === 0 && colIndex === 0) ||
                  (rowIndex === 0 && colIndex === columns - 1) ||
                  (rowIndex === rows - 1 && colIndex === 0) ||
                  (rowIndex === rows - 1 && colIndex === columns - 1)) {
                backgroundColor = '#a8de6e';
              } else {
                backgroundColor = "#e9e96a";
              }
            }

            return isBorderCell || isWhiteCell ? (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell`}
                style={{ backgroundColor: backgroundColor }}
              >
                <span className="cell-number">{getIndex(rowIndex, colIndex) - 1} </span>
                {cell ? <img src={fruitImages[cell]} alt={cell} className="player-avatar" /> : null}
              </div>
            ) : (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell`}
              >
                {cell && <img className="player-avatar" src={cell} alt="avatar" />}
              </div>
            );
          })
        )}
      </div>

      {/* Controls Section */}
      <div className="controls-container">
        <div className="controls">
          <Card 
            card={currentCard} 
            onClick={handleCardClick} 
            handleAnswer={handleAnswer} 
            resetCardState={hopCount} 
            disabled={isHopping || currentCard?.type === "Questão"} 
            style={(cardsDisabled || isHopping || currentCard?.type === "Questão") ? { opacity: 0.5, pointerEvents: 'none' } : {}}
  
          />
          <Dice canRoll={canRoll} onRoll={hop}/>
          <Card 
            card={currentCard} 
            onClick={handleCardClick} 
            handleAnswer={handleAnswer} 
            disabled={isHopping || currentCard?.type === "Curiosidade"} 
            resetCardState={hopCount} 
            style={(cardsDisabled || isHopping || currentCard?.type === "Curiosidade") ? { opacity: 0.5, pointerEvents: 'none' } : {}}

          />
        </div>
      </div>


    </div>
  );
};

export default memo(Board);
