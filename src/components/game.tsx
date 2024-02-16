/** @format */

import { useState, useEffect } from "react";
import DrawCard from "cp/draw_card";
import GameOver from "cp/game_over";
import Start from "cp/start";
import Timer from "cp/timer";
import Level from "dm/level";
import NextLevel from "cp/next_level";
import initializeLevel from "dm/initialize_level";
import CardSelector from "dm/card_select";

import Styles from "st/game.module.css";

export enum GameState {
	start = "start",
	stop = "stop",
	gameover = "gameover",
	nextlevel = "nextlevel"
}

export default function Game() {
	//
	const [gameState, setGameState] = useState<GameState>(GameState.stop);

	const [level, setLevel] = useState(new Level());

	useEffect(() => {
		if (gameState == GameState.nextlevel) {
			//	alert("useEffect: " + JSON.stringify(level, null, 2));
			initializeLevel(setLevel, level);
		}
	}, [level.level]);

	useEffect(() => {
		initializeLevel(setLevel, level);
	}, []);

	return (
		<div className={Styles.gameContainer}>
			<header className={`${Styles.header} ligth_border`}>
				<span className={`${Styles.title} blue_metal_text`}>
					Memory Card Game Trilogy
				</span>
				<div className={Styles.timerLevel}>
					<span className={Styles.textLevel}>{`Level: ${
						level.level + 1
					}`}</span>
					<Timer
						time={level.time}
						gameState={gameState}
						setGameState={setGameState}
					/>
				</div>
			</header>
			{gameState == GameState.stop && <Start setGameState={setGameState} />}
			{gameState == GameState.gameover && (
				<GameOver setGameState={setGameState} />
			)}
			{gameState == GameState.nextlevel && (
				<NextLevel setGameState={setGameState} />
			)}
			<div className={`${Styles.containerCards} ligth_border`}>
				{level?.cards?.map((card: Card, index: number) => (
					<DrawCard
						key={index}
						level={level}
						card={card}
						level={level}
						setLevel={setLevel}
						setGameState={setGameState}
					/>
				))}
			</div>
		</div>
	);
}
