/** @format */
import React, { useState, useEffect } from "react";
import Card, { State } from "dm/card";
import Styles from "st/draw_card.module.css";

export default function DrawCard({
	card,
	find
}: {
	card: Card;
	find: (cardId: string, setState: () => void) => void;
}) {
	const [_card, setCard] = useState(card);

	useEffect(() => {
		if (_card.state == State.show) {
			new Promise((resolve, reject) => {
				setTimeout(() => {
					find(card.id, () => {
						setCard((prev: Card) => {
							const newCard: Card = new Card(prev.id, prev.name, prev.img_url);
							newCard.hiddenCard();
							return newCard;
						});
					});
				}, 500);
			});
		}
	}, [_card]);

	const _styles: React.CSSProperties = {
		transform: `rotateY(${_card.state === State.show ? "180" : "0"}deg)`
	};

	return (
		<div
			style={_styles}
			className={`${Styles.card} gold_metal`}
			onClick={() => {
				setCard((prev: Card) => {
					const newCard: Card = new Card(prev.id, prev.name, prev.img_url);
					newCard.showCard();
					return newCard;
				});
			}}>
			<img
				loading
				src={card.img_url}
				className={Styles.img}
				style={{
					opacity: `${_card.state === State.show ? "1" : "0"}`,
					
				}}
			/>
		</div>
	);
}
