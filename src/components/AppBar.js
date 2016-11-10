import React, { Component, PropTypes } from 'react'
import UIAppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

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
          onClick={this.updateLocation('/accountdetails')}
          primaryText="Account Details" />
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
    const menuContent = this.props.getMenuChildren()
    return (
      <div>
        <Drawer 
          docked={false}
          width={200}
          open={this.props.isMenuOpen}
          onRequestChange={this.props.toggleMenu}>
          {menuContent}
        </Drawer>
        <UIAppBar
          showMenuIconButton={menuContent ? true : false}
          title={this.props.title}
          iconElementRight={this.getRightMenu()}
          onTitleTouchTap={() => this.props.changeLocation('/')}
          onLeftIconButtonTouchTap={() => this.props.openMenu(true)}
          titleStyle={{cursor:'pointer'}}
          zDepth={2} />
      </div>
    )
  }
}

export default AppBar