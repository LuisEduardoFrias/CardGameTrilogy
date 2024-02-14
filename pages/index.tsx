/** @format */

import Head from "next/head";
import styles from "st/Home.module.css";
import Game from "cp/game";

export default function Home() {
	return (
		<>
			<Head>
				<title>Memory Game</title>
				<meta
					name='description'
					content='MemoryGame is a card game where you search for pairs and use your memory.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Game />
			</main>
		</>
	);
}
