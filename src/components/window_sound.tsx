/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { initialState, reducer } from "../domain/audio";
import useSuperState from "../domain/use_super_state";

export default function WindowSound({
	children,
	src,
	...rest
}: {
	children: React.ReactElement;
	src: string;
	[key: string]: any;
}): React.ReactElement {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [audioPlaying, setAudioPlaying] = useState(true);
	const [state, dispatch] = useSuperState(reducer, initialState, ["music"]);

	useEffect(() => {
		if (audioPlaying && audioRef.current) {
			audioRef.current.play();
		}
	}, []);

	const handleVisibilityChange = () => {
		if (document.hidden) {
			setAudioPlaying(false);
		} else {
			setAudioPlaying(true);
		}
	};

	useEffect(() => {
		if (audioRef.current) {
			if (audioPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
			audioRef.current.volume = state.music.volume / 100;
			audioRef.current.muted = state.music.muted;
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [audioPlaying, state]);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				position: "relative",
				boxSizing: "border-box"
			}}
			{...rest}>
			{children}
			<audio ref={audioRef} src={src} loop autoPlay controls={false}></audio>
		</div>
	);
}
