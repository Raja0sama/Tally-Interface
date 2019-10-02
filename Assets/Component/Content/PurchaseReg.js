import React from 'react';
import axios from 'axios';
import Purchase from './RequestXML/Purchase';
import convert from 'xml-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux'
import Router from 'next/router'


class PurchaseReg extends React.Component {
	state = {
		startDate: new Date(),
		sd: '',
		ed: '',
		endDate: new Date(),
		data: []
	};

	gettodayDate() {
		const date = new Date();
		var day = ('0' + (date.getDate() + 1)).slice(-2);
		var monthIndex = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();

		this.setState({
			startDate: date,
			endDate: date,
			sd: year + '' + monthIndex + '' + day,
			ed: year + '' + monthIndex + '' + day
		});
	}

	handleChange = (date) => {
		var day = ('0' + (date.getDate() + 1)).slice(-2);
		var monthIndex = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();

		this.setState({
			startDate: date,
			sd: year + '' + monthIndex + '' + day
		});
	};
	handleChange1 = (date) => {
		var day = ('0' + (date.getDate() + 1)).slice(-2);
		var monthIndex = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		this.setState({
			endDate: date,
			ed: year + '' + monthIndex + '' + day
		});
	};
	componentDidMount() {
		this.gettodayDate()
		// this.Db(['20190401','20200401'])
	}
	Db(e) {
		const xmlrequest = Purchase(e);
		console.log(xmlrequest)
		axios.post(this.props.ip, xmlrequest).then((res) => {
			let a = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 1 }));
				
		if(a.ENVELOPE.BODY.IMPORTDATA.REQUESTDATA){

			}else{
				a = a.ENVELOPE.BODY.IMPORTDATA.REQUESTDATA.TALLYMESSAGE;
				console.log(a)
				this.setState({detail:a})
					  this.Parsing(a);
			}
		
		});
	}
	Parsing(a) {
		const data = [];
		console.log(a.length)
		a.forEach((element,i) => {
			if(element.VOUCHER){
			let date = element.VOUCHER.DATE._text;
		
			const ledgername = element.VOUCHER['ALLLEDGERENTRIES.LIST']
				? element.VOUCHER['ALLLEDGERENTRIES.LIST'][0] ? element.VOUCHER['ALLLEDGERENTRIES.LIST'][0].LEDGERNAME._text : ""
				: element.VOUCHER['LEDGERENTRIES.LIST'][0] ? element.VOUCHER['LEDGERENTRIES.LIST'][0].LEDGERNAME._text : "";
			const VOUCHERTYPE = element.VOUCHER.VOUCHERTYPENAME._text;
			const VOUCHERid = element.VOUCHER.VOUCHERNUMBER._text;
			let da = element.VOUCHER['LEDGERENTRIES.LIST']
				? element.VOUCHER['LEDGERENTRIES.LIST'][0] ? Math.abs(parseInt(element.VOUCHER['LEDGERENTRIES.LIST'][0].AMOUNT._text)) : "undefined"
				: '';
			let ca = element.VOUCHER['ALLLEDGERENTRIES.LIST']
				? element.VOUCHER['ALLLEDGERENTRIES.LIST'][0] ? parseInt(element.VOUCHER['ALLLEDGERENTRIES.LIST'][0].AMOUNT._text) : "undefined Data"+i
				: '';
			if(ca == "undefined" || ca == ''){}else{
				if(ca < 0){
					da = Math.abs(ca)
					ca = ''

				}else{
					ca =  Math.abs(ca)
				}
			}
			data.push({ date, ledgername, VOUCHERTYPE, VOUCHERid, da, ca });
			}else{
				console.log(element)
			}
		});
		console.log(data);
		this.setState({ data });
  }
  
  onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
       
			const a =  this.state.detail.filter((e)=> e.VOUCHER ? e.VOUCHER.VOUCHERNUMBER._text == rowInfo.original.VOUCHERid && e.VOUCHER.VOUCHERTYPENAME._text == rowInfo.original.VOUCHERTYPE : console.log("phew")) 
			this.props.dispatch({type:'CurrentInvoice',index:a[0]})
            Router.push({
              pathname: '/Invoice',
             
          })
        }
    }
}

	render() {
		const header = [
			{
				Header: 'Date',
				accessor: 'date' // String-based value accessors!
			},
			{
				Header: 'Name',
				accessor: 'ledgername' // String-based value accessors!
			},
			{
				Header: 'Voucher type',
				accessor: 'VOUCHERTYPE' // String-based value accessors!
			},
			{
				Header: 'Voucher Id',
				accessor: 'VOUCHERid' // String-based value accessors!
			},
			{
				Header: 'Debit Amount',
				accessor: 'da' // String-based value accessors!
			},
			{
				Header: 'Credit Amount',
				accessor: 'ca' // String-based value accessors!
			}
		];

		return (
			<div className="container-fluid">
				<h1 className="h3 mb-2 text-gray-800">DayBook</h1>
				<p className="mb-4">Here You will be shown records from DAYBOOK OF tally .</p>
				<DatePicker selected={this.state.startDate} onChange={this.handleChange} />{' '}
				<DatePicker selected={this.state.endDate} onChange={this.handleChange1} />
				<a
					style={{ marginLeft: 10 }}
					onClick={() => this.Db([ this.state.sd, this.state.ed ])}
					className="btn btn-success btn-icon-split"
				>
					<span className="icon text-white-50">
						<i className="fas fa-check" />
					</span>
					<span className="text"> SearchAgain</span>
				</a>
				<br />
				<br />
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
					</div>
					<div className="card-body">
						<div className="table-responsive">
							<ReactTable           filterable
  getTrProps={this.onRowClick} data={this.state.data} columns={header} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state /*, ownProps*/) => {
  console.log(state)
  return {
  }
  }
  export default connect(
  mapStateToProps  )(PurchaseReg);