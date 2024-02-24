/** @format */

"use client";

import React, { useRef, useEffect } from "react";
import useSound from "dm/use_sound";

export default function SoundClick({
	children,
	src
}: {
	children: React.ReactNode;
	src: string;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [ sound ] = useSound();

	useEffect(() => {
		alert("SoundClick: " + JSON.stringify(sound));
		if (audioRef.current) {
			audioRef.current.src = src;
			audioRef.current.loop = false;
			audioRef.current.volume = sound.volume / 100;
			audioRef.current.muted = sound.desactivated;
		}
	}, [sound]);

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
