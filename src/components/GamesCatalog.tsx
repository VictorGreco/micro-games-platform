import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import hangman from '../resources/hangman.png';
import catClicker from '../resources/cat-clicker.jpeg';
import speedClicker from '../resources/speed-clicker.png';
import memory from '../resources/memory.png';
import GameCard from './GameCard';

export interface GamesCatalogConfig {
    name: string;
    description: string;
    categories: string[];
    image: string;
    href: string
}

export const fullGamesCatalog: GamesCatalogConfig[] = [{
    name: 'Hangman',
    description: 'In this game you will play Hangman in which you will have to discover the hidden word by choosing letters.',
    categories: ['single player', 'old-fashion', 'intelect'],
    image: hangman,
    href: '/hangman'
},
{
    name: 'Cat Catcher',
    description: 'This game consists of measuring the number of clicks you can make in a 10 second period. In hard mode the box to click moves randomly',
    categories: ['single player', 'speed', 'clicker'],
    image: catClicker,
    href: '/cat-clicker'
},
{
    name: 'Speed Clicker',
    description: 'The game will have a “Start Game” button that, once pressed, will display a message on the screen with the text of “Get ready...”',
    categories: ['single player', 'speed', 'clicker'],
    image: speedClicker,
    href: '/speed-clicker'
},
{
    name: 'Memory',
    description: 'In this game you must test your memory. You will have 16 images, of which half are repeated, so that each image will have its identical partner. Are you ready ?',
    categories: ['single player', 'old-fashion', 'memory'],
    image: memory,
    href: '/memory'
}];

function GamesCatalog({ gamesCatalog }: any): JSX.Element {
    return (
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {gamesCatalog.map((gameCatalog: GamesCatalogConfig, index: number) =>
                <GameCard key={index} {...gameCatalog} ></GameCard>)}
        </div>
    );
}

export default GamesCatalog;