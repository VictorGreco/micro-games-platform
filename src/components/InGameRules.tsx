import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface rules {
    rules: string;
}

function InGameRanking({ rules }: rules) {

    return (
        <div>
            <h1>Rules</h1>
            <p>{rules}</p>
        </div>
    );
}

export default InGameRanking;
