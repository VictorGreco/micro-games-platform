import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plays } from './InGameRanking';
import Gameboard from './Gameboard';
import StartGameForm from './StartGameForm';
import EndGameScreen from './EndGameScreen';
import '../index.css';
import { shuffleArray, FixedSizeArray, parseMsToTimeString } from '../helpers';
import Eye from '../resources/memory/eye.svg';
import Foot from '../resources/memory/foot.svg';
import Hand from '../resources/memory/hand.svg';
import Head from '../resources/memory/head.svg';
import Legs from '../resources/memory/legs.svg';
import Arm from '../resources/memory/arm.svg';
import Nose from '../resources/memory/nose.svg';
import Tongue from '../resources/memory/tongue.svg';
import Mickey from '../resources/memory/mickey.png';

interface Cards {
    name: string;
    back: string;
    front: string;
}

type CardImage  =  HTMLImageElement | undefined;

interface MemoryProps { }
interface MemoryState {
    plays: Plays[];
    rules: string;
    playerName: string;
    hideUserName: boolean;
    hideGameboard: boolean;
    hideGameEnd: boolean;
    endGameMessage: string;
    startDate: number;
    gameResult: string;
    cards: FixedSizeArray<16, Cards>;
    clickOne: CardImage;
    clickTwo: CardImage;
    pairs: number;
}

const back: string = Mickey;
const CARDS: FixedSizeArray<16, Cards> = [{
    name: 'eye',
    back: back,
    front: Eye
}, {
    name: 'eye',
    back: back,
    front: Eye
}, {
    name: 'nose',
    back: back,
    front: Nose
}, {
    name: 'nose',
    back: back,
    front: Nose
}, {
    name: 'tongue',
    back: back,
    front: Tongue
}, {
    name: 'tongue',
    back: back,
    front: Tongue
}, {
    name: 'hand',
    back: back,
    front: Hand
}, {
    name: 'hand',
    back: back,
    front: Hand
}, {
    name: 'foot',
    back: back,
    front: Foot
}, {
    name: 'foot',
    back: back,
    front: Foot
}, {
    name: 'leg',
    back: back,
    front: Legs
}, {
    name: 'leg',
    back: back,
    front: Legs
}, {
    name: 'head',
    back: back,
    front: Head
}, {
    name: 'head',
    back: back,
    front: Head
}, {
    name: 'arm',
    back: back,
    front: Arm
}, {
    name: 'arm',
    back: back,
    front: Arm
}]

export default class Memory extends React.Component<MemoryProps, MemoryState> {
    constructor(props: MemoryProps) {
        super(props);
        this.state = {
            plays: [],
            rules: 'In order to win you must discover all 8 body parts: Eyes, Nose, Tongue, Head, Legs, Foots, Hands and Arms.',
            playerName: '',
            hideUserName: false,
            hideGameboard: true,
            hideGameEnd: true,
            endGameMessage: 'You discover all the body parts !',
            startDate: 0,
            clickOne: undefined,
            clickTwo: undefined,
            gameResult: 'win',
            cards: this.shuffleCards(),
            pairs: 0
        };
    }

    isMatch() {
        const clickOne: CardImage = this?.state?.clickOne;
        const clickTwo: CardImage = this?.state?.clickTwo;

        if (!!clickOne && !!clickTwo) {
            console.log('a');
            if (clickOne.getAttribute('data-name') === clickTwo.getAttribute('data-name')) {
                clickOne?.classList?.add('discovered');
                clickTwo?.classList?.add('discovered');

                this.setState({ pairs: this.state.pairs + 1 })
            }

            this.setState({
                clickOne: undefined,
                clickTwo: undefined
            })

            setTimeout(() => {
                document?.querySelectorAll('img:not(.discovered)')?.forEach((img: any) =>
                    img.src = img.getAttribute('data-back'));
            }, 500)
        }
    }

    handleClick(e: any) {
        const target = e.target;

        target.src = target.getAttribute('data-front');

        if (this.state.clickOne === undefined) {
            this.setState({ clickOne: target }, this.isMatch);

        } else if (this.state.clickTwo === undefined) {

            this.setState({ clickTwo: target }, this.isMatch);
        }
    }

    handleChange(e: any): void {
        e.preventDefault();
        this.setState({ playerName: e.target.value });
    }

    shuffleCards(): FixedSizeArray<16, Cards> {

        return shuffleArray(CARDS);
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

        this.setState(
            {
                plays: [...newPlay, ...this.state.plays],
                hideUserName: true,
                hideGameboard: false,
                startDate: new Date().getTime()
            }
        )
    }

    resetGame() {
        this.setState(
            {
                hideUserName: false,
                hideGameboard: true,
                hideGameEnd: true,
                cards: this.shuffleCards()
            }
        )
    }

    isGameEnd() {
        const noUnknownCardsLeft = document.querySelectorAll('unknownCard').length === 0;

        if (noUnknownCardsLeft) {
            const playsHandle = this.state.plays;
            const time = parseMsToTimeString(new Date().getTime() - this.state.startDate);

            playsHandle[0] = Object.assign(playsHandle[0], {
                score: `${this.state.endGameMessage} in ${time}`
            })

            this.setState({
                plays: playsHandle,
                hideGameEnd: false,
                hideGameboard: true
            })
        }
    }

    render() {
        return (
            <Gameboard gameId="memory" mainBoardId="" rules={this.state.rules} plays={this.state.plays}>
                <main className={`col-md-8 bg-light d-flex flex-column justify-content-center ${this.state.hideUserName ? 'currentlyPLaying' : ''}`}>

                    {this.state.hideUserName && (
                        <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                            {this.state.cards.map((card: Cards, index: number) => {
                                return (
                                    <div key={index} className="d-flex justify-content-center align-items-center memoryCard">
                                        <img src={card.back}
                                            data-front={card.front}
                                            data-back={card.back}
                                            data-name={card.name}
                                            width="100"
                                            height="100"
                                            onClick={(e: any) => this.handleClick(e)}></img>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <StartGameForm hideUserName={this.state.hideUserName}
                        handleChange={(e: any) => this.handleChange(e)}
                        handleStart={(e: any) => this.handleStart(e)}
                        gameTitle="Anatomic Memory"></StartGameForm>

                    <EndGameScreen
                        hideGameEnd={this.state.hideGameEnd}
                        endGameMessage={this.state.endGameMessage}
                        resetGame={() => this.resetGame()}></EndGameScreen>
                </main>
            </Gameboard>
        )
    }
}