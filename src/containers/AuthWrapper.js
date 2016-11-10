import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { passporttools, UserLoader } from 'passport-service-gui'
import AppWrapper from 'kettle-ui/lib/AppWrapper'

/*

  the Wrapper displays the content of the top-level routes
  and the AppBar

  both Wrapper and AppBar use the 'passport' state property
  to determine if the user is logged in

  there are 3 possible states for the user:

   * loading
   * guest
   * logged in

  for loading - the wrapper will display a loading spinner
  and the topbar will display an empty title

  for guest - we redirect to /login

  for logged in - we display the children
  
*/
export class AuthWrapper extends Component {

  render() {

    const settings = this.context.settings
    const AppBarComponent = settings.appbar
    const LoaderComponent = settings.loader

    return ( 
      <UserLoader url={settings.passportUrl + '/status'} onLoaded={(data) => {
        
        this.props.userLoaded(data, this.props.router, this.props.routes)
      }}>
        <AppWrapper
          appbar={
            <AppBarComponent />
          }>
          <div>
          

            {
              // until we have loaded the user status, we do not display any content
              this.props.passport.loaded ? 
              this.props.children :
              <LoaderComponent />
            }

          </div>
          
        </AppWrapper>
      </UserLoader>
    )
  }
}

AuthWrapper.contextTypes = {
  settings: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {  
    passport:passporttools.getUser(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    
    userLoaded:(data = {}, router, routes) => {

      const onEnterRoutes = routes.filter((route) => route.onEnter)
      
      if(onEnterRoutes.length<=0) return

      dispatch((dispatch, getState) => {

        const currentState = getState()

        // here we run the onEnter function for the routes
        // giving it a chance to re-assert now that the user data has loaded
        onEnterRoutes.forEach((route) => {
          route.onEnter(getState(), router.replace, () => {
            
            // code here for once they have been redirected because of the onEnter
            
          })
        })
        
      })

    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthWrapper))
