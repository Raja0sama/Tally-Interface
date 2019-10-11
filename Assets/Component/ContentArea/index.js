import React from 'react';
import NavBar from '../Nav';
import Head from 'next/head';
import Content from '../Content/index';
import firebase from '../../Firebase';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseApp = firebase;

class ContentArea extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      log : false
    }
  }
	componentDidMount() {
		this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
			this.setState({ isSignedIn: !!user });
			if (this.state.isSignedIn) {
				this.setState({ log: true });
			} else {
				window.location.href = '/auth';
			}
		});
	}
	render() {
		if (this.state.log) {
			return (
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<NavBar />

						<Content />
					</div>

					<Head>
						<script src="https://use.fontawesome.com/c41db8aaac.js" />
						<script src="static/vendor/jquery/jquery.min.js" />
						<script src="static/vendor/bootstrap/js/bootstrap.bundle.min.js" />
						<script src="static/vendor/jquery-easing/jquery.easing.min.js" />
						<script src="static/vendor/jquery/jquery.min.js" />
						<script src="static/js/sb-admin-2.min.js" />{' '}
					</Head>
				</div>
			);
		} else {
			return <div>Wait Please</div>;
		}
	}
}
export default ContentArea;
