import React, { useState, useEffect } from 'react';
import './App.scss';


import HangmanImage from './components/image/image.component';
import Word from './components/word/word.component';
import Letter from './components/letters/letter.component';
import NewGameButton from './components/buttons/newGame.button';



function App() {
  const A = 65;
  const [letters] =  useState(Array.from({length: 26}, (_, i) => String.fromCharCode(A + i)));
  const [word, setWord] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [playerReady, setPlayerReady] = useState(true);


  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(res => res.json())
    .then(res => setWord(res)
    )
  },[playerReady]);

  //handlers when letter clicked exists or not in the word
  const true_LetterHandler = (event) => { 
    event.target.className = 'lineThrough';
  }

  const false_LetterHandler = (event) => { 
    setTryCount(tryCount + 1);
    event.target.className = 'lineThrough';
    console.dir(event.target)
    
  }
  
  const handleClick = (event,letter) => {
    word[0].includes(letter.toLowerCase()) ?  true_LetterHandler(event)  : false_LetterHandler(event) ;
  }

  const togglePlayerReady = () => {
    setPlayerReady(!playerReady)
  }

  const resetTryCount = () => {
    setPlayerReady(!playerReady)
    setTryCount(0);
  }
  
  return (
    <div className='App'>
      <HangmanImage tryCount={tryCount} />
      <Word word={word} />
      {
        playerReady ? <Letter letters={letters} handleClick={handleClick} /> : <NewGameButton handleCount={resetTryCount} />
      }        
    </div>
  )
}

export default App;