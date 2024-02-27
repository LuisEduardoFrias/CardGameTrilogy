/** @format */

import React, { useState, useEffect } from "react";
import Loading from "./loading";

export default function LoadingTransition({
	children
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);

	const loadingPromise = new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 1000);
	});

	loadingPromise.then(() => {
		setLoading(false);
	});
	
	useEffect(() => {
		return () => {
			loadingPromise.then(() => {});
		};
	}, []);

	const _styles: React.CSSProperties = {
		width: "100%",
		height: "100%"
	};

	return (
		<>
			<Loading className={`${!loading ? "opacity" : "no-opacity"}`} />
			<div className={`${!loading ? "no-opacity" : "opacity"}`}>{children}</div>
		</>
	);
}
