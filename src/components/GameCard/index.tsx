import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/cat-clicker.jpeg';

interface GameCardConfig {
    name: string;
    description: string;
    categories: string[];
    image: string;
    href: string;
}

function GameCard({ name, description, categories, image, href }: GameCardConfig) {

    return (
        <div className="col">
            <div className="card">
                <img src={image} className="card-img-top" alt="game logo"></img>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p>
                        {categories.map((category, index) => <span key={index} className="btn">{category}</span>)}
                    </p>
                    <p className="card-text">{description}</p>
                    <a href={href} className="btn btn-primary">Play</a>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
