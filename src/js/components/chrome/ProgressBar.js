import React from 'react'

export default class ProgressBar extends React.Component {
	render() {
		return (
			<div class="progressBar">

			</div>
		);
	}
}

ProgressBar.propTypes = {
	progress : React.PropTypes.number.isRequired
}

ProgressBar.defaultProps = {

}