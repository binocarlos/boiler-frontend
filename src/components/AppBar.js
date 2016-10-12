import React, { Component, PropTypes } from 'react'
import UIAppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

export class AppBar extends Component {

  updateLocation(url) {
    return () => {
      this.props.changeLocation(url)
    }
  }

  getLoginButton() {
    return (
      <FlatButton 
        onClick={this.updateLocation('/login')}
        label="Login" />
    )
  }

  getUserMenu() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem 
          onClick={this.updateLocation('/help')}
          primaryText="Help" />
        <MenuItem 
          onClick={this.props.logout}
          primaryText="Sign out" />
      </IconMenu>
    )
  }

  getRightMenu() {
    return this.props.passport.loggedIn ?
      this.getUserMenu() :
      this.getLoginButton()
  }

  render() {
    return (    
      <UIAppBar
        showMenuIconButton={false}
        title={this.props.title}
        iconElementRight={this.getRightMenu()}
        onTitleTouchTap={() => this.props.changeLocation('/')}
        titleStyle={{cursor:'pointer'}}
        zDepth={2} />
    )
  }
}

export default AppBar