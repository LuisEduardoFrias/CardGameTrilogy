/** @format */

import React, { useReducer } from "react";

//Types
type Action<T extends any, P = undefined> = P extends undefined
	? { type: T }
	: { type: T } & P;
	
type SUBACRIBER = {
	props: string[];
	wasCalled: boolean;
	disp: (action: Action) => object;
};
type Reducer = (state: object, action: Action) => object;

//Constans
const UPDATE_OBTION_ID: string = "__update_obtion_id__";
const SUBACRIBER: SUBACRIBER = {};
const GLOBALSTATE: object = {};

//Compare two objcets
export function Equal(obj1: any, obj2: any) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

//subscribe the components
function subscribe(
	props: string[],
	id: string,
	dispatch: (action: Action) => object
): void {
	if (!SUBACRIBER[id]) {
		Reflect.set(SUBACRIBER, id, {
			props,
			wasCalled: false,
			disp: dispatch
		});
	}
}

//Clone object
function Clone(obj: object) {
	return { ...JSON.parse(JSON.stringify(obj)) };
}

//intermediador del dispatch
function middledistpach(action: Action, reducer: Reducer): void {
	//
	const newState: object = reducer(Clone(GLOBALSTATE), action);

	const changedProperties = getChangedProperties(GLOBALSTATE, newState);

	updateGlobalState(newState, changedProperties);

	changedProperties.forEach((p: string) => {
		for (let key in SUBACRIBER) {
			SUBACRIBER[key].props.forEach((pr: string) => {
				if ((p === pr || pr === "all") && SUBACRIBER[key].wasCalled === false) {
					SUBACRIBER[key].disp({ type: UPDATE_OBTION_ID });
					SUBACRIBER[key].wasCalled = true;
				}
			});
		}
	});

	for (let key in SUBACRIBER) {
		SUBACRIBER[key].wasCalled = false;
	}
}

//retorna las propiedades que an sido actializadas.
function getChangedProperties(oldState: object, newState: object): string[] {
	const changedProperties: string[] = [];
	for (const key in newState) {
		if (!Equal(oldState[key], newState[key])) changedProperties.push(key);
	}
	return changedProperties;
}

//update the global state
function updateGlobalState(
	newState: object,
	modifiedProperties: string[]
): void {
	if (Reflect.ownKeys(GLOBALSTATE).length === 0) {
		Reflect.ownKeys(newState).forEach((key: string) =>
			Reflect.set(GLOBALSTATE, key, newState[key])
		);
	} else {
		modifiedProperties.forEach((key: string) => {
			Reflect.set(GLOBALSTATE, key, newState[key]);
		});
	}
}

//the hook
export default function useSuperState(
	reducer: Reducer,
	initalState: object,
	props: string[],
	postDispatch?: (
		action: Action,
		state: object,
		dispatch: (action: Action) => void
	) => void
) {
	function middlereducer(state: object, action: Action): object {
		//se ejecuta cuando se requiere actializar el estado de determ8nado suscriptor
		if (action.type === UPDATE_OBTION_ID) {
			return {
				...GLOBALSTATE,
				__obtionId__: GLOBALSTATE.__obtionId__
					? GLOBALSTATE.__obtionId__ === 10
						? 0
						: GLOBALSTATE.__obtionId__ + 1
					: 0
			};
		}

		//TODO validar si eventual mente este reducer se ejecuta.
		return reducer(state, action);
	}

	const [state, dispatch] = useReducer(middlereducer, initalState);

	//	console.log("state updated");
	//Octiene el nombre del componente
	const callerFunction = new Error().stack?.split("\n")[2].trim().split(" ")[1];

	//suscribe el componentes
	subscribe(props, callerFunction, dispatch);

	//Inicializa el estado global
	if (Reflect.ownKeys(GLOBALSTATE).length === 0) {
		Reflect.ownKeys(initalState).forEach((e: string) =>
			Reflect.set(GLOBALSTATE, e, initalState[e])
		);
	}

	//Añade el dispatch al suscriptor
	/*	if (!SUBACRIBER[callerFunction].disp) {
	  	Reflect.set(SUBACRIBER[callerFunction], "disp", dispatch);
	} */

	return [
		returnStateForSubscribe(GLOBALSTATE, callerFunction),
		(action: Action) => {
			if (postDispatch) {
				postDispatch(action, GLOBALSTATE, (_action: Action) => {
					middledistpach(_action, reducer);
				});
			} else {
				middledistpach(action, reducer);
			}
		}
	];
}

//retorna el estado con las propiedades especificas a las suscriptas.
function returnStateForSubscribe(state: object, callerFunction: string) {
	const newState = {};
	if (SUBACRIBER[callerFunction])
		SUBACRIBER[callerFunction].props.forEach((pr: string) => {
			if (pr === "all") return state;

			Reflect.set(newState, pr, state[pr]);
		});

	return newState;
}
