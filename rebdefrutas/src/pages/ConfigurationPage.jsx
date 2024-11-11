import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlayer from '../components/AddPlayer';
import PlayerList from '../components/PlayerList';
import './ConfigurationPage.css';

const ConfigurationPage = ({ players, onAddPlayer }) => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (players.length > 0) {
      navigate('/game'); // Move to the game page
    } else {
      alert("Please add at least one player to start the game.");
    }
  };

  return (
    <div className="configuration-page">
      <h2>Game Setup</h2>
      <AddPlayer onAddPlayer={onAddPlayer} />
      <PlayerList players={players} />
      <button className="start-game-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default ConfigurationPage;
