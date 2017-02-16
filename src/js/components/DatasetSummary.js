import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class DatasetDetails extends React.Component {
	render() {
		const { dataset } = this.props;
		return (
			<div className="dataset detail">
				<hr className="red" />
				<Link to={"/" + dataset.address.replace(/\./gi, "/")}>
					<h3>{dataset.name}</h3>
					<p>{dataset.address}</p>
				</Link>
				<p>{dataset.description}</p>
			</div>
		);
	}
}

DatasetDetails.propTypes = {
	dataset: PropTypes.object,
}

DatasetDetails.defaultProps = {

}