// src/PlayerList.js
import React from 'react';
import './PlayerList.css';

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

const PlayerList = ({ players }) => {
    console.log(players)
  return (
    <div className="playerList">
      <h3>Equipas</h3>
      <table>
        <thead>
          <tr>
            <th>Figura</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td><img src={fruitImages[player.avatar]} alt={player.name} className="avatar"/></td>
              <td>{player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
