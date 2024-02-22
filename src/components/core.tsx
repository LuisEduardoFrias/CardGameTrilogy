/** @format */
"use client";

import { useState } from "react";
import Category from "dm/category";
import Game from "cp/game";
import Menu from "cp/menu";

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
