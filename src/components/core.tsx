/** @format */
"use client";

import { useState } from "react";
import Category from "../domain/category";
import Game from "./game";
import Menu from "./menu";

export const enum CoreState {
	Game = "Game",
	Menu = "Menu"
}

export default function Core() {
	const [coreState, setCoreState] = useState(CoreState.Menu);
	const [category, setCategory] = useState<Category>();

	return (
		<div>
			{coreState === CoreState.Menu ? (
				<Menu
					key='menu'
					setCoreCategory={setCategory}
					setCoreState={setCoreState}
				/>
			) : (
				<Game key='game' category={category} setCoreState={setCoreState} />
			)}
		</div>
	);
}
