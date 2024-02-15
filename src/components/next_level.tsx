/** @format */

import { GameState } from "cp/game";
import Button from "cp/button";
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
		<div className={Styles.place}>
			<span className={Styles.title}>Next Level</span>
			<Button onClick={handleClick} title="Start" />
		</div>
	);
}
