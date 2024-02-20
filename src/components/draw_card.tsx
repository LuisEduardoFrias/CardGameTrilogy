/** @format */
"use client";

import React, { useState, useEffect } from "react";
import Card, { CardState } from "dm/card";
import { GameState } from "cp/game";
import Category from "dm/category";
import Lever from "dm/lever";
import CardSelector from "dm/card_selector";
import Styles from "st/draw_card.module.css";

export default function DrawCard({
	level,
	card,
	setLevel,
	setGameState,
	category
}: {
	level: Level;
	card: Card;
	setLevel: (callback: (prev: Level) => Level) => void;
	setGameState: (value: GameState) => void;
	category: Category;
}) {
	const [state, setState] = useState<CardState>(card.state);

	useEffect(() => {
		if (state == CardState.show) {
			const timeoutId = setTimeout(() => {
				CardSelector(card.id, level, setLevel, setGameState, () => {
					setState(CardState.hidden), category;
				});
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
			<img
				loading='lazy'
				src={card.img_url}
				className={Styles.img}
				alt={card.name}
				style={{
					opacity: `${state === CardState.show ? "1" : "0"}`
				}}
			/>
		</div>
	);
}
