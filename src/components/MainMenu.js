import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const MainMenu = ({ user, show, onGimmieInvite }) => {
  // stop click propagation to keep menu clicks from hiding the menu itself
  return (
    <div id='main_menu' onClick={(e) => { e.stopPropagation() }} className={show ? 'show' : 'hide'}>
      <Link className='blue' to='/'>Datasets</Link>
      <Link className='green' to='/browse'>Docs</Link>
      {/* user ? <a className="orange" href="http://docs.qri.io">Docs</a> : undefined */}
      { user ? <a className='orange' href='/beta'>Beta Info</a> : undefined}
      {
        user
          ? <Link className='yellow' to={`/users/${user.username}`}>{user.username}</Link>
          : <a onClick={onGimmieInvite}>Gimmie beta</a>
      }
      { user ? undefined : <Link to='/login'>Login</Link>}
    </div>
  )
}

MainMenu.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.null
  ]),
  show: PropTypes.bool,
  onGimmieInvite: PropTypes.func
}

MainMenu.defaultProps = {
}

export default MainMenu
