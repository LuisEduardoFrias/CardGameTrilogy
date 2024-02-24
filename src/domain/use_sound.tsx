/** @format */
"use client";

import { useReducer, useEffect } from "react";

export type Audio = {
	desactivated: boolean;
	volume: number;
};

const enum Action {
	sound = "sound",
	music = "music"
}

const initialState = {
	sound: { desactivated: false, volume: 100 },
	music: { desactivated: false, volume: 100 }
};

function reducer(state, action) {
	const _reduce = {
		sound: () => {
			alert("volume reducer: " + JSON.stringify(state));
			globalState = { ...state, sound: action.value };
			return globalState;
		},
		music: () => {
			globalState = { ...state, music: action.value };
			return globalState;
		}
	};

	return _reduce[action.type]();
}

function init(): object {
	if (!globalState) globalState = initialState;
	return globalState;
}

let globalState: object = undefined;

export default function useSound() {
	const [state, dispatch] = useReducer(reducer, init());

	useEffect(() => {
		alert("useEffect");
		alert(JSON.stringify(globalState));
	}, [state]);

	function setSound(callback: (audio: Audio) => void) {
		dispatch({ type: Action.sound, value: callback(globalState.sound) });
	}

	function setMusic(callback: (audio: Audio) => void) {
		dispatch({ type: Action.music, value: callback(globalState.music) });
	}

	return [
		globalState.sound,
		globalState.music,
		setSound,
		setMusic
	]
}
