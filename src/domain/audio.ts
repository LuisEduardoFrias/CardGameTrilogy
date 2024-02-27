/** @format */

export type Audio = {
	muted: boolean;
	volume: number;
};

export const enum Action {
	sound = "sound",
	music = "music"
}

export const initialState = {
	sound: { muted: false, volume: 100 },
	music: { muted: false, volume: 100 }
};

export function reducer(state, action) {
	const _reduce = {
		sound: () => {
			return { ...state, sound: action.value };
		},
		music: () => {
			return { ...state, music: action.value };
		}
	};

	return _reduce[action.type]();
}
