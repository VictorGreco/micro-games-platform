import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import GamesCatalog, { GamesCatalogConfig, fullGamesCatalog } from './GamesCatalog';
import TopNavbar from './TopNavbar';


function Home() {
    const [word, setWord] = useState("");
    const [gamesCatalog] = useState(fullGamesCatalog);
    const [filterDisplay, setFilterDisplay]: [GamesCatalogConfig[], any] = useState([]);

    const handleChange = (_: any): void => {
        setWord(_);

        let oldList: GamesCatalogConfig[] = gamesCatalog.map((game: GamesCatalogConfig) => {
            return {
                name: game.name.toLowerCase(),
                description: game.description.toLowerCase(),
                categories: game.categories,
                image: game.image,
                href: game.href
            };
        });

        if (word !== "") {
            let filteredList = oldList.filter((game: GamesCatalogConfig) =>
                game.name.includes(word.toLowerCase()));

            if (filteredList.length < 1) {
                filteredList = oldList.filter((game: GamesCatalogConfig) =>
                    game.description.includes(word.toLowerCase()))
            };

            setFilterDisplay(filteredList);
        } else {
            setFilterDisplay(gamesCatalog);
        };
    };

    return (
        <div>
            <TopNavbar value={word} handleChange={handleChange}></TopNavbar>
            <GamesCatalog gamesCatalog={word.length < 1 ? gamesCatalog : filterDisplay} ></GamesCatalog>
        </div>
    );
}

export default Home;
