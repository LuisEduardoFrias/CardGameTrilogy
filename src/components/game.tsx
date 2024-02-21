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
import { CoreState } from "cp/core";
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
	settings = "settings",
	restart = "restart",
	selectcategory = "selectcategory"
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
		initializeLevel(setLevel, new Level(undefined, startupData));

		return () => {
			setGameState(GameState.stop);
			setLoading(true);
		};
	}, []);

	useEffect(() => {
		if (gameState == GameState.nextlevel) {
			initializeLevel(setLevel, level);
		}
		if (gameState == GameState.selectcategory) {
			setCoreState(CoreState.menu);
		}
		if (gameState == GameState.restart) {
			alert("reinicial");
			//setCoreState(CoreState.menu);
		}
	}, [level, gameState]);

	return (
		<>
			<Loading className={`${loading ? "opacity-off" : "opacity-on"}`} />

			<DraggableWindow
				className={`${!loading ? "opacity-off" : "opacity-on"}`}
				src='in_game.mp3'>
				<div className={Styles.gameContainer}>
					<Header
						level={level}
						gameState={gameState}
						setGameState={setGameState}
					/>
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
						<CardMemory
							level={level}
							setLevel={setLevel}
							setLoading={setLoading}
							setGameState={setGameState}
							startupData={startupData}
						/>
					</div>
				</div>
			</DraggableWindow>
		</>
	);
}

function Header({
	level,
	gameState,
	setGameState
}: {
	level: Level;
	gameState: GameState;
	setGameState: (value: GameState) => void;
}) {
	return (
		<header className={`${Styles.header} ligth_border`}>
			<span className={`${Styles.title} blue_metal_text`}>
				Card Game Trilogy
			</span>
			<div className={Styles.timerLevel}>
				<span className={Styles.textLevel}>{`Level: ${level?.level + 1}`}</span>
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
	);
}

function CardMemory({
	level,
	setLevel,
	setLevel,
	setGameState,
	startupData
}: {
	level: Level;
	setLoading:(value:boolean)=> void,
	setLevel: (callback: (prev: Level) => Level) => void;
	setGameState: (value: GameState) => void;
	startupData: Category;
}) {
	const [category, setCategory] = useState(level.category);

	useEffect(() => {
		const loadingPromise = new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 500);
		});

		loadingPromise.then(() => {
			setLoading(false);
		});

		return () => {
			loadingPromise.then(() => {});
		};
	}, []);

	const memoizedDrawCardList = useMemo(
		() =>
			category?.cards?.map((card: Card, index: number) => (
				<DrawCard
					key={index}
					card={card}
					level={level}
					setLevel={setLevel}
					setGameState={setGameState}
					category={startupData}
				/>
			)),
		[category]
	);

	return <>{memoizedDrawCardList}</>;
}
