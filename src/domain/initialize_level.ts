/** @format */

import Category from "dm/category";
import Level from "dm/level";

export default async function initializeLevel(
	category: Category,
	level: number = 0
): Level {
	const newLevel: Level = new Level(category, level);

	await newLevel.cardsGenerate();

	const newArray: Card[] = [];

	const duplicateCards: Card[] = newLevel.category.cards.concat(
		newLevel.category.cards.slice()
	);

	for (let i = 0; i < duplicateCards.length; i++) {
		let randomIndex = Math.floor(Math.random() * duplicateCards.length);
		newArray.splice(randomIndex, 0, duplicateCards[i]);
	}

	newLevel.category.cards = newArray;

	//alert("initializeLevel: " + JSON.stringify(newLevel));
	return newLevel;
}
