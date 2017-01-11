import React, { PropTypes } from 'react'

function removeStdCols(fields, show) {
	return (a,b,i) => {
		if (!show) {
			const colName = fields[i].name
			if (colName == "id" || colName == "created" || colName == "updated") {
				return a
			}
		}
		a.push(b);
		return a;
	}
}

export default class FieldsList extends React.Component {
	render() {
		const { fields, showStdCols } = this.props
		return (
			<div className="fields table">
				{fields.map((field, i) => {
					return (
						<div key={i} className="field">
							<h5 className="name blue">{ field.name }</h5>
							<p className={`type dt-${field.type}`}>{field.type}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

FieldsList.propTypes = {
	fields : PropTypes.array.isRequired,
}

FieldsList.defaultProps = {

}