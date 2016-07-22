import React, { PropTypes } from 'react'

export default class SchemaTable extends React.Component {
	render() {
		const { schema } = this.props
		return (
			<div class="table-resizable">
				<h3>Schema</h3>
				<div class="row">
					{schema.map( (table, i) => {
						return (
							<div class="col-md-6" key={i}>
								<table class="table table-bordered table-condensed">
									<thead>
										<tr>
											<td colspan="3">
												<h3>{ table.name }</h3>
												<small><em>table</em></small>
											</td>
										</tr>
										<tr>
											<th>Name</th>
											<th>Type</th>
											<th>Description</th>
										</tr>
									</thead>
									<tbody>
										{table.columns.map( (col, i) => {
											return (
												<tr key={i}>
													<td>{ col.name }</td>
													<td>{ col.type }</td>
													<td>{ col.description }</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

SchemaTable.propTypes = {
	schema : PropTypes.array.isRequired
}