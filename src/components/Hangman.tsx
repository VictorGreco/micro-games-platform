import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InGameRanking from './InGameRanking';
import InGameRules from './InGameRules';
import '../index.css';

interface Plays {
    player: string;
    score: string;
}
interface HangmanProps { }
interface HangmanState {
    plays: Plays[];
    rules: string;
    playerName: string;
    hideUserName: boolean;
    hideGameboard: boolean;
    hideGameEnd: boolean;
    word: string;
    availableLetters: string[];
    usedLetters: string[];
    errors: number;
    endGameMessage: string;
}

const WORDS: string[] = ['fridge', 'potatoe', 'bread', 'cookie'];

class Hangman extends React.Component<HangmanProps, HangmanState> {
    constructor(props: HangmanProps) {
        super(props);
        this.state = {
            plays: [],
            rules: 'Those are the rules of this game !',
            playerName: '',
            hideUserName: false,
            hideGameboard: true,
            hideGameEnd: true,
            word: 'mulan',
            availableLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            usedLetters: [],
            errors: 0,
            endGameMessage: ''
        };
    }

    handleChange(e: any) {
        e.preventDefault();
        this.setState({
            playerName: e.target.value
        });
    }

    handleStart(e: any): void {
        e.preventDefault();

        this.startGame()
    }

    startGame() {
        const newPlay = [{
            player: this.state.playerName,
            score: 'Playing now'
        }]

        document.querySelectorAll('.discover-letter').forEach((element) => element.classList.add('unknownLetter'))

        this.setState(
            {
                plays: newPlay.concat(this.state.plays),
                hideUserName: true,
                hideGameboard: false,
            }
        )
    }

    resetGame() {
        this.setState(
            {
                hideUserName: false,
                hideGameboard: true,
                hideGameEnd: true,
                word: WORDS[Math.floor(Math.random() * WORDS.length)],
                availableLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                usedLetters: [],
                errors: 0,
                endGameMessage: ''
            }
        )
    }

    isGameEnd() {
        if (this.state.errors >= 5 || document?.querySelectorAll('.unknownLetter').length === 0) {
            let endGameMessage = this.state.errors >= 5 ? 'You LOOSE n00b !' : 'Congratulations! You WON';

            let currentPlays = this.state.plays;

            currentPlays[0] = Object.assign(currentPlays[0], {
                score: endGameMessage
            })

            this.setState({
                plays: currentPlays,
                hideGameEnd: false,
                hideGameboard: true,
                endGameMessage: endGameMessage
            })
        }
    }

    handleLetterClick(e: any) {
        const clickedLetter = e.target.textContent;

        if (this.state.word.includes(clickedLetter)) {

            document.querySelector(`.unknownLetter[data-letter="${clickedLetter}"]`)?.classList.remove('unknownLetter');
        } else {
            this.setState({
                errors: this.state.errors + 1
            })
        };

        this.setState({
            availableLetters: this.state.availableLetters.filter((currentLetter) => currentLetter !== clickedLetter),
            usedLetters: this.state.usedLetters.concat(clickedLetter)
        });

        this.isGameEnd();
    }

    render() {
        return (
            <div id="hangman">
                <header>
                    <h1>Hangman</h1>
                </header>
                <div className="d-flex justify-content-around row row-cols-1 row-cols-md-4 g-4 gameBoard">
                    <InGameRules rules={this.state.rules}></InGameRules>
                    <main className="col-md-6 bg-light d-flex flex-column justify-content-center">
                        <form className={this.state.hideUserName ? 'hidden' : ''}>
                            <h1>Choose a User Name</h1>
                            <input className="form-control me-2"
                                onChange={(e: any) => this.handleChange(e)}
                                type="search"
                                arial-label="Search"
                                placeholder="agario27" />
                            <button className="btn bg-danger" onClick={(e: any) => this.handleStart(e)}>START</button>
                        </form>
                        <div className={this.state.hideGameboard ? 'hidden' : ''}>
                            <h1>Guess the word</h1>
                            <div>
                                {this.state.word.split('').map((letter, index) =>
                                    (<span key={index} className="discover-letter unknownLetter" data-letter={letter}>{letter}</span>))}
                            </div>
                            <div className="d-flex flex-wrap row">
                                <div className="col col-md-6">
                                    <h3>Used letters</h3>
                                    <div>
                                        {this.state.usedLetters.map((letter: string, index: number) =>
                                        (<button key={index} className="btn">
                                            {letter}
                                        </button>))}
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <h3>Available letters</h3>
                                    <div>
                                        {this.state.availableLetters.map((letter: string, index: number) =>
                                        (<button key={index} className="btn" onClick={(e: any) => this.handleLetterClick(e)}>
                                            {letter}
                                        </button>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.hideGameEnd ? 'hidden' : ''}>
                            <h1>{this.state.endGameMessage}</h1>
                            <button className="btn bg-danger" onClick={(e: any) => this.resetGame()}>NEW GAME</button>
                        </div>
                    </main>
                    <InGameRanking plays={this.state.plays}></InGameRanking>
                </div>
            </div>
        )
    }
}

export default Hangman;