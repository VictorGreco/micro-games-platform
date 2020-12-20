import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface EndGameScreenProps {
    hideGameEnd: boolean;
    endGameMessage: string;
    resetGame: Function;
}

export default function EndGameScreen({...props}: EndGameScreenProps) {

    return (
        <div className={props.hideGameEnd ? 'hidden' : ''}>
            <h1>{props.endGameMessage}</h1>
            <button className="btn btn-lg three buzz" onClick={(_) => props.resetGame()}>NEW GAME</button>
        </div>
    );
}