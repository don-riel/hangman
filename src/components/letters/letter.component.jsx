import React, { useState, useEffect } from "react";

import HiddenLetter from "../hidden-letters/hidden-letters.component";
import "./letters.style.scss";

function Letter({ fetchSuccess, word, onWrongLetter, onCorrectLetter }) {
  const A = 65;
  const [letters, setLetters] = useState(
    Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i))
  ); //leters A-Z
  const [wordLetterArr, setwordLetterArr] = useState([0]);
  const [hiddenLetterArr, setHiddenLetterArr] = useState([]);

  useEffect(() => {
    //converts word string into char array
    if (word !== null) {
      setwordLetterArr(word[0].split(""));
    }
  }, [word]);

  useEffect(() => {
    //an array of "__" corresponding to the letters in the word, ex. "hidden" = [ _, _, _, _, _, _ ]
    let arr = [];
    for (let index = 0; index < wordLetterArr.length; index++) {
      arr.push(" __ ");
    }
    setHiddenLetterArr(arr);
  }, [wordLetterArr]);

  const handleClick = (letter) => {
    //check if the clicked letter exists in the word
    word[0].includes(letter.toLowerCase())
      ? updateCorrectCount(letter)
      : removeAndIncreaseWrongCount(letter);
    //correct letter guess, show letter
    updateHiddenArr(letter.toLowerCase());
  };

  //correctly guessed letters are shown from the hidden letters "_,_,d,_,e,n"
  const updateHiddenArr = (letter) => {
    let toUpdate = hiddenLetterArr;
    wordLetterArr.forEach((elem, i) => {
      if (elem === letter) {
        toUpdate[i] = letter;
      }
    });
    setHiddenLetterArr(toUpdate);
  };

  //remove clicked letter from the displayed letter choices
  const removeLetter = (toRemove) => {
    const filteredLetters = letters.filter((letter) => letter !== toRemove);
    setLetters(filteredLetters);
  };

  const removeAndIncreaseWrongCount = (toRemove) => {
    removeLetter(toRemove);
    onWrongLetter();
  };

  const updateCorrectCount = (toRemove) => {
    onCorrectLetter();
    removeLetter(toRemove);
  };

  return (
    <div>
      {fetchSuccess ? (
        <div>
          <div className="HiddenLetter">
            <HiddenLetter arr={hiddenLetterArr} />{" "}
            {/*hidden letters "_ _ _ _ _ _ " */}
          </div>
          <div className="letters">
            {" "}
            {/* letters A-Z*/}
            {letters.map((letter, i = 0) => (
              <li key={i + 1} onClick={() => handleClick(letter)}>
                {letter.toLowerCase()}
              </li>
            ))}
          </div>
        </div>
      ) : (
        "...."
      )}
    </div>
  );
}

export default Letter;
