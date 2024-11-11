// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfigurationPage from './pages/ConfigurationPage';
import GamePage from './pages/GamePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConfigurationPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
