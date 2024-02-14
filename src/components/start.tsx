/** @format */

import { State } from "cp/game";
import Styles from "st/start.module.css";

export default function Start({
	setState
}: {
	setState: (value: boolean) => void;
}) {
	function handleClick() {
		setState(State.start);
	}

	return (
		<div className={Styles.place}>
			<button
				className={`${Styles.btn} btn silver_metal`}
				onClick={handleClick}>
				Start
			</button>
		</div>
	);
}
