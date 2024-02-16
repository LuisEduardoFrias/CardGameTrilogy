/** @format */

import React, { useRef, useEffect } from "react";

export default function DraggableWindow({
	children,
	audios,
	props
}: {
	children: React.ReactElement;
	audios: string[];
	props: any;
}): React.ReactElement {
	const audioRefs: React.MutableRefObject<HTMLAudioElement>[] = audios.map(() =>
		useRef<HTMLAudioElement>(null)
	);

	useEffect(() => {
		audios.forEach((src, index) => {
			if (audioRefs[index].current) {
				audioRefs[index].current.src = src;
				audioRefs[index].current.loop = true;
				audioRefs[index].current.play();
			}
		});

		function handleVisibilityChange() {
			if (document.hidden) {
				audioRefs.forEach(ref => {
					if (ref.current) ref.current.pause();
				});
			} else {
				audioRefs.forEach(ref => {
					if (ref.current) ref.current.play();
				});
			}
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [audios, audioRefs]);

	return (
		<div style={{ width: "100%", height: "100%" }} {...props}>
			{children}
			{audios.map((src: string, index: number) => (
				<audio
					key={index}
					ref={audioRefs[index]}
					autoPlay={true}
					controls={false}
				/>
			))}
		</div>
	);
}
