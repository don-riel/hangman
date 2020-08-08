import React, { useState, useEffect } from 'react';
import './App.scss';


import HangmanImage from './components/image/image.component';
import Word from './components/word/word.component';
import Letter from './components/letters/letter.component';
import NewGameButton from './components/buttons/newGame.button';

function App() {
  const [word, setWord] = useState(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [playerStatus, setplayerStatus] = useState(false);

  useEffect(() => {
    if(wrongCount === 6) {
      setplayerStatus(!playerStatus)
    }
  },[wrongCount])

  const fetchWords = async () => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(res => res.json())
    .then(res => setWord(res))
  }
  
  const increasewrongCount= () => {
    setWrongCount(wrongCount + 1)
    console.log(wrongCount)
  }

  const onPlayerReady = () => {
    setplayerStatus(!playerStatus)
    setWrongCount(0);
    fetchWords()
  }
  
  return (
    <div className='App'>
      <HangmanImage wrongCount={wrongCount} />
      <Word word={word} />
      {
        playerStatus ? <Letter word={word} onWrongLetter={increasewrongCount} /> : <NewGameButton handleCount={onPlayerReady} />
      }        
    </div>
  )
}

export default App;