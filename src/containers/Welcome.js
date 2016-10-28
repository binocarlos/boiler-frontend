import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Welcome from '../components/Welcome'

export class WelcomeContainer extends Component {
  render() {
    return (
      <Welcome {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeContainer)
