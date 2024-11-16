import React, { useState, useEffect } from 'react';
import './Dice.css';
import { useNavigate } from 'react-router-dom';
// Import all dice face images
import diceGame from '../assets/dice/dice-game.gif';
import dice1 from '../assets/dice/dice-roll-1.gif';
import dice2 from '../assets/dice/dice-roll-2.gif';
import dice3 from '../assets/dice/dice-roll-3.gif';
import dice4 from '../assets/dice/dice-roll-4.gif';
import dice5 from '../assets/dice/dice-roll-5.gif';
import dice6 from '../assets/dice/dice-roll-6.gif';

import static1 from '../assets/dice/dice-static-1.gif';
import static2 from '../assets/dice/dice-static-2.gif';
import static3 from '../assets/dice/dice-static-3.gif';
import static4 from '../assets/dice/dice-static-4.gif';
import static5 from '../assets/dice/dice-static-5.gif';
import static6 from '../assets/dice/dice-static-6.gif';

// Map of dice face images to respective values
const diceFaces = [dice1, dice2, dice3, dice4, dice5, dice6];
const staticFaces = [static1, static2, static3, static4, static5, static6];

const Dice = ({ onRoll, canRoll, currentPlayer }) => {
  const [diceFace, setDiceFace] = useState(diceGame);
  const [rolling, setRolling] = useState(false);
  const [genNumber, setGenNumber] = useState(0);
  const [showText, setShowText] = useState("");
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const navigate = useNavigate();

  const handleRoll = () => {
    if (!canRoll || rolling) return;

    setRolling(true); // Start rolling
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    // Display rolling animation
    setDiceFace(diceFaces[randomNumber - 1]);

    // Call the onRoll callback with the random number
    onRoll(randomNumber);

    // Set the generated number but don't change the text yet
    setGenNumber(randomNumber);

    // Set timeout to revert to the static dice image after the roll
    setTimeout(() => {
      setDiceFace(staticFaces[randomNumber - 1]);
      setRolling(false); // Stop rolling after the animation
    }, 1500); // Adjusted to match the typical dice roll duration
  };

  // Revert to static dice image when canRoll changes
  useEffect(() => {
    if (canRoll) {
      setDiceFace(dice1);
    }
  }, [canRoll]);

  // Trigger animation every time genNumber changes
  useEffect(() => {
    // Trigger animation reset
    setTriggerAnimation(false); 
    const timeout = setTimeout(() => {
      setTriggerAnimation(true); // Trigger animation
    }, 50); // Small delay to ensure reset occurs before triggering animation

    return () => clearTimeout(timeout); // Clean up timeout
  }, [genNumber]); // Runs every time genNumber changes

  // Update text after animation completes (after 500ms)
  useEffect(() => {
    if (triggerAnimation && genNumber!== 0) {
      const timeout = setTimeout(() => {
        setShowText(`Calhou: ${genNumber}`); // Change the text after animation
      }, 500); // Delay the text change after animation duration (500ms)

      return () => clearTimeout(timeout);
    }
  }, [triggerAnimation, genNumber]); // Wait for animation trigger and number change

  return (
    <div className="center-block">
      <div className="information">
        <h1 className="information__game-name">RebuLiço de Frutas</h1>
        <h2>É a vez da Equipa {currentPlayer.name}</h2>
        <button className="information__back-button" onClick={() => navigate('/')}>
          Abandonar Jogo
        </button>
      </div>
      <img
        src={diceFace}
        alt="Dice"
        onClick={handleRoll}
        style={{ cursor: canRoll && !rolling ? 'pointer' : 'default' }}
        className="dice"
      />
      <h2 className={`generated-number ${triggerAnimation ? 'fade-in-trigger' : 'fade-in-reset'}`}>
        {genNumber !== 0 ? showText : "Gira o Dado"}
      </h2>
    </div>
  );
};

export default Dice;
