/** @format */
"use client";

import React, { useRef, useEffect } from "react";

export default function Sound({
	children,
	src
}: {
	children: React.ReactNode;
	src: string;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, []);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{children}
			<audio ref={audioRef} autoPlay src={src} controls={false}></audio>
		</div>
	);
}
