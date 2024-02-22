/** @format */
"use client";

import { useState, useEffect, useMemo } from "react";
import { CoreState } from "cp/core";
import LoadingTransition from "cp/loading_transition";
import DraggableWindow from "cp/draggable_window";
import MemorizedCards from "cp/memorized_cards";
import Header from "cp/header";
import DrawCard from "cp/draw_card";
import CardSelector from "dm/card_selector";
import GameOver from "cp/game_over";
import Start from "cp/start";
import Category from "dm/category";
import Settings from "cp/settings";
import Loading from "cp/loading";
import Pause from "cp/pause";
import Level from "dm/level";
import NextLevel from "cp/next_level";
import initializeLevel from "dm/initialize_level";

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
	category,
	setCoreState
}: {
	category: Category;
	setCoreState: (value: CoreState) => void;
}) {
	//
	const [gameState, setGameState] = useState<GameState>(GameState.stop);
	const [level, setLevel] = useState();
	const { reset, select } = CardSelector();

	const execute: object = {
		nextlevel: () => {
			(async () => {
				setLevel(await initializeLevel(category.clone(), level.level));
			})();
			reset();
			setLevel(undefined);
		},
		selectcategory: () => {
			setCoreState(CoreState.Menu);
			setGameState(GameState.stop);
			reset();
			setLevel(undefined);
		},
		restart: () => {
			setLevel(undefined);
			setGameState(GameState.stop);
			reset();
			(async () => {
				setLevel(await initializeLevel(category.clone()));
			})();
		},
		default: () => {}
	};

	useEffect(() => {
		(async () => {
			setLevel(await initializeLevel(category.clone()));
		})();
	}, []);

	useEffect(() => {
		(execute[gameState] ?? execute["default"])();
	}, [gameState]);

	return (
		<>
			<LoadingTransition>
				<DraggableWindow src='in_game.mp3'>
					<div className={Styles.gameContainer}>
						{level && (
							<Header
								level={level.level}
								time={level.time}
								gameState={gameState}
								setGameState={setGameState}
							/>
						)}

						{gameState == GameState.stop && (
							<Start setGameState={setGameState} />
						)}
						{gameState == GameState.pause && (
							<Pause setGameState={setGameState} />
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
							{level?.category?.cards?.map((card: Card, index: number) => (
								<DrawCard
									key={index}
									level={level}
									card={card}
									setLevel={setLevel}
									setGameState={setGameState}
									category={category.clone()}
									select={select}
								/>
							))}
						</div>
					</div>
				</DraggableWindow>
			</LoadingTransition>
		</>
	);
}
