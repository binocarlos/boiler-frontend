import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

import UIAppWrapper from 'kettle-ui/lib/AppWrapper'
import AppBar from '../components/AppBar'
import Drawer from '../components/Drawer'

import * as actions from '../actions'
import * as selectors from '../selectors'

export class AppWrapperContainer extends Component {
  render() {
    const AppBarComponent = this.props.appbarComponent

    if(!AppBarComponent) throw new Error('AppBarComponent prop needed')
    const appbarContent = this.props.getAppbarContent()
    const menuContent = this.props.getMenuContent()

    const appbar = (
      <AppBarComponent 
        hasMenu={this.props.hasMenu}
        title={this.props.title}
        changeLocation={this.props.changeLocation}
        toggleMenu={this.props.toggleMenu}
        titlebarClickUrl={this.props.titlebarClickUrl}
        >
        {appbarContent}
      </AppBarComponent>
    )

    const sidemenu = this.props.hasMenu ? (
      <Drawer 
        isMenuOpen={this.props.isMenuOpen}
        toggleMenu={this.props.toggleMenu}
        >
          {menuContent}
      </Drawer>
    ) : null

    const statics = this.props.statics || []

    const app = ( 
      <UIAppWrapper
        appbar={appbar}
      >
        <div>
          <div>
            {this.props.children}
          </div>
          <div>
            {sidemenu}
          </div>
          <div>
            {statics.map((s, i) => {
              return (
                <div key={i}>
                  {s}
                </div>
              )
            })}
          </div>
        </div>
      </UIAppWrapper>
    )

    const loading = (
      <div>loading...</div>
    )

    return this.props.ready ? app : loading
  }
}

function mapStateToProps(state, ownProps) {
  const settings = ownProps.route.settings
  const store = ownProps.route.store
  const statics = ownProps.route.statics
  
  return {
    appbarComponent:settings.appbarComponent,
    title:settings.getTitle(state),
    ready:settings.isReady(state),
    getAppbarContent:settings.getAppbarContent(store),
    getMenuContent:settings.getMenuContent(store),
    hasMenu:settings.hasMenu,
    isMenuOpen:selectors.menu(state).open(),
    statics:statics
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const settings = ownProps.route.settings
  return {
    changeLocation:(path) => {
      dispatch(routerActions.push(path))
    },
    toggleMenu:(open) => {
      dispatch(actions.toggle_menu(open))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapperContainer)
