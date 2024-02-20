/** @format */

export default function Loading({ className }: { className: string }) {
	return (
		<div className={`container-loader ${className}`}>
			<div className='custom-loader'></div>
		</div>
	);
}
