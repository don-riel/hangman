import React from 'react';

import './letters.style.scss';

function Letter({letters, handleClick}) {
 
    return (
        <div className='letters'>          
            {letters.map(letter =>
            <li key={letter} onClick={(event) => handleClick(event,letter)} >
                {letter.toLowerCase()}
            </li>
            )}
        </div>
    )
}

export default Letter;