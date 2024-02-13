/** @format */
import { useState, useEffect } from "react";
import Card, { State } from "../domain/card";

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

	return (
		<div
			style={{
				transform: `rotateY(${_card.state === State.show ? "180" : "0"}deg)`,
				transition: "transform 1s ease",
				background:
					"linear-gradient(230deg, rgba(233,194,8,1) 0%, rgba(203,186,27,1) 10%, rgba(255,255,144,1) 22%, rgba(165,130,18,1) 39%, rgba(195,179,26,1) 60%, rgba(165,130,18,1) 74%, rgba(188,160,27,1) 100%)",
				boxSizing: "border-box",
				width: "100px",
				height: "150px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
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
				style={{
					with: "100%",
					height: "100%",
					opacity: `${_card.state === State.show ? "1" : "0"}`,
					transition: "opacity 1s ease"
				}}
			/>
		</div>
	);
}

function Clone(obj: object) {
	const newObj = JSON.parse(JSON.stringify(obj));
	Object.getOwnPropertyNames(obj).forEach((key: string) => {
		if (typeof obj[key] === "function") Reflect.set(newObj, key, obj[key]);
	});
	return;
}
