/** @format */
"use client";

import { GameState } from "cp/game";
import Button from "cp/button";
import Sound from "cp/sound";
import Styles from "st/nextlevel.module.css";

export default function NextLevel({
	setGameState
}: {
	setGameState: (value: GameState) => void;
}) {
	function handleClick() {
		setGameState(GameState.start);
	}

	return (
		<Sound src='nextlever.mp3'>
			<div className={Styles.place}>
				<span className={Styles.title}>Next Level</span>
				<Button onClick={handleClick} title='Start' />
			</div>
		</Sound>
	);
}
