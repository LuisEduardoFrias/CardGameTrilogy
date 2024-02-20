/** @format */
"use client"

import { GameState } from "cp/game";
import Button from "cp/button";
import Styles from "st/start.module.css";

export default function Start({
	setGameState
}: {
	setGameState: (value: GameState) => void;
}) {
	function handleClick() {
		setGameState(GameState.start);
	}

	return (
		<div className={Styles.place}>
			<Button onClick={handleClick} title="Start"/>
		</div>
	);
}
