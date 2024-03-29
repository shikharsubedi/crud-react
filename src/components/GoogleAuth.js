import React from 'react'
import { connect } from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component {
  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1025400700284-95q56biaimfn7v59a0ioshh0mdo7on9s.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }
  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }

  }

  onSignInClick = () => {
    this.auth.signIn()

  }

  onSignOutClick = () => {
    this.auth.signOut()
  }
  renderAuthButton () {
    if (this.props.isSignedIn === null) {
      return null
    }
    if(this.props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignOutClick}>
          <i className='icon google' />
          Sign Out
        </button>
      )
    }
    return (
      <button className='ui red google button' onClick={this.onSignInClick}>
          <i className='icon google' />
            Sign In
        </button>
    )
  }
  render () {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)
