/** @format */

import Level from "md/level";

export default function initializeLevel(
	setLevel: (callback: (prev: Level) => Level) => void,
	level: Level
) {
	const newArray: Card[] = [];
	const duplicateCards: Card[] = level.cards.concat(level.cards.slice());

	for (let i = 0; i < duplicateCards.length; i++) {
		let randomIndex = Math.floor(Math.random() * duplicateCards.length);
		newArray.splice(randomIndex, 0, duplicateCards[i]);
	}

	setLevel(prev => {
		return { ...prev, cards: newArray };
	});
}
