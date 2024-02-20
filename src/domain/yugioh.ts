/** @format */

import Category from "dm/category";

export default class Yugioh extends Category {
	URL1: string =
		"https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=2000-01-01&enddate=2002-08-23&dateregion=tcg";
	URL2: string = "https://images.ygoprodeck.com/images/cards/{id}.jpg";

	constructor(img: string) {
		super(img);
	}

	async cardsGenerate(count: number): Promise<void> {
		try {
			const response1 = await fetch(this.URL1);
			const responseData1 = await response1.json();
			const data: object[] = responseData1.data;

			for (let i = 0; i < count; i++) {
				const index = Math.floor(Math.random() * data.length);

				const response2 = await fetch(
					this.URL2.replace("{id}", data[index].id)
				);
				const otherData: object = await response2.json();

				this.data.push({
					id: data[index].id,
					name: data[index].name,
					url: otherData.sprites.front_default
				});
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}
}
