import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface StartGameFormProps {
	hideUserName: boolean;
	handleChange: Function;
	handleStart: Function;
	gameTitle: string;
}

export default function StartGameForm({...props}: StartGameFormProps) {

	return (
		<form className={props.hideUserName ? 'hidden' : 'd-flex flex-column align-items-center'}>
			<h1>{props.gameTitle}</h1>
			<p className="col-md-4">
				<input className="form-control"
					onChange={(e: any) => props.handleChange(e)}
					placeholder="Agario27" />
			</p>
			<button className="btn btn-lg three buzz" onClick={(e: any) => props.handleStart(e)}>START</button>
		</form>
	);
}