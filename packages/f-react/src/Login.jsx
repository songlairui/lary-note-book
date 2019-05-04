import React, { Component } from 'react'
import { AUTH_TOKEN } from './constants'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $pwd: String!) {
    signin(signinInput: { email: $email, pwd: $pwd }) {
      expiresIn
      accessToken
    }
  }
`

class Login extends Component {
  state = {
    email: '',
    pwd: '',
    name: ''
  }
  render() {
    const { email, pwd } = this.state
    return (
      <div className="login">
        <div className="form-line">
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />{' '}
          <input
            value={pwd}
            onChange={(e) => this.setState({ pwd: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email, pwd }}
          onCompleted={(data) => this._confirm(data)}
        >
          {(mutation) => (
            <div className=" button" onClick={mutation}>
              {'login'}
            </div>
          )}
        </Mutation>
      </div>
    )
  }

  _confirm = async (data) => {
    const { accessToken } = data.signin
    this._saveUserData(accessToken)
  }
  _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
