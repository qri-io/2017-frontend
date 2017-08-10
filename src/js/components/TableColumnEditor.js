import React, { PropTypes } from 'react';

import ValidInput from './form/ValidInput'
;
import SelectDataType from './SelectDataType';

export default class TableColumnEditor extends React.Component {
	render() {
		const { name, columns, onChange } = this.props;
		return (
			<div className="tableColumnEditor">
				{columns.map((column, i) => {
					return (
						<div className="column" key={i}>
							<ValidInput name="name" value={column.name} onChange={(_, value, e) => {
								let change = columns.slice(0,columns.length)
								change.splice(i,1, Object.assign({}, column, { name : value }))
								onChange(name,change,e)
							}} />
							<SelectDataType name="type" value={column.type} onChange={(_, value, e) => {
								let change = columns.slice(0,columns.length)
								change.splice(i,1, Object.assign({}, column, { type : value }))
								onChange(name,change,e)
							}} />
							<a className="remove" onClick={(e)=>{
								const change = columns.slice(0,columns.length)
								change.splice(i,1)
								onChange(name, change, e) 
							}}>remove</a>
						</div>
					);
				})}
				<button className="btn btn-small btn-success" onClick={(e)=>{
					e.preventDefault();
					onChange(name, columns.concat([{ name : "", type : "" }]), e) 
				}}>+</button>
			</div>
		);
	}
}

TableColumnEditor.propTypes = {
	name : PropTypes.string.isRequired,
	columns : PropTypes.array.isRequired,
	validation : PropTypes.array,

	onChange : PropTypes.func.isRequired
}

TableColumnEditor.defaultProps = {
	
}