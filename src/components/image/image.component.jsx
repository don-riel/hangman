import React from 'react';

function HangmanImage({tryCount}) {
    const count = tryCount;
    let imageTest = null;

    switch (count) {
        case 1:
            imageTest = `Wrong tries = ${count}`
            break;
        case 2:
            imageTest = `Wrong tries = ${count}`
            break;
        case 3:
            imageTest = `Wrong tries = ${count}`
             break;
        case 4:
            imageTest = `Game over!!`
            break;
        default:
            break;
    }
    //const image = null;
    return (
       <div>
           <p>{imageTest}</p>
       </div>
        
    )
}

export default HangmanImage;