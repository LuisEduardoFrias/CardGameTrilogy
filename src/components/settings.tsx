/** @format */
import Button from "cp/button";
import Styles from "st/settings.module.css";
import { GameState } from "cp/game";
import useSound, { Audio } from "dm/use_sound";

export default function Settings({
	setGameState
}: {
	setGameState: (value: GameState) => void;
}) {
	const [ sound, music, setSound, setMusic ]= useSound();

	function handleChange(event: any) {
		const name = event.target.name;
		const type = event.target.type;
		const value = event.target.value;

		if (type === "checkbox") {
			if (name === "sound") {
				setSound((prev: Audio) => {
					return { ...prev, desactivated: value === "on" ? false : true };
				});
			} else {
				setMusic((prev: Audio) => {
					return { ...prev, desactivated: value === "on" ? false : true };
				});
			}
		} else {
			if (name === "sound") {
				setSound((prev: Audio) => {
					return { ...prev, volume: value };
				});
			} else {
				setMusic((prev: Audio) => {
					return { ...prev, volume: value };
				});
			}
		}
	}

	return (
		<div className={Styles.setting}>
			<div className={Styles.control}>
				<label>Música 🔊</label>
				<input
					type='checkbox'
					name='music'
					defaultChecked
					onChange={handleChange}
				/>
				<input
					type='range'
					name='music'
					min='0'
					max='1'
					step='0.1'
					defaultValue='100'
					onChange={handleChange}
				/>
			</div>
			<div className={Styles.control}>
				<label>Sonidos 🎶</label>
				<input
					type='checkbox'
					name='sound'
					defaultChecked
					onChange={handleChange}
				/>
				<input
					type='range'
					name='sound'
					min='0'
					max='1'
					step='0.1'
					defaultValue='100'
					onChange={handleChange}
				/>
			</div>
			<Button
				title='🔙'
				onClick={() => {
					setGameState(GameState.pause);
				}}
			/>
		</div>
	);
}
