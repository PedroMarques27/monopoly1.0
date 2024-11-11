// src/GamePage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import './GamePage.css';
import { decks } from '../components/Decks';

const GamePage = () => {
  const { state } = useLocation();
  const [players, setPlayers] = useState(state.players || []);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [hopCount, setHopCount] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const navigate = useNavigate();

  const hop = async (number) => {
    if (isHopping) return;
    setCardRevealed(false);
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
    setHopCount((prevCount) => prevCount + 1);
    setIsHopping(false);
  };

  const handleLanding = (rowIndex, colIndex) => {
    const availableCards = decks.filter(deck =>
      deck.type === "Curiosidade" || deck.type === "Questão"
    );

    if (availableCards.length > 0) {
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setCurrentCard(randomCard);
      setAnswerRevealed(false);
      setCardRevealed(false);
      setIsQuestionAnswered(false);
    }
  };

  const handleAnswer = (isCorrect) => {
    setIsQuestionAnswered(true);
    if (isCorrect) {
      setCurrentTurn(currentTurn);
    } else {
      let nextTurn = currentTurn + 1;
      if (currentTurn === players.length - 1) nextTurn = 0;
      setCurrentTurn(nextTurn);
    }
  };

  return (
    <div className="game-page">
      <button onClick={() => navigate('/')}>Back to Configuration</button>
      <Board
        players={players}
        currentTurn={currentTurn}
        currentCard={currentCard}
        answerRevealed={answerRevealed}
        cardRevealed={cardRevealed}
        setAnswerRevealed={setAnswerRevealed}
        setCardRevealed={setCardRevealed}
        handleAnswer={handleAnswer}
      />
      <div className="controls">
        <button onClick={() => hop(6)} disabled={isHopping}>Hop 6</button>
        <button onClick={() => hop(3)} disabled={isHopping}>Hop 3</button>
        <p>Hop Count: {hopCount}</p>
      </div>
    </div>
  );
};

export default GamePage;
