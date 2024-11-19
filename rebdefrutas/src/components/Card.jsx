import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Card.css';

const Card = ({ card, onClick, handleAnswer, disabled, style, resetCardState, type}) => {
  const [flipped, setFlipped] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: flipped ? `rotateY(180deg)` : `rotateY(0deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    setFlipped(false); // Reset flipped state when resetCardState changes
    setAnswerRevealed(false); // Reset answer revealed state
  }, [resetCardState]);

  const handleCardClick = () => {
    if (disabled) return;
    setFlipped(!flipped);
    onClick();
  };

  const backgroundColor = type === 'Questão' ? '#e9e96a' : '#a8de6e';
  return (
    <div className="flipping-card" onClick={handleCardClick} style={style}>
      <animated.div
        className="card front"
        style={{
          backgroundColor: backgroundColor,
          opacity: opacity.to(o => 1 - o),
          transform,
        }}
      >
        <h1 className="card-title">{type}</h1>
        {/* Front content */}
      </animated.div>
      <animated.div
        className="card back"
        style={{
          backgroundColor: backgroundColor,
          opacity,
          transform: transform.to(t => `${t} rotateY(180deg)`),
        }}
      >
        <div className="card-content">
          <h3>{card ? card.tema || card.question : '—'}</h3>
          {card && (
            <>
            <p className="answer-text">{answerRevealed && card.answer}</p>
            {card.type === "Questão" && (
              <div className="button-group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAnswerRevealed(prev => !prev);
                  }}
                  className="toggle-answer-button"
                >
                  {answerRevealed ? 'Esconder Resposta' : 'Mostrar Resposta'}
                </button>
                <div className="answer-buttons">
                  <button 
                    onClick={() => handleAnswer(true)} 
                    className="answer-button correct"
                  >
                    Correto
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)} 
                    className="answer-button incorrect"
                  >
                    Incorreto
                  </button>
                </div>
              </div>
            )}
          </>
          
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default Card;
