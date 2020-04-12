import React from "react";

export const Loader = () => {
	return (
		<div className="d-flex align-items-center justify-content-center py-2">
			<div className="spinner-border text-primary">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};
