/** @format */
"use client";

import { GameState } from "./game";
import Button from "./button";
import Styles from "../styles/start.module.css";

export default function Start({
	gameState,
	setGameState
}: {
	gameState: GameState;
	setGameState: (value: GameState) => void;
}) {
	return (
		<div className={Styles.place}>
			<Button
				title={`${gameState === GameState.stop ? "Start" : "continue"}`}
				onClick={() => {
					setGameState(GameState.start);
				}}
			/>
			<Button
				title='menú'
				onClick={() => {
					setGameState(GameState.selectcategory);
				}}
			/>
			<Button
				title='settings'
				onClick={() => {
					setGameState(GameState.settings);
				}}
			/>
		</div>
	);
}
