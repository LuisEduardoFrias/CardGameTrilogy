/** @format */

import { GameState } from "cp/game";
import Button from "cp/button";
import Styles from "st/game_over.module.css";

export default function GameOver({
	setGameState
}: {
	setGameState: (value: GameState) => void;
}) {
	function handleClick() {
		setGameState(GameState.start);
	}

	return (
		<div className={Styles.place}>
			<span className={Styles.title}>Game Over</span>
			<Button
				className={`${Styles.btn} btn red_metal`}
				onClick={handleClick}
				title='Restart'
			/>
		</div>
	);
}
