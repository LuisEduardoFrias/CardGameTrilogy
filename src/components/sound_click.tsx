/** @format */

"use client";

import React, { useRef, useEffect } from "react";
import { initialState, reducer } from "../domain/audio";
import useSuperState from "../domain/use_super_state";

export default function SoundClick({
	children,
	src
}: {
	children: React.ReactNode;
	src: string;
}) {
	const [state, dispatch] = useSuperState(reducer, initialState, ["sound"]);

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = src;
			audioRef.current.loop = false;
			audioRef.current.volume = state.sound.volume / 100;
			audioRef.current.muted = state.sound.muted;
		}
	}, []);

	const handleClick = () => {
		if (audioRef.current) audioRef.current.play();
	};

	return (
		<div style={{ width: "100%", height: "100%" }} onClick={handleClick}>
			{children}
			<audio
				ref={audioRef}
				controls={false}
				style={{ display: "none" }}></audio>
		</div>
	);
}
