// src/GamePage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import './GamePage.css';

const GamePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="game-page">
      <button onClick={() => navigate('/')}>Back to Configuration</button>
      <Board players_setup={state.players || []} />
    </div>
  );
};

export default GamePage;
