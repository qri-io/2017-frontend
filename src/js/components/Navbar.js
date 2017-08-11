/* globals __BUILD__ */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ user, style }) => {
  return (
    <div id="navbar" style={style}>
      <div className="container">
        <div className="row">
          <div id="logotype" className="col-md-1 col-sm-2" href={__BUILD__.BASE_URL}>
            <img alt="logo" src="https://s3.amazonaws.com/static.qri.io/svg/qri.svg" />
          </div>
          <div className="menu col-md-4 offset-md-7">
            <Link className="blue" to="/">Datasets</Link>
            <Link className="green" to="/console">Console</Link>
            {/* user ? <a className="orange" href="http://docs.qri.io">Docs</a> : undefined */}
            { user && <a className="orange" href="/beta">Beta Info</a>}
            { user && <Link className="yellow" to={`/users/${user.username}`}>{user.username}</Link>}
            { !user && <Link to="/login">Login</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.null]),
  style: PropTypes.object,
  // onToggleMenu: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
};

export default Navbar;
