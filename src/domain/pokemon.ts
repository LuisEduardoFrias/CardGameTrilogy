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
			const response1: any = await fetch(this.URL1);
			const responseData1: object = await response1.json();
			const data: object[] = responseData1.results;

			for (let i = 0; i < count; i++) {
				const index = Math.floor(Math.random() * data.length);
				const selectedData = data.splice(index, 1)[0];

				const response2: any = await fetch(
					this.URL2.replace("{name}", selectedData.name)
				);

				const responseData2: object = await response2.json();

				this.cards.push(
					new Card(
						`${i}-${selectedData.name}`,
						selectedData.name,
						responseData2.sprites.front_default
					)
				);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}
}
