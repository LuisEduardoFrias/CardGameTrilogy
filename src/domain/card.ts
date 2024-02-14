/** @format */

export enum State {
	show,
	hidden
}

export default class Card {
	id: string;
	name: string;
	img_url: string;
	state: State;
	//
	constructor(id: string, name: string, img_url: string) {
		this.id = id;
		this.name = name;
		this.img_url = img_url;
		this.state = State.hidden;
	}

	showCard() {
		this.state = State.show;
	}

	hiddenCard() {
		this.state = State.hidden;
	}
}
