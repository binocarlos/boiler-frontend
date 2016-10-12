import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UIHelp from '../components/Help'

export class Help extends Component {
  render() {
    return (
      <UIHelp {...this.props} />
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
)(Help)
