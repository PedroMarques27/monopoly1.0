import React, { useState } from 'react';
import Board from '../components/Board';
import PlayerList from '../components/PlayerList';
import './GamePage.css';

const GamePage = ({ players }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const handleAnswer = (isCorrect) => {
    // Game logic for handling answers
  };

  return (
    <div className="game-page">
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
      <div className="sidebar">
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default GamePage;
