/** @format */
"use client";

import React, { useState } from "react";
import { CoreState } from "./core";
import SelectCategoryCard from "./select_category_card";
import WindowSound from "./window_sound";
import LoadingTransition from "./loading_transition";
import Button from "./button";
import Category from "../domain/category";
import Yugioh from "../domain/yugioh";
import Pokemon from "../domain/pokemon";
import Digimon from "../domain/digimon";
import Styles from "../styles/menu.module.css";

const initCategory: Category[] = [
	new Yugioh("./images/yugioh.jpg"),
	new Pokemon("./images/pokemon.jpg"),
	new Digimon("./images/digimon.jpg")
];

function cloneInitialState(): Category[] {
	return initCategory.map((cat: Category, i: number) => {
		return cat.clone();
	});
}

export default function Menu({
	setCoreCategory,
	setCoreState
}: {
	setCoreCategory: (value: Category) => void;
	setCoreState: (value: CoreState) => void;
}): React.ReactElement {
	//
	const [btnDesabled, setBtnDesabled] = useState(true);
	const [categorys, setCategorys] = useState<Category[]>(cloneInitialState());

	function handleClick() {
		let categorySeleted: Category = undefined;

		setCategorys((prev: Category[]) => {
			const newCategory: Category = [...prev];
			newCategory.forEach((cat: Category) => {
				if (cat.isSelect === true) {
					cat.animation = "select";
					categorySeleted = cat.clone();
				}
			});
			return [...newCategory];
		});

		setTimeout(() => {
			if (categorySeleted !== undefined) {
				setCoreCategory(categorySeleted.clone());
				setCoreState(CoreState.Game);
			}
		}, 1000);

		setTimeout(() => {
			setCategorys(cloneInitialState());
			setBtnDesabled(true);
		}, 1000);
	}

	return (
		<>
			<LoadingTransition>
				<WindowSound src='./audios/menu_music.mp3'>
					<div className={Styles.background}>
					</div>
						<div className={Styles.container}>
							<span className={Styles.title}>Select categorys</span>
							<div className={Styles.containerCategory}>
								<SelectCategoryCard
									categorys={categorys}
									setCategorys={setCategorys}
									setBtnDesabled={setBtnDesabled}
								/>
							</div>
							<Button
								disabled={btnDesabled}
								onClick={handleClick}
								title='Start'
							/>
						</div>
				</WindowSound>
			</LoadingTransition>
		</>
	);
}
