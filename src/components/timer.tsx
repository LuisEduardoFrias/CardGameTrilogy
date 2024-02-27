/** @format */
"use client";

import { useState, useEffect } from "react";
import { GameState } from "./game";
import Styles from "../styles/timer.module.css";

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
		if (gameState != GameState.pause && gameState != GameState.start && gameState != GameState.settings)
			setTimer(time);
	}, [gameState]);

	return <span className={Styles.timer}>{`Time: ${timer} seconds`}</span>;
}
