import React from 'react';

import base from '../../assets/images/base.png'
import firstLvl from '../../assets/images/first.png';
import secondLvl from '../../assets/images/second.png';
import thirdLvl from '../../assets/images/third.png';
import fourthLvl from '../../assets/images/fourth.jpg';
import fifthLvl from '../../assets/images/fifth.jpg';
import endLvl from '../../assets/images/complete.png';
import GameOver from '../game-over/game-over.component'

import './image.styles.scss'


function HangmanImage({wrongCount, correctCount, uniqueLetterArr}) {
    
    const count = wrongCount;
    let renderedImage = null;

    switch (count) {
        case 1:
            renderedImage = firstLvl;
            break;
        case 2:
            renderedImage = secondLvl;
            break;
        case 3:
            renderedImage = thirdLvl;
             break;
        case 4:
            renderedImage = fourthLvl;
            break;
        case 5:
            renderedImage = fifthLvl;
            break;
        case 6:
            renderedImage = endLvl;
            break;
        default:
            renderedImage = base;
    }
    //const image = null;
    return (
       <div className='hangman-img-box'>
           <img src={renderedImage} alt=""/>
           {
               wrongCount === 6 ? <GameOver>Game Over!!</GameOver> : ''
           }
           {
               correctCount === uniqueLetterArr.length ? <p>Good Job</p> : ''
           }
       </div>
        
    )
}

export default HangmanImage;