/** @format */

export enum CardState {
	show,
	hidden
}

export default class Card {
	readonly id: string;
	readonly name: string;
	readonly img_url: string;
	readonly state: CardState;
	//
	constructor(id: string, name: string, img_url: string) {
		this.id = id;
		this.name = name;
		this.img_url = img_url;
		this.state = CardState.hidden;
	}
}
