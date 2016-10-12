import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Welcome extends Component {

  render() {

    return (
      <div>
        <p>
          Welcome!
        </p>
        <p>
          <Link to="/login">Click here</Link> to login
        </p>
        <p>
          <Link to="/register">Click here</Link> to register
        </p>
      </div>
    )
  }

}

export default Welcome