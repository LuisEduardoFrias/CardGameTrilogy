/** @format */

import Category from "dm/category";

export default class Digimon extends Category {
	URL: string = "https://digimon-api.vercel.app/api/digimon";
	constructor(img: string) {
		super(img);
	}

	async cardsGenerate(count: number): Promise<void> {
		try {
			const response = await fetch(this.URL);
			const responseData = await response.json();
			const data: object[] = responseData.data;

			for (let i = 0; i < count; i++) {
				const index = Math.floor(Math.random() * data.length);
				const name: string = data[index].name;

				this.data.push({
					id: `${index}-${name}`,
					name: name,
					url: data[index].img
				});
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}
}
