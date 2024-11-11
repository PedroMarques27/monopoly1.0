import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfigurationPage from './pages/ConfigurationPage';
import GamePage from './pages/GamePage';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ConfigurationPage players={players} onAddPlayer={handleAddPlayer} />}
        />
        <Route
          path="/game"
          element={<GamePage players={players} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
