import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./GameOverPopup.css";

const GameOverPopup = ({ winnerName }) => {
    const navigate = useNavigate();
    return (
        <div className="game-over-popup">
            <div className="popup-content">
                <h1>{`A Equipa ${winnerName} Ganhou O Rebuliço!`}</h1>
                <p>Muitos Parabéns!</p>
                <button onClick={() => navigate('/')}>Voltar ao Início</button>
            </div>
        </div>
    );
};

export default GameOverPopup;
