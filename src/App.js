import React, { useState, useEffect } from "react";
import "./App.scss";

import Header from "./components/header/header.component";
import HangmanImage from "./components/image/image.component";
import Word from "./components/word/word.component";
import Letter from "./components/letters/letter.component";
import NewGameButton from "./components/buttons/newGame.button";

function App() {
  const [word, setWord] = useState(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [uniqueLetterArr, setUniqueLetterArr] = useState([0]);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameStatus, setgameStatus] = useState(false);
  const [fetchSuccesful, setFetchSuccesful] = useState(null);

  //start game
  const onPlayerReady = () => {
    setgameStatus(!gameStatus);
    setWrongCount(0);
    setCorrectCount(0);
    fetchWords();
  };

  //fetch random word
  const fetchWords = async () => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((res) => res.json())
      .then((res) => {
        //store random word in state and update fethSuccessful
        setWord(res);
        setFetchSuccesful(true);
      })
      .catch(() => {
        setFetchSuccesful(false);
      });
  };

  useEffect(() => {
    if (word !== null) {
      //convert the random word string into char array
      let arr = word[0].split("");

      //grab and store the unique letters in an array
      let unique = [];
      arr.forEach((element) => {
        if (!unique.includes(element)) {
          unique.push(element);
        }
      });

      //update unique letter state
      setUniqueLetterArr(unique);
    }
  }, [word]); //listens if word is updated

  

  const increaseCorrectCount = () => {
    setCorrectCount(() => (correctCount + 1));
    if (correctCount === uniqueLetterArr.length -1) { // used "uniqueLetterArr.length -1" because updating setCorrectCount is async
      setgameStatus(!gameStatus);                     //alternative is to use useEffect
    }
  };

  const increaseWrongCount = () => {
    setWrongCount(wrongCount + 1);
    if (wrongCount === 5) {   //accepted wrong count 6, setWrongCount is async so 5 is used, alternative is using useEffect
      setgameStatus(!gameStatus);
    }
  };

  

  return (
    <div className="App">
      <Header />
      <HangmanImage
        wrongCount={wrongCount}
        correctCount={correctCount}
        uniqueLetterArr={uniqueLetterArr}
      />
      {gameStatus ? "" : <Word word={word} />}

      {gameStatus ? (
        <Letter
          fetchSuccess={fetchSuccesful}
          word={word}
          onWrongLetter={increaseWrongCount}
          onCorrectLetter={increaseCorrectCount}
        />
      ) : (
        <NewGameButton handleCount={onPlayerReady}>New Game</NewGameButton>
      )}

      {fetchSuccesful === false ? (
        <div className="error-info">
          <h3>Offline for maintenance.</h3>
          <p>The random word generator api is under maintenance.</p>
          <p>Please check back later!</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
