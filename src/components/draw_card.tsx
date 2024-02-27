/** @format */
"use client";

import React, { useState, useEffect } from "react";
import Card, { CardState } from "../domain/card";
import CardSelector from "../domain/card_selector";
import SoundClick from "./sound_click";
import Category from "../domain/category";
import Lever from "../domain/lever";
import { GameState } from "./game";
import Styles from "../styles/draw_card.module.css";

export default function DrawCard({
	level,
	card,
	setLevel,
	setGameState,
	category,
	select
}: {
	level: Level;
	card: Card;
	setLevel: (callback: (prev: Level) => Level) => void;
	setGameState: (value: GameState) => void;
	category: Category;
	select: (
		cardId: string,
		level: Level,
		setLevel: (prev: Level) => Level,
		setGameState: (value: GameState) => void,
		setCardState: () => void,
		category: Category
	) => undefined;
}) {
	const [state, setState] = useState<CardState>(card.state);

	useEffect(() => {
		if (state == CardState.show) {
			const timeoutId = setTimeout(() => {
				select(
					card.id,
					level,
					setLevel,
					setGameState,
					() => {
						setState(CardState.hidden);
					},
					category
				);
			}, 500);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [state]);

	const _styles: React.CSSProperties = {
		transform: `rotateY(${state === CardState.show ? "180" : "0"}deg)`
	};

	function handleClick() {
		setState(CardState.show);
	}

	return (
			<div
				key={card.id}
				style={_styles}
				className={`${Styles.card} gold_metal`}
				onClick={handleClick}>
		<SoundClick src='./audios/card_up.mp3'>
				<img
					loading='lazy'
					src={card.img_url}
					className={Styles.img}
					alt={card.name}
					style={{
						opacity: `${state === CardState.show ? "1" : "0"}`
					}}
				/>
		</SoundClick>
			</div>
	);
}
