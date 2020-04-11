import React from "react";
import "./App.css";
import Header from "./components/Header";
import Table from "./components/Table";
import LineDetails from "./components/LineDetails";
import { Router } from "@reach/router";

export const App = () => {
	return (
		<div className="App">
			<Header />
			<Router>
				<Table path="/" />
				<LineDetails path=":lineId" />
			</Router>
		</div>
	);
};
