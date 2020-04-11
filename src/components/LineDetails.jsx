import React, { Component } from "react";
import { timer } from "rxjs";
import moment from "moment";
import { switchMap } from "rxjs/operators";
import { Link } from "@reach/router";

import { fetchLine } from "../utils/api";

export default class LineDetails extends Component {
	dataSub;

	state = {
		line: {},
		reason: "",
		lastUpdated: new Date()
	};

	componentDidMount() {
		this.dataSub = timer(0, 60000)
			.pipe(switchMap(() => fetchLine(this.props.lineId)))
			.subscribe(({ data }) => {
				// console.log(data[0])
				this.setState({
					line: data[0],
					reason: data[0].lineStatuses[0].reason,
					lastUpdated: new Date()
				});
			});
	}

	componentWillUnmount() {
		if (this.dataSub) this.dataSub.unsubscribe();
	}

	render() {
		return (
			<div>
				<h5>
					Updated on{" "}
					{moment(this.state.lastUpdated).format("DD MMM YYYY -- HH:mm:ss")}
				</h5>
				<h3>{this.state.line.name}</h3>
				<p>{this.state.reason}</p>
				<Link to={"/"}>
					<button type="button" className="btn btn-light">
						Back
					</button>
				</Link>
			</div>
		);
	}
}
