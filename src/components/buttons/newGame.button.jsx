import React from 'react';

import './button.styles.scss';

function NewGameButton({handleCount, children}) {
    return <button onClick={handleCount}>{children}</button>
}

export default NewGameButton;