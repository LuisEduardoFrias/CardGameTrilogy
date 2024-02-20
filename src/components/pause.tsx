/** @format */
"use client"

import { CoreState } from "cp/core";
import { GameState } from "cp/game";
import Button from "cp/button";
import Styles from "st/pause.module.css";

export default function Pause({
	setGameState,
	setCoreState
}: {
	setCoreState: (value: CoreState) => void;
	setGameState: (value: GameState) => void;
}) {
	return (
		<div className={Styles.place}>
			<Button
				title='continue'
				onClick={() => {
					setGameState(GameState.start);
				}}
			/>
			<Button
				title='menú'
				onClick={() => {
					setCoreState(CoreState.menu);
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
