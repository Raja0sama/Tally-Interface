import React from 'react';
import balanceSheet from './RequestXML/BalanceSheet';
import axios from 'axios';
import convert from 'xml-js';
import Router from 'next/router';
import { connect } from 'react-redux';
import firebase  from '../../Firebase'
import 'firebase/auth';
import 'firebase/firestore';
let i = 0

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.FetchBalanceSheet();
		this.state = {
			balanceSheet: {},
			Data: []
		};
  }
  componentDidMount(){
  }

	FetchBalanceSheet = () => {
		axios.post(this.props.ip, balanceSheet()).then((res) => {
			let a = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 1 }));
			this.setState({ balanceSheet: a });
			let b = [];
			let c = {};
			a.ENVELOPE.BSAMT.forEach((e, i) => {
				if (this.isEmpty(e.BSMAINAMT)) {
					c.children.push({
						subN: a.ENVELOPE.BSNAME[i].DSPACCNAME.DSPDISPNAME._text,
						subA: e.BSSUBAMT._text
					});
					if (a.ENVELOPE.BSAMT.length - 1 == i) b.push(c);
				} else {
					this.isEmpty(c) ? (c = {}) : b.push(c);
					c = {};
					c.Title = a.ENVELOPE.BSNAME[i].DSPACCNAME.DSPDISPNAME._text;
					c.totalA = e.BSMAINAMT._text;
					c.children = [];
				}
			});
			b.sort(function(a, b) {
				// ASC  -> a.length - b.length
				// DESC -> b.length - a.length
				return b.children.length - a.children.length;
			});
			this.setState({ Data: b });
		});
	};

	isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
  }
	render() {
    // console.log(this.props.PG)
    // if(!isEmpty(this.props.PG)){
    //   console.log("its not empty")
    //   this.FetchBalanceSheet()
    // }
    
      
      return (
			<div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
					<a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
						<i className="fas fa-download fa-sm text-white-50" /> {typeof this.props.pageinfo === 'undefined' ? "generate" : this.props.pageinfo.Ip }
					</a>
				</div>

				{/*      

        <div className="row">
        <div className="col-xl-8 col-md-8 mb-4">
        <div className="form-group">
    <input onChange={(e)=> this.setState({voucherN : e.target.value})} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search By Voucher Number"/>
  </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-4">
        <button onClick={()=> {
          	this.state.voucherN ? Router.push(`/invoice?id=${this.state.voucherN}`, `/invoice/${this.state.voucherN}`): console.log("🤣 Kindly Add a Vocuher Number")
        }} type="button" className="btn btn-primary">Primary</button>

        </div>

        </div> */}

				<div className="row">
					{!this.isEmpty(this.state.Data) ? (
						this.state.Data.map((e, i) => (
							<div key={Math.random()} className="col-xl-3 col-md-6 mb-4">
								<div className="card mb-4 border-bottom-danger">
									<a className="d-block card-header py-3 collapsed">
										<h6 className="m-0 font-weight-bold text-primary">{e.Title}</h6>
									</a>
									<div className="collapse show">
										<div className="card-body">
											<table className="table">
												<thead>
													<tr>
														<th scope="col">Name</th>
														<th scope="col">Amount</th>
													</tr>
												</thead>
												<tbody>
													{e.children.map((e) => (
														<tr key={Math.random()}>
															<td> {e.subN}</td>
															<td>{e.subA}</td>
														</tr>
													))}
												</tbody>
											</table>

											<hr />
											<b>Amount {e.totalA}</b>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="alert alert-danger" role="alert">
							Well Your we are Unable to connect to the Tally server 😒😒🤔
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (states ) => {
    // console.log(states)
    return {    PG : states.PageInfo,
    };

};
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
export default connect(mapStateToProps)(Dashboard);

