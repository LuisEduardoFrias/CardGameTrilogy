/** @format */

import { useState } from "react";
import Game from "cp/game";
import Menu from "cp/menu";

const enum CoreState {
	game = "game",
	menu = "menu"
}

export default function Core() {
	//
	const [state, setState] = useState(CoreState.menu);
	const [startupData, setStartupData] = useState({});

	return (
		<>{state == CoreState.menu ? <Menu setStartupData /> : <Game startupData />}</>
	);
}
