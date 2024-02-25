/** @format */

export type Audio = {
	desactivated: boolean;
	volume: number;
};

export const enum Action {
	sound = "sound",
	music = "music"
}

export const initialState = {
	sound: { desactivated: false, volume: 100 },
	music: { desactivated: false, volume: 100 }
};

export function reducer(state, action) {
	const _reduce = {
		sound: () => {
			alert("reducer: "+JSON.stringify(state))
			return { ...state, sound: action.value };
		},
		music: () => {
			return { ...state, music: action.value };
		}
	};

	return _reduce[action.type]();
}
