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

export default class FieldsTable extends React.Component {
	render() {
		const { fields, showStdCols } = this.props
		return (
			<div class="table-resizable">
				<h6>DATASET FIELDS:</h6>
				<div class="row">
					<table className="table table-bordered table-condensed">
						<thead>
							<tr className="name">
								{fields.map((field, i) => {
									return (<td key={i}><h5 style={{ "marginRight" : 15 }}>{ field.name }</h5></td>);
								})}
							</tr>
							<tr className="type">
								{fields.map((field, i) => {
									return(<td key={i}><h5 style={{ "marginRight" : 15 }}>{ field.type }</h5></td>);
								})}
							</tr>
						</thead>
					</table>
				</div>
			</div>
		);
	}
}

FieldsTable.propTypes = {
	fields : PropTypes.array.isRequired,
	showStdCols: PropTypes.bool.isRequired
}

FieldsTable.defaultProps = {
	showStdCols : false
}