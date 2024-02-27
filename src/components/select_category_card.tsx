/** @format */

import Category from "../domain/category";
import SoundClick from "./sound_click";
import Styles from "../styles/menu.module.css";

export default function SelectCategoryCard({
	categorys,
	setCategorys,
	setBtnDesabled
}: {
	categorys: Category[];
	setCategorys: (value: Category) => void;
	setBtnDesabled: (value: boolean) => void;
}) {
	function handleSelect(_cat: any) {
		setCategorys((prev: Category[]) => {
			const arr: Category[] = prev.map((cat: Category) => {
				cat.isSelect = false;
				if (cat.img === _cat.img) {
					setBtnDesabled(false);
					cat.isSelect = true;
				}
				return cat;
			});

			return [...arr];
		});
	}

	return (
		<>
			{categorys.map((cat: Category, index: number) => (
				<div key={index} className={`${cat.animation}`}>
					<SoundClick src='./audios/select_card.mp3'>
						<div
							key={index}
							style={{ zIndex: "1" }}
							className={`${Styles.cardOption}`}
							onClick={() => handleSelect(cat)}>
							<img
								loading='lazy'
								src={`${cat.img}`}
								className={Styles.img}
								alt={cat.img}
							/>
						</div>
					</SoundClick>
				</div>
			))}
		</>
	);
}
