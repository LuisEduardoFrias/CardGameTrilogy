/** @format */
"use client";

export default function Button({
	title,
	textClass,
	...rest
}: {
	title: string;
	textClass?: string;
	[key: string]: any;
}) {
	const styles = {
		cursor: "pointer",
		userSelect: "none"
	};
	return (
		<button style={styles} className='btn blue_metal' {...rest}>
			<span
				style={styles}
				className={` ${rest.disabled ? "disabled" : ""} ${
					textClass ? textClass : "black_metal_text"
				}`}>
				{title}
			</span>
		</button>
	);
}
