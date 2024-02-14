/** @format */

import { useState, useEffect } from "react";
import DrawCard from "cp/draw_card";
import GameOver from "cp/game_over";
import Start from "cp/start";
import Timer from "cp/timer";
import Level from "dm/level";
import Styles from "st/game.module.css";

export enum State {
	start,
	stop,
	gameover
}

type _Find = {
	key: string;
	value: boolean;
	setState: (value: boolean) => void;
};

export default function Game() {
	const [level, setLevel] = useState(new Level());
	const [state, setState] = useState(State.stop);
	const [find, setFind] = useState([]);

	function Find(cardId: string, setState: () => void) {
		setFind((prev: _Find[]) => {
			const indexkey = prev.findIndex((find: _Find) => find.key === cardId);

			const indexValue = prev.findIndex((find: _Find) => find.value === false);

			if (indexkey >= 0 || indexValue >= 0) {
				if (prev[indexkey]?.key === cardId) {
					prev[indexkey].value = true;
				} else {
					prev[indexValue].setState();
					setState();
					prev.splice(indexValue, 1);
				}
			} else {
				prev.push({ key: cardId, value: false, setState });
			}

			return [...prev];
		});

		level.cards.length;
	}

	useEffect(() => {
		const duplicCards: Card[] = level.cards.concat(level.cards.slice());

		const newArray: Card[] = [];

		for (let i = 0; i < duplicCards.length; i++) {
			let randomIndex = Math.floor(Math.random() * duplicCards.length);
			newArray.splice(randomIndex, 0, duplicCards[i]);
		}

		setLevel(prev => {
			return { ...prev, cards: newArray };
		});
	}, []);

	return (
		<div className={Styles.gameContainer}>
			<Timer time={level.time} state={state} setState={setState} />
			{state == State.stop && <Start setState={setState} />}
			{state == State.gameover && <GameOver setState={setState} />}
			<div className={Styles.containerCards}>
				{level?.cards?.map((card: Card, index: number) => (
					<DrawCard key={index} card={card} find={Find} />
				))}
			</div>
		</div>
	);
}
