import React from 'react';

function Word({word}) {
    const children = word;
    return (
        <div>
            <p>{children}</p>
        </div>
    )
}

export default Word;