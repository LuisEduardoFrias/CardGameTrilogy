/** @format */

import { useRef } from "react";
import { GameState } from "../components/game";
import Category from "./category";
import initializeLevel from "./initialize_level";
import Level from "./level";

type Find = {
	key: string;
	value: boolean;
	setCardState: (value: boolean) => void;
};

export default function CardSelector(): object {
	//
	const findsRef = useRef<Find[]>([]);

	function reset() {
		findsRef.current.splice(0);
	}

	function select(
		cardId: string,
		level: Level,
		setLevel: (prev: Level) => Level,
		setGameState: (value: GameState) => void,
		setCardState: () => void,
		category: Category
	): undefined {
		if (findsRef.current.length === level.category.cards?.length / 2) {
			setGameState(GameState.nextlevel);
			findsRef.current.splice(0);

			(async () => {
				//setLevel(await initializeLevel(category, level.level + 1));
			})();

			return undefined;
		}
		const indexkey = findsRef.current.findIndex(
			(find: Find) => find.key === cardId
		);

		const indexValue = findsRef.current.findIndex(
			(find: Find) => find.value === false
		);

		if (indexkey >= 0 || indexValue >= 0) {
			if (findsRef.current[indexkey]?.key === cardId) {
				findsRef.current[indexkey].value = true;
			} else {
				findsRef.current[indexValue].setCardState();
				setCardState();
				findsRef.current.splice(indexValue, 1);
			}

			return undefined;
		}

		findsRef.current.push({
			key: cardId,
			value: false,
			setCardState: setCardState
		});
	}

	return { reset, select };
}

/*
let findsRef: Find[] = [];

export default function CardSelector(
	cardId: string,
	level: Level,
	setLevel: (prev: Level) => Level,
	setGameState: (value: GameState) => void,
	setCardState: () => void,
	category: Category
): undefined {
	//
	if (findsRef.length === level.category.cards?.length / 2) {
		setLevel(initializeLevel(category, level.level + 1));
		setGameState(GameState.nextlevel);
		findsRef = [];

		return undefined;
	}

	const indexkey = findsRef.findIndex((find: Find) => find.key === cardId);

	const indexValue = findsRef.findIndex((find: Find) => find.value === false);

	if (indexkey >= 0 || indexValue >= 0) {
		if (findsRef[indexkey]?.key === cardId) {
			findsRef[indexkey].value = true;
		} else {
			findsRef[indexValue].setCardState();
			setCardState();
			findsRef.splice(indexValue, 1);
		}

		return undefined;
	}

	findsRef.push({ key: cardId, value: false, setCardState: setCardState });
}
*/
