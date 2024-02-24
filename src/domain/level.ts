/** @format */

import Card from "dm/card";
import Category from "dm/category";

export default class Level {
	level: number;
	time: number;
	private readonly category: Category;
	private readonly mult: number = 2;
	private readonly count: number = 6;

	constructor(category: Category, level: number = 0) {
		this.level = level;
		this.time = 18 + level * this.mult * this.count;
		this.category = category;
	}

	private async cardsGenerate() {
		await this.category.cardsGenerate(this.count + this.level * this.mult);
	}
}
