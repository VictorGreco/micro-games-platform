import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plays } from './InGameRanking';
import Gameboard from './Gameboard';
import StartGameForm from './StartGameForm';
import EndGameScreen from  './EndGameScreen';
import '../index.css';
import { parseMsToTimeString } from '../helpers';
import balloonPrincess from '../resources/hangman/balloon_princess.svg';
import balloonPrincess4 from '../resources/hangman/princess_ballons_4.svg';
import balloonPrincess3 from '../resources/hangman/princess_ballons_3.svg';
import balloonPrincess2 from '../resources/hangman/princess_ballons_2.svg';
import balloonPrincess1 from '../resources/hangman/princess_ballons_1.svg';
import balloonPrincess0 from '../resources/hangman/princess_ballons_0.svg';
import scaryMonster from '../resources/hangman/scary-monster.svg';

const PRINCESS_BALLONS = [balloonPrincess0, balloonPrincess1, balloonPrincess2, balloonPrincess3, balloonPrincess4, balloonPrincess];

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
	usedLetters: HTMLElement[];
	attempts: number;
	endGameMessage: string;
	startDate: number;
	gameResult: string;
}

const WORDS: string[] = ['fridge', 'potatoe', 'bread', 'cookie'];

class Hangman extends React.Component<HangmanProps, HangmanState> {
	constructor(props: HangmanProps) {
		super(props);
		this.state = {
			plays: [],
			rules: 'In order to save the little princess from the hungry monster you have to guess the word. You have 5 attempts and you can click one letter each time',
			playerName: '',
			hideUserName: false,
			hideGameboard: true,
			hideGameEnd: true,
			word: WORDS[Math.floor(Math.random() * WORDS.length)],
			availableLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
			usedLetters: [],
			attempts: 4,
			endGameMessage: '',
			startDate: 0,
			gameResult: ''
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

		document.querySelectorAll('.discover-letter')
			.forEach((element, index) =>
				index % 2 === 0 ? element.classList.add('unknownLetter') : '');

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
		this.state.usedLetters.forEach(button => button.removeAttribute('disabled'));

		this.setState(
			{
				hideUserName: false,
				hideGameboard: true,
				hideGameEnd: true,
				word: WORDS[Math.floor(Math.random() * WORDS.length)],
				availableLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
				usedLetters: [],
				attempts: 4,
				endGameMessage: '',
				gameResult: ''
			}
		)
	}

	isGameEnd() {
		let isZeroAttempts = this.state.attempts === 0;
		if (isZeroAttempts || document?.querySelectorAll('.unknownLetter').length === 0) {
			let endGameMessage = isZeroAttempts ? 'You feed the monster' : 'You saved the princess';
			let playsHandle = this.state.plays;

			let time = parseMsToTimeString(new Date().getTime() - this.state.startDate);

			playsHandle[0] = Object.assign(playsHandle[0], {
				score: `${endGameMessage} in ${time}`
			})

			this.setState({
				plays: playsHandle,
				hideGameEnd: false,
				hideGameboard: true,
				endGameMessage: endGameMessage,
				gameResult: isZeroAttempts ? 'lose' : 'win'
			})
		}
	}

	handleLetterClick(e: any) {
		const letterButton = e.target;
		const letterContext = letterButton.textContent;

		console.log(letterContext);
		console.log(e.target);

		letterButton.setAttribute('disabled', true);
		letterButton.classList.remove('buzz');


		if (this.state.word.includes(letterContext)) {
			document.querySelectorAll(`.unknownLetter[data-letter="${letterContext}"]`)
				.forEach((letter => letter?.classList.remove('unknownLetter')));
		} else {
			this.setState({
				attempts: this.state.attempts - 1
			})
		};

		this.setState({
			usedLetters: this.state.usedLetters.concat(letterButton)
		});

		this.isGameEnd();
	}

	render() {
		return (
			<Gameboard gameId="hangman" mainBoardId="clouds" rules={this.state.rules} plays={this.state.plays}>
				<main id="clouds" className="col-md-8 bg-light d-flex flex-column justify-content-center">
					<div className="cloud x1"></div>
					<div className="cloud x2"></div>
					<div className="cloud x3"></div>
					<div className="cloud x4"></div>
					<img src={PRINCESS_BALLONS[this.state.attempts + 1]} 
						height="auto" 
						width="250" 
						className={`princess-ballon ${this.state.hideGameboard ? 'vert-move' : ''}`}></img>
					{(this.state.gameResult === '' || this.state.gameResult === 'lose') 
						&& (<img src={scaryMonster} 
							height="auto" 
							width="300"
							className={`scary-monster ${this.state.hideGameboard ? 'horiz-move' : ''}`}></img>)}
					<StartGameForm hideUserName={this.state.hideUserName}
						handleChange={(e: any) => this.handleChange(e)} 
						handleStart={(e: any) => this.handleStart(e)} 
						gameTitle="Princess Hangman"></StartGameForm>

					<div className={this.state.hideGameboard ? 'hidden' : ''}>
						<h1>Guess the word</h1>
						<div>
							{this.state.word.split('').map((letter, index) =>
							(<span key={index}
								className={`discover-letter ${index % 2 == 0 ? 'unknownLetter' : ''}`}
								data-letter={letter}>{letter}</span>))}
						</div>
						<div className="d-flex justify-content-center flex-wrap row">
							<div className="col col-md-6">
								<div>
									{this.state.availableLetters.map((letter: string, index: number) =>
									(<button key={index} 
										className="btn buzz letters" 
										onClick={(e: any) => this.handleLetterClick(e)}>
										{letter}
									</button>))}
								</div>
							</div>
						</div>
					</div>
					<EndGameScreen 
						hideGameEnd={this.state.hideGameEnd}
						endGameMessage={this.state.endGameMessage} 
						resetGame={() => this.resetGame()}></EndGameScreen>
				</main>
			</Gameboard>
		)
	}
}

export default Hangman;