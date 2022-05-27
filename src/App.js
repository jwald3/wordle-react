import './App.css';
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import GameOver from './components/GameOver'
import { createContext, useEffect, useState } from 'react'
import {boardDefault, generateWordSet} from './words'

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  // attempt: row, letterPos: column
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("")

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    })
  }, [])

  // Event handlers to manage state for <Letter /> components

  // handles action when alphabetical <Letter/> is selected 
  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;

      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setCurrentAttempt({
        ...currentAttempt,
        letterPos: currentAttempt.letterPos + 1,
      });
  }

  // handles action when <Letter/> is selected with the "Delete" class/id/prop
  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
      setBoard(newBoard);
      setCurrentAttempt({
        ...currentAttempt,
        letterPos: currentAttempt.letterPos - 1,
      });
  }

  // handles action when <Letter/> is selected with the "Enter" class/id/prop
  const onEnter = (keyVal) => {
    if (currentAttempt.letterPos !== 5) return;

    // empty string to be populated by letters guessed by the user
    let currWord = "";

    // loop through letters to build guessed word
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i]
    }
    
    // ensures that user input is a word contained in the wordbank
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found")
    }

    // win condition
    if (currWord.toUpperCase() === correctWord.toUpperCase()) {
      setGameOver({gameOver: true, guessedWord: true});
      return
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className="game">
      <AppContext.Provider 
        value={{
          board, 
          setBoard, 
          currentAttempt, 
          setCurrentAttempt, 
          onSelectLetter,
          onEnter, 
          onDelete, 
          correctWord, 
          setDisabledLetters, 
          disabledLetters,
          gameOver, 
          setGameOver
        }} >
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
      </div>
      
    </div>
  )
}

export default App;
