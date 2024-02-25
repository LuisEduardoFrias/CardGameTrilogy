/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { initialState, reducer } from "dm/sound";
import useSuperState from "dm/use_super_state";

export default function DraggableWindow({
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
	const [state, dispatch] = useSuperState(reducer, initialState, ["sound"]);

useEffect(() => {
  alert("componente draggable");
}, [state])

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
			audioRef.current.volume = state.sound.volume / 100;
			audioRef.current.muted = state.sound.desactivated;
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [audioPlaying]);

	return (
		<div style={{ width: "100%", height: "100%" }} {...rest}>
			{children}
			<audio ref={audioRef} src={src} loop autoPlay controls={false}></audio>
		</div>
	);
}
