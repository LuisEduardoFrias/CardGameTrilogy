/** @format */

import { State } from "cp/game";
import Styles from "st/game_over.module.css";

export default function GameOver({
	setState
}: {
	setState: (value: boolean) => void;
}) {
	function handleClick() {
		setState(State.start);
	}

	return (
		<div className={Styles.place}>
			<span>Game Over</span>
			<button className={`${Styles.btn} btn silver_metal`} onClick={handleClick}>
				Restart
			</button>
		</div>
	);
}
