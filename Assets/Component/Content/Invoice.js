import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import convert from 'xml-js';
import LedgerTotal from './RequestXML/LedgerTotal';
import singleV from './RequestXML/SingleVoucher';
import Router from 'next/router';

class Invoice extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			Account : [],
		}
	}
	componentDidMount(){
	const a=  window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
	const b =a.substr(0,1)
	const c = this.check(b)
		Axios.post(this.props.ip,singleV([a,c])).then((res)=>{
			const co = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 1 }))
			console.log(co)
			this.setState({data:co.ENVELOPE.BODY.DATA.COLLECTION})
		})
	
	}
	check(b){
		switch(b){
			case 'P':
				return "Payment"
			case 'S':
				return "Sales"
			case 'R':
				return "Recipt"
			case 'C':
				return "Contra"
			case 'J':
				return "Journal"
		}
	}
	Data(e){
		Axios.post(this.props.ip, LedgerTotal(e)).then((res) => {
			const a = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 1 }))
			let c = 0
			a.ENVELOPE.DSPVCHDRAMT.forEach(element => {
				c += parseInt(element._text)

			});
			this.setState({Account : [ ...this.state.Account, {title:e[2],currentB:Math.abs(c)}]})
		});
	}
	print(){
		const a = this.state.data.VOUCHER
		let al = ""
		let ledger = ""
		if(a['ALLLEDGERENTRIES.LIST']){
			al = a['ALLLEDGERENTRIES.LIST'].length
			ledger = 'ALLLEDGERENTRIES.LIST'
		}else{
			al = a['LEDGERENTRIES.LIST'].length
			ledger = 'LEDGERENTRIES.LIST'
		}
		const VoucherType = a.VOUCHERTYPENAME._text
		const VoucherId = a.VOUCHERNUMBER._text
		const Account = a.PARTYLEDGERNAME._text
		const children = []
		a[ledger] ? a[ledger].map((e,i)=>{
			if(e.LEDGERNAME._text == a.PARTYLEDGERNAME._text){}else{children.push({ledgername : e.LEDGERNAME._text,Amount :Math.abs(e.AMOUNT._text)})}
		}):console.log("")
		const amount = Math.abs(parseInt(a[ledger][al-1].AMOUNT._text))
		const narration = a.NARRATION._text
		const objec = {VoucherId,VoucherType,amount,Account,narration,children}
		console.log(JSON.stringify(objec))
		Axios.post(this.props.ip2,objec).then((res)=>{
			console.log(res)
		})
	}
	render() {
		console.log(this.state)
		if(this.state.data && this.state.data.VOUCHER){
		const a = this.state.data.VOUCHER
		let al = ""
		let ledger = ""
		if(a['ALLLEDGERENTRIES.LIST']){
			al = a['ALLLEDGERENTRIES.LIST'].length
			ledger = 'ALLLEDGERENTRIES.LIST'
		}else{
			al = a['LEDGERENTRIES.LIST'].length
			ledger = 'LEDGERENTRIES.LIST'
		}
		return (
			<div className="container-fluid">
				<h1 className="h3 mb-2 text-gray-800">{a.PERSISTEDVIEW._text}</h1>
				<p className="mb-4">Voucher Detail can be show here as per your wish.</p>

				<br />
				<br />
				<button onClick={()=>this.print()}>Print</button>
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">Voucher </h6>
					</div>
					<div className="card-body">
						<div style={{ padding: 10 }} className="row">
							<div className="col-sm-6">
								{/* CARD */}

								<div className="col mr-2">
									<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
										{a.VOUCHERKEY._text}
									</div>
									<div className="h6 mb-0  text-gray-800">{a.VOUCHERTYPENAME._text} Voucher #{a.VOUCHERNUMBER._text}</div>
									<div className="h3 text-gray-800">
									{a.PARTYLEDGERNAME._text}<br /> 
									</div>
								</div>

								{/* Card End */}
							</div>

							<div style={{ textAlign: 'right' }} className="col-sm-6">
								5-04-2019<br />Monday
							</div>
							<div style={{ flex: 1 }}>
								<table className="table table-bordered" style={{ flex: 1, marginTop: 20 }} cellspacing="0">
									<thead>
										<tr>
											<th>Particulars</th>
											<th>Rates</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
											<th />
											<th>Total</th>
											<th>{Math.abs(parseInt(a[ledger][al-1].AMOUNT._text))}</th>
										</tr>
									</tfoot>
									<tbody>
										{a[ledger] ? a[ledger].map((e,i)=>{
											if(e.LEDGERNAME._text == a.PARTYLEDGERNAME._text){

											}else{
												return (<tr role="row" style={{ flex: 1 }}>
															<td style={{ textAlign: 'left', backgroundColor: '#fff', width: 800 }}>
															{e.LEDGERNAME._text}
															</td>
															<td style={{ textAlign: 'center', backgroundColor: '#fff' }}></td>
				
															<td style={{ textAlign: 'center', backgroundColor: '#fff' }}>{Math.abs(e.AMOUNT._text)}</td>
														</tr>)
											}
										})
										:(<p>he</p>)}
									
									</tbody>
								</table>
								<div className="card mb-4" />
								<div className="card-header">Naration </div>
								<div className="card-body">{a.NARRATION._text}
								<a target="_blank" href={"https://110.37.224.158:3000/vouchers/"+a.VOUCHERNUMBER._text}> Image Reference </a>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		);}else{
			return <div class="alert alert-danger" role="alert">
			 🐱🏹 Well You Have a Problem Dude With The Request or Either Voucher Number Does not Exist Do Recheck 😒 😒 😒 😒 🙌
		  </div>
		}
	}
}
const mapStateToProps = (state /*, ownProps*/) => {
	return {data : state.PageInfo.page};
};
export default connect(mapStateToProps)(Invoice);
