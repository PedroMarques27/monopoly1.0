import React, { useState, useEffect } from 'react';

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

const Dice = ({ onRoll, canRoll }) => {
  const [diceFace, setDiceFace] = useState(diceGame);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    if (!canRoll || rolling) return;

    setRolling(true); // Start rolling
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    // Display rolling animation
    setDiceFace(diceFaces[randomNumber - 1]);

    // Call the onRoll callback with the random number
    onRoll(randomNumber);

    // Set a timeout to revert to the static dice image after 1.5s
    setTimeout(() => {
      setDiceFace(staticFaces[randomNumber - 1]);
      setRolling(false); // Stop rolling after the animation
    }, 3000); // Adjusted to match the typical dice roll duration
  };

  // Revert to static dice image when canRoll changes
  useEffect(() => {
    if (canRoll) {
      setDiceFace(diceGame);
    }
  }, [canRoll]);

  return (
    <img
      src={diceFace}
      alt="Dice"
      onClick={handleRoll}
      style={{ cursor: canRoll && !rolling ? 'pointer' : 'default', border: "2px solid red" }}
      className="dice"
    />
  );
};

export default Dice;
