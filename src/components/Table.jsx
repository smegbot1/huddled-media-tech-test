import React, { Component } from "react";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Link } from "@reach/router";

import { fetchLines } from "../utils/api";
import { Loader } from "./Loader";
import { UpdatedOn } from "./UpdatedOn";

export default class Table extends Component {
	dataSub;

	state = {
		lines: null,
		lastUpdated: new Date(),
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
		if (!this.state.lines) return <Loader />;

		return (
			<div>
				<UpdatedOn lastUpdated={this.state.lastUpdated} />
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Line</th>
							<th scope="col">Status</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{this.state.lines.map((i) => {
							return (
								<tr key={i.id}>
									<th scope="row">{i.name}</th>
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
