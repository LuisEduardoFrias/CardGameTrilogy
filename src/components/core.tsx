/** @format */
"use client";

import { useState } from "react";
import Category from "../domain/category";
import Game from "./game";
import Menu from "./menu";
import Styles from "../styles/core.module.css";

export const enum CoreState {
	Game = "Game",
	Menu = "Menu"
}

export default function Core() {
	const [coreState, setCoreState] = useState(CoreState.Menu);
	const [category, setCategory] = useState<Category>();

	return (
		<div className={Styles.core}>
			{coreState === CoreState.Menu ? (
		<div className={Styles.core}>
				<Menu
					key='menu'
					setCoreCategory={setCategory}
					setCoreState={setCoreState}
				/>
		</div>
			) : (
		<div className={Styles.core}>
				<Game key='game' category={category} setCoreState={setCoreState} />
		</div>
			)}
		</div>
	);
}
