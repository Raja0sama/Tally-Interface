import React from 'react';
import axios from 'axios';
import account from './RequestXML/Accounts';
import convert from 'xml-js';
import Link from 'next/link';
class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			visible: false,
			visible1: false,
			visible2: false
		};
	}
	componentDidMount() {
		axios.post(this.props.ip, account({})).then((res) => {
			let a = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 1 }));
			a = a.ENVELOPE.BODY.IMPORTDATA.REQUESTDATA.TALLYMESSAGE;
			const c = this.Seprate(a, 'CURRENCY');
			const g = this.Seprate(a, 'GROUP');
			const l = this.Seprate(a, 'LEDGER');
			this.setState({ data: [ c, g, l ] });
		});
	}
	Seprate(a, name) {
		const b = a.filter((e) => {
			const a = Object.keys(e);
			if (a[1] === name) {
				return e;
			}
		});
		return b;
	}
	render() {
		console.log(this.state);
		return (
			<div className="container">
				<div className="alert alert-primary" role="alert">
					<h1>Accounts ❤</h1>
				</div>
				<div className="row">
					{this.state.data.map((e, i) => {
						return (
							<div class="col-xl-4 col-md-4 mb-4">
								<div class="list-group">
									<button
										onClick={() => {
											if (i == 0) {
												this.setState({ visible: !this.state.visible });
											} else if (i == 1) {
												this.setState({ visible1: !this.state.visible1 });
											} else {
												this.setState({ visible2: !this.state.visible2 });
											}
										}}
										class="list-group-item list-group-item-action active"
									>
										{i == 0 ? <h3>CURRENCY 💲</h3> : <span />}
										{i == 1 ? <h3>Group 🤼</h3> : <span />}
										{i == 2 ? <h3>LEDGER 🧑</h3> : <span />}
									</button>

									{/* Currency   */}
									{i == 0 && this.state.visible ? (
										<div>
											<input
												className="form-control form-control-lg"
												style={{ flex: 1 }}
												onChange={(a) => {
													const x = e.filter((k) => {
														k = k.CURRENCY.MAILINGNAME._text.toLowerCase();
														return k.indexOf(a.target.value.toLowerCase()) > -1;
													});
													this.setState({ g: x });
												}}
											/>
											{this.state.g ? (
												this.state.g.map((j) => (
													<Link as={"/LedgerV/"+encodeURI(j.CURRENCY.MAILINGNAME._text)} href={"/LedgerV?q="+encodeURI(j.CURRENCY.MAILINGNAME._text)}>
													<button href="#" class="list-group-item list-group-item-action">
														{j.CURRENCY.MAILINGNAME._text}
													</button>
													</Link>
												))
											) : (
												e.map((j) => (
													<Link as={"/LedgerV/"+encodeURI(j.CURRENCY.MAILINGNAME._text)} href={"/LedgerV?q="+encodeURI(j.CURRENCY.MAILINGNAME._text)}>
													<button href="#" class="list-group-item list-group-item-action">
														{j.CURRENCY.MAILINGNAME._text}
													</button>
													</Link>												))
											)}
										</div>
									) : (
										<span />
									)}

									{/* Group */}
									{i == 1 && this.state.visible1 ? (
										<div>
											<input
												className="form-control form-control-lg"
												style={{ flex: 1 }}
												onChange={(a) => {
													const x = e.filter((k) => {
														k = k.GROUP._attributes.NAME.toLowerCase();
														return k.indexOf(a.target.value.toLowerCase()) > -1;
													});
													this.setState({ g: x });
												}}
											/>
											{this.state.g ? (
												this.state.g.map((j) => (
													<Link as={"/LedgerV/"+encodeURI(j.GROUP._attributes.NAME)} href={"/LedgerV?q="+encodeURI(j.GROUP._attributes.NAME)}>
													<a class="list-group-item list-group-item-action">
														{j.GROUP._attributes.NAME}
													</a></Link>
												))
											) : (
												e.map((j) => (
													<Link as={"/LedgerV/"+encodeURI(j.GROUP._attributes.NAME)} href={"/LedgerV?q="+encodeURI(j.GROUP._attributes.NAME)}>
													<a class="list-group-item list-group-item-action">
														{j.GROUP._attributes.NAME}
													</a></Link>
												))
											)}
										</div>
									) : (
										<span />
									)}
									{/* LEDGER */}
									{i == 2 && this.state.visible2 ? (
										<div>
											<input
												className="form-control form-control-lg"
												style={{ flex: 1 }}
												onChange={(a) => {
													const x = e.filter((k) => {
														k = k.LEDGER._attributes.NAME.toLowerCase();
														return k.indexOf(a.target.value.toLowerCase()) > -1;
													});
													this.setState({ g: x });
												}}
											/>
											{this.state.g ? (
												this.state.g.map((j) => (
													<Link as={"/LedgerV/"+encodeURI(j.LEDGER._attributes.NAME)} href={"/LedgerV/[AccountN]"}>
													<a class="list-group-item list-group-item-action">
														{j.LEDGER._attributes.NAME}
													</a></Link>
												))
											) : (
												e.map((j) => (
													<Link as={"/LedgerV/"+encodeURI(j.LEDGER._attributes.NAME)} href={"/LedgerV/[AccountN]"}>
													<a class="list-group-item list-group-item-action">
														{j.LEDGER._attributes.NAME}
													</a></Link>
												))
											)}
										</div>
									) : (
										<span />
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
export default Account;
