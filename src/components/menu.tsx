/** @format */
"use client";

import React, { useState } from "react";
import { CoreState } from "cp/core";
import SelectCategoryCard from "cp/select_category_card";
import WindowSound from "cp/window_sound";
import LoadingTransition from "cp/loading_transition";
import Button from "cp/button";
import Category from "dm/category";
import Yugioh from "dm/yugioh";
import Pokemon from "dm/pokemon";
import Digimon from "dm/digimon";
import Styles from "st/menu.module.css";

const initCategory: Category[] = [
	new Yugioh("yugioh.jpg"),
	new Pokemon("pokemon.jpg"),
	new Digimon("digimon.jpg")
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
				<WindowSound src='menu_music.mp3'>
					<div className={Styles.background}>
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
					</div>
				</WindowSound>
			</LoadingTransition>
		</>
	);
}
