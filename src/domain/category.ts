/** @format */

import Card from "dm/card";

export default abstract class Category {
	cards: Card[];
	img: string;
	animation: string;
	isSelect: boolean;

	constructor(img: string) {
		this.cards = [];
		this.img = img;
		this.animation = "";
		this.isSelect = false;
	}
	abstract async cardsGenerate(count: number): void;
}
