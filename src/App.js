import React, { useState, useEffect } from 'react';


import HangmanImage from './components/image/image.component';
import Word from './components/word/word.component';
import Letter from './components/letters/letter.component';
import NewGameButton from './components/buttons/newGame.button';



function App() {
  const A = 65;
  const [word, setWord] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [letters] =  useState(Array.from({length: 26}, (_, i) => String.fromCharCode(A + i)));
  const [playerReady, setPlayerReady] = useState(true);

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(res => res.json())
    .then(res => setWord(res))
  },[playerReady]);
 
  

  const handleClick = (letter, tryCount) => {
    
    console.log(letter);

    //handler if letter exists in the word or not
    if(word != null && word.includes(letter.toLowerCase())) {
      console.log(`${letter} is included`)
    } else (
      setTryCount(tryCount + 1)
      
    )
  }

  const togglePlayerReady = () => {
    setPlayerReady(!playerReady)
  }

  

  const resetTryCount = () => {
    setPlayerReady(!playerReady)
    setTryCount(0);
  }
  
  return (
    <div>
      <HangmanImage tryCount={tryCount}/>
      <Word word={word} />
      {
        playerReady ? <Letter letters={letters} handleClick={handleClick} /> : <NewGameButton handleCount={resetTryCount} />
      }

        
    </div>
  )
}

export default App;