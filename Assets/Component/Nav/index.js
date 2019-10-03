import React, { useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
// Firebase.
import firebase from '../../Firebase';
import 'firebase/auth';
import 'firebase/firestore';
let i = 0;

const NavBar = (props) => {
	const [ state, setstate ] = useState({});
	const firebaseApp = firebase;
	if (isEmpty(props.PG)) {
		firebaseApp.auth().onAuthStateChanged((user) => {
			if (!!user) {
				firebase
					.firestore()
					.collection('users')
					.doc(firebase.auth().currentUser.uid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							console.log('Document data:', doc.data().url);
							props.dispatch({ type: 'IP', string: doc.data().url });
						} else {
							// doc.data() will be undefined in this case
							console.log('No such document!');
						}
					})
					.catch(function(error) {
						console.log('Error getting document:', error);
					});
			}
		});
	}

	return (
		<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
			<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
				<i className="fa fa-bars" />
			</button>

			<div className="input-group">
				<input
					onChange={(e) => setstate({ voucherN: e.target.value })}
					type="text"
					className="form-control bg-light border-0 small"
					placeholder="Search for..."
					aria-label="Search"
					aria-describedby="basic-addon2"
				/>
				<div className="input-group-append">
					<button
						onClick={() => {
							state.voucherN
								? Router.push(`/Dashboard/invoice?id=${state.voucherN}`, `/Dashboard/invoice/${state.voucherN}`)
								: console.log('🤣 Kindly Add a Vocuher Number');
						}}
						className="btn btn-primary"
						type="button"
					>
						<i className="fas fa-search fa-sm" />
					</button>
				</div>
			</div>

			<ul className="navbar-nav ml-auto">
				<li className="nav-item dropdown no-arrow d-sm-none">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="searchDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i className="fas fa-search fa-fw" />
					</a>
					<div
						className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
						aria-labelledby="searchDropdown"
					>
						<form className="form-inline mr-auto w-100 navbar-search">
							<div className="input-group">
								<input
									type="text"
									className="form-control bg-light border-0 small"
									placeholder="Search for..."
									aria-label="Search"
									aria-describedby="basic-addon2"
								/>
								<div className="input-group-append">
									<button className="btn btn-primary" type="button">
										<i className="">🔍</i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</li>

				<li className="nav-item dropdown no-arrow mx-1">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="alertsDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i className="fas fa-fw">🔔</i>
						<span className="badge badge-danger badge-counter">3+</span>
					</a>
					<div
						className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
						aria-labelledby="alertsDropdown"
					>
						<h6 className="dropdown-header">Alerts Center</h6>
						<a className="dropdown-item d-flex align-items-center" href="#">
							<div className="mr-3">
								<div className="icon-circle bg-primary">
									<i className="fas fa-file-alt text-white" />
								</div>
							</div>
							<div>
								<div className="small text-gray-500">December 12, 2019</div>
								<span className="font-weight-bold">A new monthly report is ready to download!</span>
							</div>
						</a>
						<a className="dropdown-item d-flex align-items-center" href="#">
							<div className="mr-3">
								<div className="icon-circle bg-success">
									<i className="fas fa-donate text-white" />
								</div>
							</div>
							<div>
								<div className="small text-gray-500">December 7, 2019</div>
								$290.29 has been deposited into your account!
							</div>
						</a>
						<a className="dropdown-item d-flex align-items-center" href="#">
							<div className="mr-3">
								<div className="icon-circle bg-warning">
									<i className="fas fa-exclamation-triangle text-white" />
								</div>
							</div>
							<div>
								<div className="small text-gray-500">December 2, 2019</div>
								Spending Alert: We've noticed unusually high spending for your account.
							</div>
						</a>
						<a className="dropdown-item text-center small text-gray-500" href="#">
							Show All Alerts
						</a>
					</div>
				</li>

				<div className="topbar-divider d-none d-sm-block" />

				<li className="nav-item dropdown no-arrow">
					<div className="alert alert-danger" role="alert">
						Disconnected
					</div>
				</li>
			</ul>
		</nav>
	);
};
const mapStateToProps = (states /*, ownProps*/) => {
	return {
		PG: states.PageInfo
	};
};
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
export default connect(mapStateToProps)(NavBar);
