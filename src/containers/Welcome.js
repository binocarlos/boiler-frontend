import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UIWelcome from '../components/Welcome'

export class Welcome extends Component {
  render() {
    return (
      <UIWelcome {...this.props} />
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
)(Welcome)
