import React from "react";
import "./App.css";
import Header from "./components/Header";
import Table from "./components/Table";
import LineDetails from "./components/LineDetails";
import { Router } from "@reach/router";

// import Background from "../public/map-bg.png";

export const App = () => {
	return (
		<div
			className="App"
			// style={{ backgroundImage: "url('/assets/map-bg.png')" }}
		>
			<Header />
			<Router>
				<Table path="/" />
				<LineDetails path=":lineId" />
			</Router>
		</div>
	);
};
