import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Card.css';

const Card = ({ card, onClick, handleAnswer, disabled, style, resetCardState }) => {
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

  return (
    <div className="flipping-card" onClick={handleCardClick} style={style}>
      <animated.div
        className="card front"
        style={{
          opacity: opacity.to(o => 1 - o),
          transform,
        }}
      >
        {/* Front content */}
      </animated.div>
      <animated.div
        className="card back"
        style={{
          opacity,
          transform: transform.to(t => `${t} rotateY(180deg)`),
        }}
      >
        <div className="card-content">
          <h3>{card ? card.tema || card.question : '—'}</h3>
          {card && (
            <>
              <p>{answerRevealed && card.answer}</p>
              {card.type === "Questão" && (
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAnswerRevealed(prev => !prev);
                    }}
                  >
                    {answerRevealed ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <button onClick={() => handleAnswer(true)}>Correct</button>
                  <button onClick={() => handleAnswer(false)}>Incorrect</button>
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
