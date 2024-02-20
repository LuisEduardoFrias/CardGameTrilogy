/** @format */
"use client";

import { useState, useEffect } from "react";
import Category from "dm/category";
import Game from "cp/game";
import Menu from "cp/menu";

export const enum CoreState {
	game = "game",
	menu = "menu"
}

export default function Core() {
	//
	const [state, setState] = useState(CoreState.menu);
	const [startupData, setStartupData] = useState<Category>(null);

	useEffect(() => {
		//if (startupData !== null) setState(CoreState.game);
	}, [startupData]);

	return (
		<>
			{state == CoreState.menu ? (
				<Menu setStartupData={setStartupData} setCoreState={setState} />
			) : (
				<Game startupData={startupData} setCoreState={setState} />
			)}
		</>
	);
}
