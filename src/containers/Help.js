import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Help from '../components/Help'

export class HelpContainer extends Component {
  render() {
    return (
      <Help {...this.props} />
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
)(HelpContainer)
