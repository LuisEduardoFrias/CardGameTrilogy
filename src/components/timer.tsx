/** @format */

import { useState, useEffect } from "react";
import { GameState } from "cp/game";
import Styles from "st/timer.module.css";

export default function Timer({
	time,
	gameState,
	setGameState
}: {
	time: number;
	gameState: GameState;
	setGameState: (value: GameState) => void;
}) {
	const [timer, setTimer] = useState(time);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (gameState === GameState.start) {
			interval = setInterval(() => {
				if (timer <= 0) {
					setGameState(GameState.gameover);
					setTimer(time);
				} else {
					setTimer(timer - 1);
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timer, gameState]);

	useEffect(() => {
		setTimer(time);
	}, [gameState]);

	return <span className={Styles.timer}>{`Time: ${timer} seconds`}</span>;
}
