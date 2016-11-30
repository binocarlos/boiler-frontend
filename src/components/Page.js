import React, { Component, PropTypes } from 'react'
import styles from '../styles'

class Page extends Component {

  render() {
    return (
      <div style={styles.paddedContent}>
        {this.props.children}
      </div>
    )
  }

}

Page.contextTypes = {
  settings: React.PropTypes.object
}

export default Page