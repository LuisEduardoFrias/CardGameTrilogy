/** @format */

import Level from "md/level";

export default async function initializeLevel(
	setLevel: (value: Level) => void,
	level: Level
) {
	await level.cardsGenerate();

	const newArray: Card[] = [];

	const duplicateCards: Card[] = level.category.cards.concat(
		level.category.cards.slice()
	);

	for (let i = 0; i < duplicateCards.length; i++) {
		let randomIndex = Math.floor(Math.random() * duplicateCards.length);
		newArray.splice(randomIndex, 0, duplicateCards[i]);
	}

	level.category.cards = newArray;

	setLevel(level);
}
