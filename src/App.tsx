import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/GameCard/index';
import GameCard from './components/GameCard/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import hangman from './resources/hangman.png';
import catClicker from './resources/cat-clicker.jpeg';
import speedClicker from './resources/speed-clicker.png';
import memory from './resources/memory.jpeg';

const GAMES_CATALOG = [{
  name: 'Hangman',
  description: 'In this game you will play Hangman in which you will have to discover the hidden word by choosing letters.',
  categories: ['single-player', 'old-fashion', 'intelect'],
  image: hangman,
  href: '/hangman'
},
{
  name: 'Cat Catcher',
  description: 'This game consists of measuring the number of clicks you can make in a 10 second period. In hard mode the box to click moves randomly',
  categories: ['single-player', 'speed', 'clicker'],
  image: catClicker,
  href: '/cat-clicker'
},
{
  name: 'Speed Clicker',
  description: 'The game will have a “Start Game” button that, once pressed, will display a message on the screen with the text of “Get ready...” for a random amount of seconds (from 0 to 10 seconds) and then it displays a “Stop game” button that you will have to press as quickly as you can to measure the time it takes you to press the button, this way you can measure your reaction time.',
  categories: ['single-player', 'speed', 'clicker'],
  image: speedClicker,
  href: '/speed-clicker'
},
{
  name: 'Memory',
  description: 'In this game you must test your memory. In order to develop the game you will need 16 images, of which half will be repeated, so that each image will have its identical partner.',
  categories: ['single-player', 'old-fashion', 'memory'],
  image: memory,
  href: '/memory'
}]

function App() {
  return (
    <div className="App">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {GAMES_CATALOG.map((info, index) => <GameCard key={index} {...info} ></GameCard>)}
      </div>
    </div>
  );
}

export default App;
