import React from "react";
import "./App.css";
import Header from "./components/Header";
import Table from "./components/Table";
import { Router } from "@reach/router";

export default function App() {
	return (
		<div className="App">
			<Header />
			<Router>
				<Table path="/" />
			</Router>
		</div>
	);
}
