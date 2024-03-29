/** @format */
"use client";

import { useState, useEffect, useMemo } from "react";
import { CoreState } from "./core";
import LoadingTransition from "./loading_transition";
import WindowSound from "./window_sound";
import MemorizedCards from "./memorized_cards";
import Header from "./header";
import DrawCard from "./draw_card";
import CardSelector from "../domain/card_selector";
import GameOver from "./game_over";
import Start from "./start";
import LoadingCards from "./loading_cards";
import Category from "../domain/category";
import Settings from "./settings";
import Loading from "./loading";
import Pause from "./pause";
import Level from "../domain/level";
import NextLevel from "./next_level";
import initializeLevel from "../domain/initialize_level";

import Styles from "../styles/game.module.css";

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
	const [isLoading, setIsLoading] = useState(false);
	const { reset, select } = CardSelector();
	const [uniqueId, setUniqueId] = useState(0);

	const execute: object = {
		nextlevel: () => {
			setIsLoading(true);
			(async () => {
				getUniqueId();
				setLevel(await initializeLevel(category.clone(), level.level + 1));
				setIsLoading(false);
			})();
		},
		selectcategory: () => {
			setCoreState(CoreState.Menu);
			setGameState(GameState.stop);
			setUniqueId(0);
			reset();
			setLevel(undefined);
		},
		restart: () => {
			setGameState(GameState.stop);
			getUniqueId();
			reset();
			(async () => {
				setLevel(await initializeLevel(category.clone()));
			})();
		},
		default: () => {}
	};

	useEffect(() => {
		console.log("level: " + JSON.stringify(level, null, 2));
	}, [level]);

	useEffect(() => {
		(async () => {
			setLevel(await initializeLevel(category.clone()));
		})();
	}, []);

	useEffect(() => {
		(execute[gameState] ?? execute["default"])();
	}, [gameState]);

	function random() {
		return Math.floor(Math.random() * 10) + 1;
	}

	function getUniqueId(): void {
		const _random = random();

		if (_random === uniqueId) setUniqueId(getUniqueId());

		setUniqueId(_random);
	}

	return (
		<>
			<LoadingTransition>
				<WindowSound src='./audios/in_game.mp3'>
					<div className={Styles.gameContainer}>
						<Header
							key={level?.time}
							level={level?.level}
							time={level?.time}
							gameState={gameState}
							setGameState={setGameState}
						/>

						{(gameState == GameState.stop || gameState == GameState.pause) && (
							<Start setGameState={setGameState} gameState={gameState} />
						)}
						{gameState == GameState.settings && (
							<Settings setGameState={setGameState} />
						)}
						{gameState == GameState.gameover && (
							<GameOver setGameState={setGameState} />
						)}
						{isLoading && <LoadingCards />}
						{gameState == GameState.nextlevel && (
							<NextLevel setGameState={setGameState} />
						)}
						<div className={`${Styles.containerCards} ligth_border`}>
							{level?.category?.cards?.map((card: Card, index: number) => (
								<DrawCard
									key={`${index}-${uniqueId}`}
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
				</WindowSound>
			</LoadingTransition>
		</>
	);
}
