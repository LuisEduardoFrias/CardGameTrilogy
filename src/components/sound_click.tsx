/** @format */

"use client";

import React, { useRef, useEffect } from "react";

export default function SoundClick({
	children,
	src
}: {
	children: React.ReactNode;
	src: string;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = src;
			audioRef.current.loop = false;
		}
	}, []);

	const handleClick = () => {
		audioRef.current.play();
	};

	return (
		<div style={{ width: "100%", height: "100%" }} onClick={handleClick}>
			{children}
			<audio ref={audioRef} controls={false}></audio>
		</div>
	);
}
