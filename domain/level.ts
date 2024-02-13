/** @format */

import Card, { State } from "./card";

export default class Level {
	cards: Card[];
	level: number;
	time: number;
	private readonly mult: number = 2;
	private readonly count: number = 6;

	constructor() {
		this.cards = [];
		this.level = 0;
		this.GetCards();
		this.time = (10 * 6) / 2 - 10 * 6 * 0.2;
	}

	GetCards() {
		const array: Card = [];

		for (let i = 0; i < this.count + this.level * this.mult; i++) {
			array.push(
				new Card(
					`${i}`,
					`name-${i}`,
					`https://images.ygoprodeck.com/images/cards/100000${i}0.jpg`
				)
			);
		}

		for (let i = 0; i < array.length; i++) {
			let randomIndex = Math.floor(Math.random() * array.length);
			this.cards.splice(randomIndex, 0, array[i]);
		}
	}
}
