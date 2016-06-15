
import React, { Component, PropTypes } from 'react'

export default class Navbar extends Component {
	render() {
		return (
			<div id="navbar">
				<h3>Qri</h3>
			</div>
		)
	}
}

Navbar.propTypes = {
  // loadingLabel: PropTypes.string.isRequired,
  // pageCount: PropTypes.number,
  // renderItem: PropTypes.func.isRequired,
  // items: PropTypes.array.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // onLoadMoreClick: PropTypes.func.isRequired,
  // nextPageUrl: PropTypes.string
}

Navbar.defaultProps = {
  // isFetching: true,
  // loadingLabel: 'Loading...'
}