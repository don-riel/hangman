import React from 'react';

import './word.styles.scss';

function Word({word}) {
  
    return (
        <div>
            <p className='word'>{word}</p>
        </div>
    )
}

export default Word;