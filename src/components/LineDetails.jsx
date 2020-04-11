import React, { Component } from "react";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Link } from "@reach/router";

import { fetchLine } from "../utils/api";
import { Loader } from "./Loader";
import { UpdatedOn } from "./UpdatedOn";

export default class LineDetails extends Component {
	dataSub;

	state = {
		line: null,
		lastUpdated: new Date(),
	};

	componentDidMount() {
		this.dataSub = timer(0, 60000)
			.pipe(switchMap(() => fetchLine(this.props.lineId)))
			.subscribe(({ data }) => {
				this.setState({
					line: data[0],
					lastUpdated: new Date(),
				});
			});
	}

	componentWillUnmount() {
		if (this.dataSub) this.dataSub.unsubscribe();
	}

	render() {
		if (!this.state.line) return <Loader />;

		return (
			<div>
				<UpdatedOn lastUpdated={this.state.lastUpdated} />
				<h3>{this.state.line.name}</h3>
				<p>{this.state.line.lineStatuses[0].reason}</p>
				<Link to={"/"}>
					<button type="button" className="btn btn-light">
						Back
					</button>
				</Link>
			</div>
		);
	}
}
