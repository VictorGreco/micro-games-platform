import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InGameRanking, { Plays } from './InGameRanking';
import InGameRules from './InGameRules';

export interface GameboardConfig {
    gameId: string;
    mainBoardId: string;
    rules: string
    plays: Plays[];
    children?: any;
}

export default function Gameboard({...props}: GameboardConfig) {

    return (
        <div id={props.gameId} className="gameboard">
        <div className="d-flex justify-content-around row row-cols-1 row-cols-md-4 g-4">
            {props.children}
            <div className="col-md-3 bg-light">
                <InGameRules rules={props.rules}></InGameRules>
                <InGameRanking plays={props.plays}></InGameRanking>
            </div>
        </div>
    </div>
    );
}