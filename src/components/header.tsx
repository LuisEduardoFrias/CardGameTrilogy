/** @format */
"use client";

import { GameState } from "./game";
import Timer from "./timer";
import Button from "./button";
import Level from "../domain/level";

import Styles from "../styles/game.module.css";

export default function Header({
	level,
	time,
	gameState,
	setGameState
}: {
	level: string;
	time: number;
	gameState: GameState;
	setGameState: (value: GameState) => void;
}) {
	return (
		<header className={`${Styles.header} ligth_border`}>
			<span className={`${Styles.title} blue_metal_text`}>
				Card Game Trilogy
			</span>
			<div className={Styles.timerLevel}>
				<span className={Styles.textLevel}>{`Level: ${level + 1}`}</span>
				<Timer
					key='time'
					time={time}
					gameState={gameState}
					setGameState={setGameState}
				/>
				<Button
					key='button'
					className='option-btn'
					title='☰'
					textClass='option-span'
					onClick={() => {
						setGameState(GameState.pause);
					}}
				/>
			</div>
		</header>
	);
}
