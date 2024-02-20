/** @format */

import Card from "dm/card";
import Category from "dm/category";

export default class Level {
	level: number;
	time: number;
	private readonly category: Category;
	private readonly mult: number = 2;
	private readonly count: number = 6;

	constructor(level: number = 0, category: Category) {
		this.level = level;
		this.time = 18 + Math.pow(level, 2);
		//(10 * (6 + level)) / 2 - 10 * (6 + level) * 0.2;
		this.category = category;
	}

	private async cardsGenerate() {
		await this.category.cardsGenerate(this.count + this.level * this.mult);
	}
}
