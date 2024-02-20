/** @format */
"use client";

export default function Button(props: any) {
	const _styles = {
		cursor: "pointer",
		userSelect: "none"
	};
	return (
		<button styele={{ _styles }} className='btn blue_metal' {...props}>
			<span
				styele={{ _styles }}
				className={` ${
					props.disabled && "disabled"
				} ${props?.textClass ? props.textClass : "black_metal_text"}`}>
				{props.title}
			</span>
		</button>
	);
}
