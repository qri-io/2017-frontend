import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import InteractiveForceGraph from '../components/InteractiveForceGraph'
import ForceGraphNode from '../components/ForceGraphNode'
import ForceGraphLink from '../components/ForceGraphLink'

class Namespace extends Component {
	constructor(props) {
		super(props);

		[].forEach(m => this[m] = this[m].bind(this));
	}


	render() {
		const { } = this.props;

		return (
			<div className="namespace">
				<InteractiveForceGraph simulationOptions={{ height: 300, width: 300 }}>
				  <ForceGraphNode node={{ id: 'first-node' }} fill="red" />
				  <ForceGraphNode node={{ id: 'second-node' }} fill="blue" />
				  <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
				</InteractiveForceGraph>
			</div>
		);
	}
}

Namespace.propTypes = {
}

Namespace.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	return {}
}

export default connect(mapStateToProps, {
})(Namespace);