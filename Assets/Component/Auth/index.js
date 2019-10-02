
// React core.
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// Firebase.
import firebase  from '../../Firebase'
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Router from 'next/router';

// Styles
import styles from '../../../static/css/app.css'; // This uses CSS modules.
import '../../../static/css/fb.css'; // Import globally.
const firebaseApp = firebase
  class Auth extends React.Component {
  uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

  };

  state = {
    isSignedIn: undefined,
  };

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({isSignedIn: !!user});
      if(this.state.isSignedIn){
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().url);
                this.props.dispatch({ type: 'IP', string:doc.data().url});

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
		Router.push(`/`)
    }
    });
    
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      
<div class="container">

<div class="row justify-content-center">

  <div class="col-xl-10 col-lg-12 col-md-9">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <div class="row">
          <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
          <div class="col-lg-6">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
              </div>
              <div class="user">
      {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
      <div>
          <div class="card">
  <div class="card-body">
        <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
                            firebaseAuth={firebaseApp.auth()}/>
                            </div>
</div>
      </div>
    }</div>
         
              {this.state.isSignedIn &&
      <div style={{color:"black"}} className={styles.signedIn}>
        Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
        <a className={styles.button} onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
      </div>
    }
              <div class="text-center">
                <a class="small" href="register.html">Create an Account!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</div>

</div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state)
	return {};
};
export default connect(mapStateToProps)(Auth);