/** @format */

import Category from "./category";
import Card from "./card";

export default class Digimon extends Category {
	URL: string = "https://digimon-api.vercel.app/api/digimon";
	constructor(img: string) {
		super(img);
	}

	async cardsGenerate(count: number): Promise<void> {
		try {
			const response1: any = await fetch(this.URL);
			const responseData1: object = await response1.json();
			const data: object[] = responseData1;

			for (let i = 0; i < count; i++) {
				const index = Math.floor(Math.random() * data.length);
				const selectedData = data.splice(index, 1)[0];

				const name: string = selectedData.name;

				this.cards.push(new Card(`${index}-${name}`, name, selectedData.img));
			}
		} catch (error) {
			alert("error: " + error);
			console.error("Error fetching data:", error);
		}
	}
}
