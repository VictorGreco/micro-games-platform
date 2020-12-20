import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Plays {
    player: string;
    score: number | string;
}

interface InGameRankingProps {
    plays: Plays[]
}

export default function InGameRanking({...props}: InGameRankingProps) {
    const topScores = props.plays.slice(0, 4);

    return (
        <div>
            <h1>Top 5 Scores</h1>
            <ul>
                {topScores.map((play: any, index: number) =>
                    <li className="no-styled-list" key={index}>
                        <h3>{play.player}</h3>
                        <p>{play.score}</p>
                    </li>)}
            </ul>
        </div>
    );
}