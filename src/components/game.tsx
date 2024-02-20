/** @format */
"use client";

import { useState, useEffect, useMemo } from "react";
import DraggableWindow from "cp/draggable_window";
import DrawCard from "cp/draw_card";
import GameOver from "cp/game_over";
import Start from "cp/start";
import Category from "dm/category";
import Settings from "cp/settings";
import Button from "cp/button";
import Loading from "cp/loading";
import Timer from "cp/timer";
import Pause from "cp/pause";
import Level from "dm/level";
import NextLevel from "cp/next_level";
import initializeLevel from "dm/initialize_level";
import CardSelector from "dm/card_select";

import Styles from "st/game.module.css";

export enum GameState {
	start = "start",
	stop = "stop",
	gameover = "gameover",
	nextlevel = "nextlevel",
	pause = "pause",
	settings = "settings"
}

export default function Game({
	startupData,
	setCoreState
}: {
	startupData: Category;
	setCoreState: (value: CoreState) => void;
}) {
	//
	const [gameState, setGameState] = useState<GameState>(GameState.stop);

	const [loading, setLoading] = useState(true);
	const [level, setLevel] = useState({});

	useEffect(() => {
		initializeLevel(setLevel, new Level(undefined, startupData));
	}, []);

	useEffect(() => {
		if (gameState == GameState.nextlevel) {
			initializeLevel(setLevel, level);
		}
	}, [level, gameState]);

	const memoizedDrawCardList = useMemo(
		() =>
			level?.category?.cards?.map((card: Card, index: number) => (
				<DrawCard
					key={index}
					card={card}
					level={level}
					setLevel={setLevel}
					setGameState={setGameState}
					category={startupData}
				/>
			)),
		[level.category]
	);

	return (
		<>
			<Loading className={`${loading ? "opacity-off" : "opacity-on"}`} />

			<DraggableWindow
				className={`${!loading ? "opacity-off" : "opacity-on"}`}
				src='in_game.mp3'>
				<div className={Styles.gameContainer}>
					<header className={`${Styles.header} ligth_border`}>
						<span className={`${Styles.title} blue_metal_text`}>
							Card Game Trilogy
						</span>
						<div className={Styles.timerLevel}>
							<span className={Styles.textLevel}>{`Level: ${
								level?.level + 1
							}`}</span>
							<Timer
								time={level?.time}
								gameState={gameState}
								setGameState={setGameState}
							/>
							<Button
								className='option-btn'
								title='☰'
								textClass='option-span'
								onClick={() => {
									setGameState(GameState.pause);
								}}
							/>
						</div>
					</header>
					{gameState == GameState.stop && <Start setGameState={setGameState} />}
					{gameState == GameState.pause && (
						<Pause setCoreState={setCoreState} setGameState={setGameState} />
					)}
					{gameState == GameState.settings && (
						<Settings setGameState={setGameState} />
					)}
					{gameState == GameState.gameover && (
						<GameOver setGameState={setGameState} />
					)}
					{gameState == GameState.nextlevel && (
						<NextLevel setGameState={setGameState} />
					)}
					<div className={`${Styles.containerCards} ligth_border`}>
						{memoizedDrawCardList}
					</div>
				</div>
			</DraggableWindow>
		</>
	);
}
