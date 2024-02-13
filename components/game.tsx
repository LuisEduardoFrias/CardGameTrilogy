/** @format */

import { useState, useEffect } from "react";
import DrawCard from "./draw_card";
import Level from "../domain/level";

enum State {
	start,
	stop,
	gameover
}

type _Find = {
	key: string;
	value: boolean;
	setState: (value: boolean) => void;
};

export default function () {
	const [level, setLevel] = useState(new Level());
	const [state, setState] = useState(State.stop);
	const [find, setFind] = useState([]);

	function Find(cardId: string, setState: () => void) {
		setFind((prev: _Find[]) => {
			const indexkey = prev.findIndex((find: _Find) => find.key === cardId);

			const indexValue = prev.findIndex((find: _Find) => find.value === false);

			if (indexkey >= 0 || indexValue >= 0) {
				if (prev[indexkey]?.key === cardId) {
					prev[indexkey].value = true;
				} else {
					prev[indexValue].setState();
					setState();
					prev.splice(indexValue, 1);
				}
			} else {
				prev.push({ key: cardId, value: false, setState });
			}

			return [...prev];
		});

		level.cards.length;
	}

	useEffect(() => {
		const duplicCards: Card[] = level.cards.concat(level.cards.slice());

		const newArray: Card[] = [];

		for (let i = 0; i < duplicCards.length; i++) {
			let randomIndex = Math.floor(Math.random() * duplicCards.length);
			newArray.splice(randomIndex, 0, duplicCards[i]);
		}

		setLevel(prev => {
			return { ...prev, cards: newArray };
		});
	}, []);

	const _style = { position: "relative" };

	return (
		<div style={_style}>
			<Timer time={level.time} state={state} setState={setState} />
			{state == State.stop && <Start setState={setState} />}
			{state == State.gameover && <GameOver setState={setState} />}
			<div
				style={{
					marginTop: "40px",
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					gap: "20px",
					width: "100%",
					height: "100%",
					border: "1px solid blue",
					padding: "20px",
					perspective: "10000px"
				}}>
				{level?.cards?.map((card: Card, index: number) => (
					<DrawCard key={index} card={card} find={Find} />
				))}
			</div>
		</div>
	);
}

function Timer({
	time,
	state,
	setState
}: {
	time: number;
	state: State;
	setState: (value: boolean) => void;
}) {
	const [timer, setTimer] = useState(time);

	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (timer <= 0) {
				setState(State.gameover);
				setTimer(time);
			} else if (state == State.start) {
				setTimer(timer - 1);
			}
		}, 1000);
	});

	const _styles: React.CSSProperties = {
		fontSize: "11px",
		whiteSpace: "nowrap",
		paddingRight: "10px"
	};

	return (
		<span style={_styles}>
			{"Time: "}
			{timer}
		</span>
	);
}

function Start({ setState }: { setState: (value: boolean) => void }) {
	function handleClick() {
		setState(State.start);
	}

	const _styles = {
		position: "absolute",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%",
		backgroundColor: "#2b2b2b7a",
		filter: "blur(5)",
		zIndex: "9",

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	const _btStyle = {
		width: "150px",
		height: "50px",
		fontSize: "20px",
		fontWeight: "900",
		backgroundColor: "silver",
		color: "black",
		border: "3px solid #7c7979",
		borderRadius: "10px"
	};

	return (
		<div style={_styles}>
			<button style={_btStyle} onClick={handleClick}>
				Start
			</button>
		</div>
	);
}

function GameOver({ setState }: { setState: (value: boolean) => void }) {
	function handleClick() {
		setState(State.start);
	}

	const _styles = {
		position: "absolute",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%",
		backgroundColor: "#2b2b2b7a",
		filter: "blur(5)",
		zIndex: "9",

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	const _btStyle = {
		width: "150px",
		height: "50px",
		fontSize: "20px",
		fontWeight: "900",
		backgroundColor: "silver",
		color: "black",
		border: "3px solid #7c7979",
		borderRadius: "10px"
	};

	return (
		<div style={_styles}>
			<span>Game Over</span>
			<button style={_btStyle} onClick={handleClick}>
				Restart
			</button>
		</div>
	);
}
