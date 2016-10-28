import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
class TestPage extends Component {

  render() {

    return (
      <div>
        <p>
          This is the test page
        </p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    )
  }

}

export default TestPage