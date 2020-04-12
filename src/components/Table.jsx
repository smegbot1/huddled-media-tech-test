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
		rawLines: [],
		lines: null,
		lastUpdated: new Date(),
	};

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.filterId !== prevProps.filterId) {
			this.setState({
				lines: this.state.rawLines.filter((item) => {
					if (!this.props.filterId) return true;

					return item.id !== this.props.filterId;
				}),
			});

			if (this.props.loaded) this.props.loaded();
		}
	}

	componentWillUnmount() {
		if (this.dataSub) this.dataSub.unsubscribe();
	}

	getData = () => {
		if (this.dataSub) this.dataSub.unsubscribe();

		this.dataSub = timer(0, 60000)
			.pipe(switchMap(() => fetchLines()))
			.subscribe(({ data }) =>
				this.setState({
					rawLines: data,
					lines: data.filter((item) => {
						if (!this.props.filterId) return true;

						return item.id !== this.props.filterId;
					}),
					lastUpdated: new Date(),
				})
			);
	};

	render() {
		if (!this.state.lines) return <Loader />;

		return (
			<div>
				<UpdatedOn lastUpdated={this.state.lastUpdated} />
				<table
					className="table text-dark bg-white table-bordered mb-0"
					id="table"
				>
					<tbody>
						{this.state.lines.map((i) => {
							return (
								<tr key={i.id}>
									<td>
										<p
											className="font-weight-bold mb-0 line-name"
											id={`${i.id}`}
										>
											{i.name}
										</p>
									</td>
									<td>
										{i.lineStatuses.map((s, index) => {
											const isLast = index === i.lineStatuses.length - 1;
											return !["No Issues", "Good Service"].includes(
												s.statusSeverityDescription
											) ? (
												<p className={!isLast ? "mb-1" : "mb-0"} key={index}>
													<svg
														className="bi bi-exclamation-triangle-fill text-warning"
														width="1em"
														height="1em"
														viewBox="0 0 16 16"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 5zm.002 6a1 1 0 100 2 1 1 0 000-2z"
															clipRule="evenodd"
														/>
													</svg>{" "}
													{s.statusSeverityDescription}
												</p>
											) : (
												<p className={!isLast ? "mb-1" : "mb-0"} key={index}>
													{s.statusSeverityDescription}
												</p>
											);
										})}
									</td>
									<td>
										<Link to={`/${i.id}`}>
											<p className="btn btn-link p-0">More Information</p>
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
