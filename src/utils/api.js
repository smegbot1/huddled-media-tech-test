import axios from "axios";

export const fetchLines = () =>
	axios.get(
		"https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6"
	);

export const fetchLine = lineId =>
	axios.get(
		`https://api.tfl.gov.uk/Line/${lineId}/Status?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6`
	);
