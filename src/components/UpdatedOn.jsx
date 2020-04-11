import React from "react";
import moment from "moment";

export const UpdatedOn = ({ lastUpdated }) => {
	return (
		<h5>Updated on {moment(lastUpdated).format("DD MMM YYYY -- HH:mm:ss")}</h5>
	);
};
