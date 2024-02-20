/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";
import DraggableWindow from "cp/draggable_window";
import Button from "cp/button";
import Category from "dm/category";
import Yugioh from "dm/yugioh";
import Pokemon from "dm/pokemon";
import Digimon from "dm/digimon";
import SoundClick from "cp/sound_click";
import Styles from "st/menu.module.css";
import { CoreState } from "cp/core";

const initCategory: Category[] = [
	new Yugioh("yugioh.jpg"),
	new Pokemon("pokemon.jpg"),
	new Digimon("digimon.jpg")
];

export default function Menu({
	setStartupData,
	setCoreState
}: {
	setStartupData: (value: Category) => void;
	setCoreState: (value: CoreState) => void;
}): React.ReactElement {
	//

	const [btnDesabled, setBtnDesabled] = useState(true);
	const [categorys, setCategorys] = useState<Category[]>(initCategory);

	useEffect(() => {
		return () => {
			setCategorys(initCategory);
		};
	}, [categorys]);

	function handleClick() {
		setCategorys((prev: Category[]) => {
			const arr: Category[] = prev.map((cat: Category) => {
				if (cat.isSelect === true) {
					cat.animation = "select";
				}
				return { ...cat };
			});

			return [...arr];
		});

		setTimeout(() => {
			const cats: Category[] = categorys.filter(
				(cat: object) => cat.isSelect === true
			);

			if (cats.length >= 1) {
				setStartupData(cats[0]);
				setCoreState(CoreState.game);
				setTimeout(() => {
					const newcat: Category[] = categorys.map((cat: Category) => {
						if (cat.isSelect === true) {
							cat.animation = "";
							cat.isSelect = false;
						}
						return cat;
					});
					setCategorys([...newcat]);
				}, 200);
				setBtnDesabled(true);
			}
		}, 1000);
	}

	function handleSelect(_cat: any) {
		setCategorys((prev: Category[]) => {
			const arr: Category[] = prev.map((cat: Category) => {
				cat.isSelect = false;
				if (cat.img === _cat.img) {
					setBtnDesabled(false);
					cat.isSelect = true;
				}
				return cat;
			});

			return [...arr];
		});
	}

	return (
		<DraggableWindow src='menu_music.mp3'>
			<div className={Styles.background}>
				<div className={Styles.container}>
					<span className={Styles.title}>Select categorys</span>
					<div className={Styles.containerCategory}>
						{categorys.map((cat: Category, index: number) => (
							<div key={index} className={`${cat.animation}`}>
								<SoundClick src='select_card.mp3'>
									<div
										style={{ zIndex: cat.animation === "" ? "2" : "3" }}
										key={index}
										className={`${Styles.cardOption}`}
										onClick={() => handleSelect(cat)}>
										<img
											loading='lazy'
											src={`${cat.img}`}
											className={Styles.img}
											alt={cat.img}
										/>
									</div>
								</SoundClick>
							</div>
						))}
					</div>
					<Button disabled={btnDesabled} onClick={handleClick} title='Start' />
				</div>
			</div>
		</DraggableWindow>
	);
}
