/** @format */
import Button from "./button";
import { GameState } from "./game";
import { initialState, reducer, Audio, Action } from "../domain/audio";
import useSuperState from "../domain/use_super_state";
import Styles from "../styles/settings.module.css";

export default function Settings({
	setGameState
}: {
	setGameState: (value: GameState) => void;
}) {
	const [state, dispatch] = useSuperState(reducer, initialState, [
		"sound",
		"music"
	]);

	function setSound(callback: (audio: Audio) => void) {
		dispatch({ type: Action.sound, value: callback(state.sound) });
	}

	function setMusic(callback: (audio: Audio) => void) {
		dispatch({ type: Action.music, value: callback(state.music) });
	}

	function handleChange(event: any) {
		const name = event.target.name;
		const type = event.target.type;
		const value = event.target.value;
		const checked = event.target.checked;

		if (type === "checkbox") {
			if (name === "sound") {
				setSound((prev: Audio) => {
					return { ...prev, muted: !checked };
				});
			} else {
				setMusic((prev: Audio) => {
					return { ...prev, muted: !checked };
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
				<label className={Styles.label}>Música 🔊</label>
				<input
					className={Styles.input}
					type='checkbox'
					name='music'
					defaultChecked={!state.music.muted}
					onChange={handleChange}
				/>
				<input
					className={Styles.input}
					type='range'
					name='music'
					min='10'
					max='100'
					step='0.1'
					defaultValue={state.music.volume}
					onChange={handleChange}
				/>

				<span className={Styles.span}>{`${state.music.volume}%`}</span>
			</div>
			<div className={Styles.control}>
				<label className={Styles.label}>Sonidos 🎶</label>
				<input
					className={Styles.input}
					type='checkbox'
					name='sound'
					defaultChecked={!state.sound.muted}
					onChange={handleChange}
				/>
				<input
					className={Styles.input}
					type='range'
					name='sound'
					min='10'
					max='100'
					step='0.1'
					defaultValue={state.sound.volume}
					onChange={handleChange}
				/>
				<span className={Styles.span}>{`${state.sound.volume}%`}</span>
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
