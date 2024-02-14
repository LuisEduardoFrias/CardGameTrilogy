/** @format */

import { useState } from "react";
import { State } from "cp/game";
import Styles from "st/timer.module.css";

export default function Timer({
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

	return (
		<span className={timer}>
			{"Time: "}
			{timer}
		</span>
	);
}
