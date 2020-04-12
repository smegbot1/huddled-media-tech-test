import React from "react";

export default function Header() {
	return (
		<header>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Underground.svg/1200px-Underground.svg.png"
				alt="logo"
				style={{ maxWidth: "100px", objectFit: "contain" }}
			/>
			<h1 className="m-0">Tube Tracker</h1>
		</header>
	);
}
