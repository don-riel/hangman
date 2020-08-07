import React, { useState, useEffect } from 'react';

import './letters.style.scss';

function Letter({word, onWrongLetter }) {

    const A = 65;
    const [letters, setLetters] = useState(Array.from({length: 26}, (_, i) => String.fromCharCode(A + i)));

    const removeLetter = (toRemove) => {
        const filteredLetters = letters.filter(letter => letter !== toRemove );
        setLetters(filteredLetters)    
    }

    const removeAndIncreaseWrongCount = (toRemove) => {
        removeLetter(toRemove)
        onWrongLetter()
    }

    const handleClick = (letter, word) => {
        word[0].includes(letter.toLowerCase()) ? removeLetter(letter)  : removeAndIncreaseWrongCount(letter);
    }
    
    return (
        <div className='letters'>          
            {letters.map((letter, i = 0 ) =>
            <li key={i +1} onClick={() => handleClick(letter, word)} >
                {letter.toLowerCase()}
            </li>
            )}
        </div>
    )
}

export default Letter;