// src/GamePage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import './GamePage.css';

const GamePage = () => {
  const { state } = useLocation();
  const rows = 11;
  const columns = 15;
  // Helper function to gather all border cells
  const getBorderCells = () => {
    const borderCells = [];
    for (let i = 1; i < columns-1; i++) borderCells.push([0, i]);  // Top row
    for (let i = 1; i < rows-1; i++) borderCells.push([i, columns - 1]);  // Right column
    for (let i = columns - 2; i >= 1; i--) borderCells.push([rows - 1, i]);  // Bottom row
    for (let i = rows - 2; i >= 1; i--) borderCells.push([i, 0]);  // Left column
    return borderCells;
  };

  const borderCells = getBorderCells();

  // Randomly select white cells with fewer at higher indexes
  const selectWhiteCells = (borderCells) => {
    const whiteCells = [];
    borderCells.forEach((cell, index) => {
      const probability = 0.4 - (index / borderCells.length) * 0.25;  // Decrease probability with higher index
      if (Math.random() < probability) {
        whiteCells.push(cell);
      }
    });
    return whiteCells;
  };

  const whiteCells = selectWhiteCells(borderCells);
  return (
  <div className="game-page">
    <Board players_setup={state.players || []} rows={rows} columns={columns} whiteCells={whiteCells} />
  </div>

  );
};

export default GamePage;
