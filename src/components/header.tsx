/** @format */
"use client";

import { GameState } from "cp/game";
import Timer from "cp/timer";
import Button from "cp/button";
import Level from "dm/level";

import Styles from "st/game.module.css";

export default function Header({
	level,
	time,
	gameState,
	setGameState
}: {
	level: string,
	time:string,
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
					time={time}
					gameState={gameState}
					setGameState={setGameState}
				/>
				<Button
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
