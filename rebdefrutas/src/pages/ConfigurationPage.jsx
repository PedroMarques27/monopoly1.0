// src/ConfigurationPage.js
import React, { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import PlayerList from '../components/PlayerList';
import { useNavigate } from 'react-router-dom';
import "./ConfigurationPage.css";

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
    <div className="configuration-page">
      <h2 className="configuration-page__header">Configuration Page</h2>
      <div className="configuration-page__add-player-container">
        <AddPlayer onAddPlayer={handleAddPlayer} />
      </div>
      <div className="configuration-page__player-list-container">
        <PlayerList players={players} />
      </div>
      <button className="configuration-page__button" onClick={handleStartGame}>Start Game</button>

      <div className="configuration-page__rules-section">
        <h3 className="configuration-page__rules-header">Instruções</h3>
        <p className="configuration-page__rules-text">
          Prontos para começar o rebuliço?
        </p>
        <p className="configuration-page__rules-text">
          O Jogo “reBuliÇO dE FruTaS” é muito simples e perfeito para as tardes de domingo em família! Para começarem, apenas precisam de se dividir em equipas, atribuindo-lhes um nome original, carregam no “Começar” e ficam prontos para entrarem nesta aventura!
        </p>
        <ul className="configuration-page__rules-list">
          <li className="configuration-page__rules-list-item">Começando o jogo, cada equipa lança o dado e quem tiver o número mais alto, começa.</li>
          <li className="configuration-page__rules-list-item">O dado é lançado e a equipa jogadora avança as casas sugeridas pelo dado.</li>
          <li className="configuration-page__rules-list-item">Se avançar até uma casa com Pergunta, a equipa responde a essa pergunta:</li>
          <ul>
            <li className="configuration-page__rules-list-item">Caso a equipa acerte, poderá lançar uma última vez o dado até passar para a equipa seguinte;</li>
            <li className="configuration-page__rules-list-item">Caso não acerte, permanece no mesmo lugar e passa o dado para a equipa seguinte.</li>
          </ul>
          <li className="configuration-page__rules-list-item">Se calhar numa casa com Curiosidade, pode lançar uma última vez o dado até passar para a equipa seguinte;</li>
          <li className="configuration-page__rules-list-item">Se calhar numa casa em branco, passa automaticamente o dado para a equipa seguinte.</li>
          <li className="configuration-page__rules-list-item">O jogo continua até alguma das equipas voltar ao ponto de partida.</li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigurationPage;
