import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeFullName = event => {
    this.setState({fullname: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async () => {
    const {username, password, fullname} = this.state
    const userDetails = {username, fullname, password}
    const url = 'http://localhost:7747/register/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  checkPasswordAndSubmit = event => {
    event.preventDefault()
    const {password, confirmPassword} = this.state
    if (password === confirmPassword) {
      this.submitForm()
    } else {
      this.setState({showSubmitError: true, errorMsg: "Password didn't match!"})
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderConPasswordField = () => {
    const {confirmPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          CONFIRM PASSWORD
        </label>
        <input
          type="password"
          id="password1"
          className="password-input-field"
          value={confirmPassword}
          onChange={this.onChangeConPassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderFullnameField = () => {
    const {fullname} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          FULL NAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={fullname}
          onChange={this.onChangeFullName}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const isToken = Cookie.get('jwt_token')
    if (isToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="signup-form-container">
        <form className="form-container" onSubmit={this.checkPasswordAndSubmit}>
          <h1>Register</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderFullnameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">{this.renderConPasswordField()}</div>
          <button type="submit" className="signup-button">
            Signup
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Signup
