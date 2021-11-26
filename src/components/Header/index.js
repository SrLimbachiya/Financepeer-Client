import {withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const logMeOut = () => {
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-content nav-bar-large-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link className="nav-menu-item-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              {/* <button
                onClick={logMeOut}
                type="button"
                className="logout-desktop-btn"
              >
                Logout
              </button> */}
              <p className="nav-menu-item-link" onClick={logMeOut}>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
