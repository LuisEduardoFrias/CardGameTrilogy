/** @format */

import { GameState } from "cp/game";
import Level from "dm/level";

type Find = {
	key: string;
	value: boolean;
	setCardState: (value: boolean) => void;
};

const finds: Find[] = [];

export default function CardSelector(
	cardId: string,
	level: Level,
	setLevel: (callback: (prev: Level) => Level) => void,
	setGameState: (value: GameState) => void,
	setCardState: () => void
): undefined {
	//
	if (finds.length === level.cards.length / 2) {
		setLevel((prev: Level) => {
			prev.level += 1;
			const newLevel: Level = new Level(prev.level);
			return newLevel;
		});

		setGameState(GameState.nextlevel);
		find = [];

		return undefined;
	}

	const indexkey = finds.findIndex((find: Find) => find.key === cardId);

	const indexValue = finds.findIndex((find: Find) => find.value === false);

	if (indexkey >= 0 || indexValue >= 0) {
		if (finds[indexkey]?.key === cardId) {
			finds[indexkey].value = true;
		} else {
			finds[indexValue].setCardState();
			setCardState();
			finds.splice(indexValue, 1);
		}

		return undefined;
	}

	finds.push({ key: cardId, value: false, setCardState: setCardState });
}
