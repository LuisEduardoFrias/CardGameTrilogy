/** @format */
"use client";

import React, { useRef, useEffect } from "react";
import { initialState, reducer } from "../domain/audio";
import useSuperState from "../domain/use_super_state";

export default function Sound({
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
			audioRef.current.play();
			audioRef.current.volume = state.sound.volume / 100;
			audioRef.current.muted = state.sound.muted;
		}
	}, []);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{children}
			<audio ref={audioRef} autoPlay src={src} controls={false}></audio>
		</div>
	);
}
