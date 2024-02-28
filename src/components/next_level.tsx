/** @format */
"use client";

import { GameState } from "./game";
import Button from "./button";
import Sound from "./sound";
import Styles from "../styles/nextlevel.module.css";

export default function NextLevel({
	setGameState,
}: {
	setGameState: (value: GameState) => void;
}) {
	function handleClick() {
		setGameState(GameState.start);
	}

	return (
		<Sound src='./audios/nextlever.mp3'>
			<div className={Styles.place}>
				<span className={Styles.title}>Next Level</span>
				<Button onClick={handleClick} title='Start' />
			</div>
		</Sound>
	);
}
