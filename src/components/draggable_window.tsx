/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";

export default function DraggableWindow({
	children,
	src,
	props
}: {
	children: React.ReactElement;
	src: string;
	props: any;
}): React.ReactElement {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [audioPlaying, setAudioPlaying] = useState(true);

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
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [audioPlaying]);

	return (
		<div style={{ width: "100%", height: "100%" }} {...props}>
			{children}
			<audio ref={audioRef} src={src} loop autoPlay controls={false}></audio>
		</div>
	);
}

