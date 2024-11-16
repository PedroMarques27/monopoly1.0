// src/AddPlayer.jsx
import React, { useState } from 'react';
import apple from '../assets/fruits/apple.png';
import kiwi from '../assets/fruits/kiwi.png';
import orange from '../assets/fruits/orange.png';
import peach from '../assets/fruits/peach.png';
import pear from '../assets/fruits/pear.png';
import './AddPlayer.css';

// Map of available avatars with Portuguese names
const avatars = {
  maçã: apple,
  kiwi: kiwi,
  pêssego: peach,
  pera: pear,
  laranja: orange,
};

const AddPlayer = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('maçã'); // Default avatar in Portuguese

  const handleAdd = async () => {
    if (playerName.trim()) {
      const newPlayer = {
        name: playerName,
        avatar: selectedAvatar,
        position: [0, 0], // Default starting position
        id: Date.now(),
      };
      await onAddPlayer(newPlayer);
      setPlayerName('');
      setSelectedAvatar('maçã'); // Reset to default
    }
  };

  return (
    <div className="add-player-container">
      
      <div className="input-column">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nome do jogador"
          className="player-input"
        />

        <select
          value={selectedAvatar}
          onChange={(e) => setSelectedAvatar(e.target.value)}
          className="avatar-select"
        >
          {Object.keys(avatars).map((avatarKey) => (
            <option key={avatarKey} value={avatarKey}>
              {avatarKey.charAt(0).toUpperCase() + avatarKey.slice(1)}
            </option>
          ))}
        </select>

        <button onClick={handleAdd} className="add-player-button">Adicionar Equipa</button>
      </div>

      {/* Avatar preview column */}
      <div className="avatar-preview">
        <img src={avatars[selectedAvatar]} alt={selectedAvatar} className="avatar-image" />
      </div>
    </div>
  );
};

export default AddPlayer;
