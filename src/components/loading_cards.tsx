/** @format */
"use client";

import Loading from "./loading";

export default function LoadingCards() {
	alert("in loading cards");
	return (
		<div
			style={{
				position: "absolute",
				top: "0px",
				left: "0px",
				width: "100%",
				height: "100%",
				backgroundColor: "#2b2b2b7a",
				filter: "blur(5)",
				zIndex: "9",

				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
			<Loading />
		</div>
	);
}
