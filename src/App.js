import React from "react";
import { Router } from "@reach/router";
import "./App.css";

import Header from "./components/Header";
import Table from "./components/Table";
import LineDetails from "./components/LineDetails";

export const App = () => {
	return (
		<div className="bg-container pb-5">
			<div className="app">
				<Header />
				<main>
					<Router>
						<Table path="/" />
						<LineDetails path=":lineId" />
					</Router>
				</main>
			</div>
		</div>
	);
};
