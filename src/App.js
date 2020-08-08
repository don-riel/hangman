import React, { useState, useEffect } from 'react';
import './App.scss';


import HangmanImage from './components/image/image.component';
import Word from './components/word/word.component';
import Letter from './components/letters/letter.component';
import NewGameButton from './components/buttons/newGame.button';

function App() {
  const [word, setWord] = useState(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [uniqueLetterArr, setUniqueLetterArr] = useState([0]);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameStatus, setgameStatus] = useState(false);

  useEffect(() => {
    if(word !== null) {
        let arr = word[0].split('');
        let unique = [];
        arr.forEach(element => {
          if(!(unique.includes(element))) {
            unique.push(element)
          }
        });
        setUniqueLetterArr(unique)
    }
    console.log(word)
  },[word])

  useEffect(() => {
    if(wrongCount === 6) {
      setgameStatus(!gameStatus)
    }
  },[wrongCount])

  useEffect(() => {
    if(correctCount === uniqueLetterArr.length) {
      setgameStatus(!gameStatus)
    }
  },[correctCount])

  const fetchWords = async () => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(res => res.json())
    .then(res => setWord(res))
    .catch(() => prompt('Ops something went wrong'))
  }
  
  const increaseCorrectCount = () => {
    setCorrectCount(correctCount + 1)
    console.log(correctCount + 'correct count')
    console.log(uniqueLetterArr.length)
  }
  const increaseWrongCount= () => {
    setWrongCount(wrongCount + 1)
  }

  const toggleGameStatus = () => {
    setgameStatus(!gameStatus)
  }

  const onPlayerReady = () => {
    setgameStatus(!gameStatus)
    setWrongCount(0);
    setCorrectCount(0);
    fetchWords()
  }
  
  return (
    <div className='App'>
      <HangmanImage wrongCount={wrongCount} correctCount={correctCount}  uniqueLetterArr={uniqueLetterArr} />
      {
        gameStatus ?  '' : <Word word={word} />
      }
      {
        gameStatus ? <Letter word={word} onWrongLetter={increaseWrongCount} onCorrectLetter={increaseCorrectCount} /> : <NewGameButton handleCount={onPlayerReady} />
      }        
    </div>
  )
}

export default App;