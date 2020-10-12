import React, { useState, useEffect } from 'react';

import HiddenLetter from '../hidden-letters/hidden-letters.component';
import './letters.style.scss';

function Letter({ fetchSucces, word, onWrongLetter, onCorrectLetter }) {

    const A = 65;
    const [letters, setLetters] = useState(Array.from({length: 26}, (_, i) => String.fromCharCode(A + i)));
    const [wordLetterArr, setwordLetterArr] = useState([0]);
    const [hiddenLetterArr, setHiddenLetterArr] = useState([])
    // const [letterCount, setLetterCount] = useState(0);
    // const [uniqueLetters, setUniqueLetters] = useState([]);
    // const [wordLength, setWordLength] = useState([0]);

    useEffect(() => {
        if(word !== null) {
            setwordLetterArr(word[0].split(''))   
        }
    },[word])

    useEffect(() => {
        let arr = [];
        for (let index = 0; index < wordLetterArr.length; index++) {
            arr.push(' __ ')        
        }
        setHiddenLetterArr(arr)
    },[wordLetterArr])



    const removeLetter = (toRemove) => {
        const filteredLetters = letters.filter(letter => letter !== toRemove );
        setLetters(filteredLetters)    
    }

    const removeAndIncreaseWrongCount = (toRemove) => {
        removeLetter(toRemove)
        onWrongLetter()    
    }

    const updateCorrectCount = (toRemove) => {
        onCorrectLetter()
        removeLetter(toRemove)
    }

    const updateHiddenArr = (letter) => {
        let toUpdate = hiddenLetterArr;
        wordLetterArr.forEach((elem,i) => {
           if(elem === letter) {
               toUpdate[i] = letter
           }
        })
        setHiddenLetterArr(toUpdate)     
    }

    
    const handleClick = (letter, word) => {
        word[0].includes(letter.toLowerCase()) ? updateCorrectCount(letter)  : removeAndIncreaseWrongCount(letter);
        updateHiddenArr(letter.toLowerCase())
    }
    
    return (
        <div>
            {
                fetchSucces ? <div>
                <div className='HiddenLetter'>
                    <HiddenLetter  arr={hiddenLetterArr}/> 
                </div>
                <div className='letters'>
                    {letters.map((letter, i = 0 ) =>
                    <li key={i +1} onClick={() => handleClick(letter, word)} >
                        {letter.toLowerCase()}
                    </li>
                    )}
                </div>             
            </div> : <div className='error-info'>
                        <h3>Offline for maintenance.</h3>
                        <p>The random word generator api is under maintenance.</p>
                        <p>Please check back later!</p>
                    </div>
            }
        </div>
        
        
    )
}

export default Letter;