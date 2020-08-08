import React from 'react';

import './hidden-letters.styles.scss';

function HiddenLetter({arr}) {
    
    return (
        <div className='hiddenLetters-box'>
            {
               arr.map((elem, i = 0) => 
                   <li key={i + 1}>{elem}</li>
               )
            }
        </div>    
    )
}

export default HiddenLetter;