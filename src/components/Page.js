import React, { Component, PropTypes } from 'react'
import { layout } from '../styles'

/*

  wrapper component for pages that have a margin around them
  
*/
class Page extends Component {

  render() {

    const settings = this.context.settings
    const styles = settings.styles
    
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