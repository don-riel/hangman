import React from 'react';

function Letter({letters, handleClick}) {
    return (
        <div>
            <ul>
                {letters.map(letter =>
            <li key={letter} onClick={() => handleClick(letter)}>
                {letter}
            </li>
            )}
        </ul>
        </div>
    )
}

export default Letter;