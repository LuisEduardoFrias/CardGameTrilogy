/** @format */
"use client";

import React, { useRef, useEffect } from "react";

export default function DraggableWindow({
	children,
	src,
	props
}: {
	children: React.ReactElement;
	src: string;
	props: any;
}): React.ReactElement {
	//
	const MemoizedMovie = React.memo((): React.ReactElement => {
		const audioRef = useRef<HTMLAudioElement>(null);

		function handleVisibilityChange() {
			if (document.hidden) {
				if (audioRef.current) audioRef.current.pause();
			} else {
				if (audioRef.current) audioRef.current.play();
			}
		}

		useEffect(() => {
			if (audioRef.current) {
				audioRef.current.play();
			}

			document.addEventListener("visibilitychange", handleVisibilityChange);

			return () => {
				document.removeEventListener(
					"visibilitychange",
					handleVisibilityChange
				);
			};
		}, []);

		return (
			<audio ref={audioRef} src={src} loop autoplay controls={false}></audio>
		);
	});

	return (
		<div style={{ width: "100%", height: "100%" }} {...props}>
			{children}
			<MemoizedMovie />
		</div>
	);
}
