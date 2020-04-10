import React, { Component } from "react";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import moment from "moment";
import { Link } from "@reach/router";

import { fetchLines } from "../utils/api";

export default class Table extends Component {
	dataSub;

	state = {
		lines: [],
		lastUpdated: new Date()
	};

	componentDidMount() {
		this.dataSub = timer(0, 60000)
			.pipe(switchMap(() => fetchLines()))
			.subscribe(({ data }) =>
				this.setState({ lines: data, lastUpdated: new Date() })
			);
	}

	componentWillUnmount() {
		if (this.dataSub) this.dataSub.unsubscribe();
	}

	render() {
		// console.log(this.state.lines);
		return (
			<div>
				<h5>
					Updated on{" "}
					{moment(this.state.lastUpdated).format("DD MMM YYYY -- HH:mm:ss")}
				</h5>
				<table className="table table-bordered table-dark">
					<thead>
						<tr>
							<th>Line</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.lines.map(i => {
							return (
								<tr key={i.id}>
									<td>{i.name}</td>
									<td>
										{i.lineStatuses.map((s, i) => (
											<p key={s.statusSeverityDescription + i}>
												{s.statusSeverityDescription}
											</p>
										))}
									</td>
									<td>
										<Link to={`/${i.id}`}>
											<button type="button" className="btn btn-link">
												More Information
											</button>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
