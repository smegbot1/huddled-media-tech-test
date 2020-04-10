import axios from "axios";

// export const fetchAllLines = () =>
// 	Promise.all(
// 		axios.get(
// 			"https://api.tfl.gov.uk/Line/Mode/tube?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6"
// 		),
// 		axios.get(
// 			"https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6"
// 		)
// 	);

// export const fetchAllLines = () =>
// 	axios.get(
// 		"https://api.tfl.gov.uk/Line/Mode/tube?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6"
// 	);

export const fetchLines = () =>
	axios.get(
		"https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6"
	);
