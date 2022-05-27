import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptVal }) {
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);

  const letter = board[attemptVal][letterPosition];

  // boolean logic to see if letter is guessed at the same position it appears in the word
  const correct = correctWord.toUpperCase()[letterPosition] === letter;

  // boolean logic to see if letter is in the word, but not in the correct position
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  // use bool variables to determine id to provide so letter gets colored correctly
  const letterState =
    currentAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  // each time an attempt is submitted, set disabled letters to include incorrectly-guessed letters
  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
