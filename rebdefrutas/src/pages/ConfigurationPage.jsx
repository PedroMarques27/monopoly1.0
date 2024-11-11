// src/ConfigurationPage.js
import React, { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import PlayerList from '../components/PlayerList';
import { useNavigate } from 'react-router-dom';

const ConfigurationPage = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const handleAddPlayer = (newPlayer) => setPlayers([...players, newPlayer]);

  const handleStartGame = () => {
    if (players.length > 0) {
      navigate('/game', { state: { players } });
    } else {
      alert("Please add at least one player before starting the game.");
    }
  };

  return (
    <div>
      <h2>Configuration Page</h2>
      <AddPlayer onAddPlayer={handleAddPlayer} />
      <PlayerList players={players} />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default ConfigurationPage;
