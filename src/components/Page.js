import React, { Component, PropTypes } from 'react'

const STYLES = {
  paddedContent:{
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'5%'
  }
}

class Page extends Component {

  render() {
    return (
      <div style={STYLES.paddedContent}>
        {this.props.children}
      </div>
    )
  }

}

export default Page