import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import store from '../Assets/Redux/Store';
class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={store}>
				<Head>
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
				</Head>
				<Container>
					<Component {...pageProps} />
				</Container>
			</Provider>
		);
	}
}

export default MyApp;
