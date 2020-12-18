import React from 'react';
import  { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GameCard.css';
import { GamesCatalogConfig } from './GamesCatalog';

export type { GamesCatalogConfig };

function GameCard({ name, description, categories, image, href }: GamesCatalogConfig) {
    const COLOR_CLASSNAMES = ['one', 'two', 'three'];

    return (
        <div className="col">
            <div className="card">
                <img src={image} className="card-img-top" alt="game logo"></img>
                <div className="card-body">
                    <h1 className={"card-title ".concat(COLOR_CLASSNAMES[Math.floor(Math.random()*COLOR_CLASSNAMES.length)]) }>{name}</h1>
                    <p>
                        {categories.map((category, index) => <span key={index} className="btn category">{category}</span>)}
                    </p>
                    <p className="card-text">{description}</p>
                    <Link to={href} className="btn btn-danger">START</Link>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
