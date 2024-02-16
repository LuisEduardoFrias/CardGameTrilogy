/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";
import DraggableWindow from "cp/draggable_window";
import Button from "cp/button";
import SoundClick from "cp/sound_click";
import Styles from "st/menu.module.css";

export default function Menu(): React.ReactElement {
	const categorys = ["digimon.jpg", "pokemon.jpg", "yugioh.jpg"];

	function handleClick() {}

	return (
		<DraggableWindow src='menu_music.mp3'>
			<div className={Styles.background}>
				<div className={Styles.container}>
					<span className={Styles.title}>Select categorys</span>
					<div className={Styles.containerCategory}>
						{categorys.map((cat: string, index: number) => (
							<SoundClick src='select_card.mp3'>
								<div key={index} className={`${Styles.cardOption}`}>
									<img
										loading='lazy'
										src={cat}
										className={Styles.img}
										alt={cat}
									/>
								</div>
							</SoundClick>
						))}
					</div>
					<Button onClick={handleClick} title='Start' />
				</div>
			</div>
		</DraggableWindow>
	);
}
