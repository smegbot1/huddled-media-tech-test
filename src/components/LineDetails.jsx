import React, { Component } from "react";
import { timer, from } from "rxjs";
import { switchMap, finalize } from "rxjs/operators";
import { Link } from "@reach/router";

import { fetchLine } from "../utils/api";
import { Loader } from "./Loader";
import { UpdatedOn } from "./UpdatedOn";
import Table from "./Table";

export default class LineDetails extends Component {
	dataSub;
	historyUnsubscribe;

	state = {
		loading: true,
		line: null,
		lastUpdated: new Date(),
	};

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.lineId !== prevProps.lineId) this.getData();
	}

	componentWillUnmount() {
		if (this.dataSub) this.dataSub.unsubscribe();
	}

	getData = () => {
		if (this.dataSub) this.dataSub.unsubscribe();

		this.setState({ loading: true });

		this.dataSub = timer(0, 60000)
			.pipe(
				switchMap(() => {
					return from(fetchLine(this.props.lineId)).pipe(
						finalize(() => this.setState({ loading: false }))
					);
				})
			)
			.subscribe(({ data }) => {
				this.setState({
					line: data[0],
					lastUpdated: new Date(),
				});
			});
	};

	render() {
		return (
			<div>
				<UpdatedOn lastUpdated={this.state.lastUpdated} />
				<div className="position-relative">
					<div className="card text-dark rounded">
						<div className="card-body">
							<h3 className="card-title">
								{this.state.line && this.state.line.name}
							</h3>
							<p className="card-text">
								{this.state.line && this.state.line.lineStatuses[0].reason}
							</p>
							<Link to={"/"}>
								<p className="card-link">&#8249; Back</p>
							</Link>
						</div>
					</div>
					{this.state.line ? (
						<div className="bg-white p-4 rounded mt-2 border">
							<img
								src={`/assets/images/${this.state.line.id}.png`}
								className="w-100"
								alt={this.state.line.name}
							/>
						</div>
					) : null}
					{this.state.loading ? (
						<div
							style={{
								top: 0,
								bottom: 0,
								right: 0,
								left: 0,
								background: "rgba(255, 255, 255, 0.5)",
							}}
							className="position-absolute d-flex align-items-center justify-content-center"
						>
							<Loader />
						</div>
					) : null}
				</div>
				<hr />
				<h3>Other Stations</h3>
				<Table filterId={this.state.line && this.state.line.id} />
			</div>
		);
	}
}
