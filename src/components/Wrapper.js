import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Wrapper extends Component {
	constructor(props) {
		super(props);
		browserHistory.push("/");
	}

	render() {
		return (
				<div className="container" key="container">
					{this.props.children}
				</div>
		);
	}
}

export default Wrapper;