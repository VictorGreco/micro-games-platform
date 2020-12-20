import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function InGameRanking({ plays }: any) {

    return (
        <div className="col-md-2 bg-light">
            <h1>User Scores</h1>
            <ul>
                {plays.map((play: any, index: number) =>
                    <li key={index}>
                        <h3>{play.player}</h3>
                        <p>{play.score}</p>
                    </li>)}
            </ul>

        </div>
    );
}

export default InGameRanking;
