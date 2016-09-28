import React, { PropTypes } from 'react'

function removeStdCols(schema, show) {
	return (a,b,i) => {
		if (!show) {
			const colName = schema[i].name
			if (colName == "id" || colName == "created" || colName == "updated") {
				return a
			}
		}
		a.push(b);
		return a;
	}
}

export default class SchemaTable extends React.Component {
	render() {
		const { schema, showStdCols } = this.props
		return (
			<div class="table-resizable">
				<h6>DATASET SCHEMA:</h6>
				<div class="row">
					{schema.map((table, i) => {
						const cols = table.columns.reduce(removeStdCols(table.columns, showStdCols),[])
						return (
							<div class="col-md-6" key={i}>
								<small>TABLE:</small>
								<h3>{ table.name }</h3>
								<small>COLUMNS:</small>
								<table class="table table-bordered table-condensed">
									<thead>
										<tr className="name">
											{cols.map( (col, i) => {
												return (
													<td key={i}><h5 style={{ "marginRight" : 15 }}>{ col.name }</h5></td>
												);
											})}
										</tr>
										<tr className="type">
											{cols.map( (col, i) => {
												return (
													<td key={i}><small className={"dt-" + col.type}>{ col.type }</small></td>
												);
											})}
										</tr>
										<tr classNam="description">
											{cols.map( (col, i) => {
												return (
													<td key={i}>{ col.description }</td>
												);
											})}
										</tr>
									</thead>
								</table>
								<hr />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

SchemaTable.propTypes = {
	schema : PropTypes.array.isRequired,
	showStdCols: PropTypes.bool.isRequired
}

SchemaTable.defaultProps = {
	showStdCols : false
}