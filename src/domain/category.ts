/** @format */

import Card from "./card";

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

	abstract async cardsGenerate(count: number): Promise<void>;

	clone(): this {
		return deepClone(this);
	}
}

function deepClone<T>(obj: T, cloned = new WeakMap()): T {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	if (cloned.has(obj)) {
		return cloned.get(obj);
	}

	if (Array.isArray(obj)) {
		const arr: any[] = [];
		cloned.set(obj, arr);
		for (let i = 0; i < obj.length; i++) {
			arr[i] = deepClone(obj[i], cloned);
		}
		return arr as any as T;
	}

	if (obj instanceof Date) {
		return new Date(obj.getTime()) as any as T;
	}

	if (obj instanceof RegExp) {
		return new RegExp(obj) as any as T;
	}

	const clonedObj: Partial<T> = Object.create(Object.getPrototypeOf(obj));
	cloned.set(obj, clonedObj);
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			clonedObj[key] = deepClone(obj[key], cloned);
		}
	}
	return clonedObj as T;
}
