/** @format */

import Category from "dm/category";
import Card from "dm/card";

export default class Pokemon extends Category {
	URL1: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
	URL2: string = "https://pokeapi.co/api/v2/pokemon/{name}";

	constructor(img: string) {
		super(img);
	}

	async cardsGenerate(count: number): Promise<void> {
		try {
			const response1 = await fetch(this.URL1);
			const responseData1 = await response1.json();

			const data: object[] = responseData1.results;

			for (let i = 0; i < count; i++) {
				const index = Math.floor(Math.random() * data.length);
				const response2 = await fetch(
					this.URL2.replace("{name}", data[index].name)
				);
				const otherData: { name: string; sprites: { front_default: string } } =
					await response2.json();

				this.cards.push(
					new Card(
						`${index}-${otherData.name}`,
						otherData.name,
						otherData.sprites.front_default
					)
				);
			}
		} catch (error) {
			console.error("Error fetching data--: ", error);
		}
	}
}
