/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";
import Styles from "st/menu.module.css";
import DraggableWindow from "cp/draggable_window";
import Button from "cp/button";

export default function Menu(): React.ReactElement {
	const categorys = ["digimon.jpg", "pokemon.jpg", "yugioh.jpg"];

	function handleClick() {}

	return (
		<DraggableWindow audios={["in_game.mp3"]}>
			<div className={Styles.background}>
				<div className={Styles.container}>
					<span className={`${Styles.title} `}>
						Select categorys
					</span>
					<div className={Styles.containerCategory}>
						{categorys.map((cat: string, index: number) => (
							<div
								key={index}
								className={`${Styles.cardOption}`}
								onClick={handleClick}>
								<img
									loading='lazy'
									src={cat}
									className={Styles.img}
									alt={cat}
								/>
							</div>
						))}
					</div>
					<Button title='Start' />
				</div>
			</div>
		</DraggableWindow>
	);
}
