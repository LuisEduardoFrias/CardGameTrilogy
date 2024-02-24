/** @format */
"use client";

import React, { useRef, useEffect } from "react";
import useSound from "dm/use_sound";

export default function Sound({
	children,
	src
}: {
	children: React.ReactNode;
	src: string;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const { sound } = useSound();

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, []);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{children}
			<audio ref={audioRef} volume={sound.volume}
				muted={sound.activated} autoPlay src={src} controls={false}></audio>
		</div>
	);
}
