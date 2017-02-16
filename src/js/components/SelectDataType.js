import React, { PropTypes } from 'react';

export default class SelectDataType extends React.Component {
	render() {
		const { name, value, onChange } = this.props;
		return (
			<select name={name} value={value} onChange={(e) => {onChange(name, e.target.value, e) }}>
				<option value=''>unknown</option>

				<option value="integer">Integer</option>
				<option value="float">Float</option>
				<option value="text">Text</option>
				<option value="date">Date</option>
				<option value="time">Time</option>
				<option value="boolean">Boolean</option>
				
				{/*<option value="smallint">Smallint</option>
				<option value="bigint">Bigint</option>
				<option value="decimal">Decimal</option>
				<option value="numeric">Numeric</option>
				<option value="real">Real</option>
				<option value="double">Double</option>
				<option value="smallserial">Smallserial</option>
				<option value="serial">Serial</option>
				<option value="bigserial">Bigserial</option>
				<option value="money">Money</option>
				<option value="varchar">Varchar</option>
				<option value="char">Char</option>
				<option value="bytea">Bytea</option>
				<option value="timestamp">Timestamp</option>
				<option value="interval">Interval</option>
				<option value="enum">Enum</option>
				<option value="point">Point</option>
				<option value="line">Line</option>
				<option value="lseg">Lseg</option>
				<option value="box">Box</option>
				<option value="path">Path</option>
				<option value="polygon">Polygon</option>
				<option value="circle">Circle</option>
				<option value="cidr">Cidr</option>
				<option value="inet">Inet</option>
				<option value="macaddr">Macaddr</option>
				<option value="bit">Bit</option>
				<option value="bitVarying">BitVarying</option>
				<option value="tsvector">Tsvector</option>
				<option value="tsquery">Tsquery</option>
				<option value="uuid">Uuid</option>
				<option value="xml">Xml</option>
				<option value="json">Json</option>
				<option value="jsonb">Jsonb</option>*/}
			</select>
		);
	}
}

SelectDataType.propTypes = {
	name : PropTypes.string.isRequired,
	value : PropTypes.string,
	onChange : PropTypes.func.isRequired	
}

SelectDataType.defaultProps = {
	
}