/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import Core from "./components/core";
import styles from "./styles/main.module.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<main className={styles.main}>
			<Core />
		</main>
	</React.StrictMode>
);
