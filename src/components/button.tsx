/** @format */

export default function Button(props) {
	return (
		<button className='btn blue_metal' {...props}>
			<span className='black_metal_text'>{props.title}</span>
		</button>
	);
}
