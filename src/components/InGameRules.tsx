import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface rules {
    rules: string;
}

function InGameRanking({ rules }: rules) {

    return (
        <div className="col-md-3 bg-light">
            <h1>Rules</h1>
            <p>{rules}</p>
        </div>
    );
}

export default InGameRanking;
