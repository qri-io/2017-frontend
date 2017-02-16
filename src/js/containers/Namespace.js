import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadDatasets } from '../actions/dataset';
import { treeNodes, treeConnections, selectDatasetTree } from '../selectors/dataset';

import InteractiveForceGraph from '../components/InteractiveForceGraph'
import ForceGraphNode from '../components/ForceGraphNode'
import ForceGraphLink from '../components/ForceGraphLink'

class Namespace extends Component {
	constructor(props) {
		super(props);

		[].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadDatasets();
	}

	render() {
		const { nodes, connections } = this.props;

		return (
			<div className="namespace">
				<InteractiveForceGraph simulationOptions={{ height: 300, width: 300 }}>
					{nodes.map((node, i) => {
					  return (<ForceGraphNode key={`node-${i}`} node={node} fill="red" />);
					})}
				  {connections.map((c, i) => {
				  	return (<ForceGraphLink key={`link-${i}`} link={c} />);
				  })}
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
	const tree = selectDatasetTree(state);
	return {
		nodes : treeNodes(tree),
		connections : treeConnections(tree),
	}
}

export default connect(mapStateToProps, {
	loadDatasets
})(Namespace);