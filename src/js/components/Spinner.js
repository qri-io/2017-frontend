import React from 'react'

export default class Spinner extends React.Component {
	render() {
		return (
			<div className="spinner">
				<div class="rect1"></div>
				<div class="rect2"></div>
				<div class="rect3"></div>
				<div class="rect4"></div>
				<div class="rect5"></div>
			</div>
		);
	}
}

Spinner.propTypes = {

}

Spinner.defaultProps = {

}