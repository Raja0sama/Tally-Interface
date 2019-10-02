import React from 'react';
import axios from 'axios';
import ledger from './RequestXML/ledger';
import convert from 'xml-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selectTableHOC from 'react-table/lib/hoc/selectTable';
import Table from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Router from 'next/router';
import exportToCSV from './function';

const SelectTable = selectTableHOC(Table);

class Ledger extends React.Component {
	static defaultProps = {
		keyField: 'id'
	};

	static propTypes = {
		keyField: PropTypes.string
	};

	/**
	   * Toggle a single checkbox for select table
	   */
	toggleSelection = (key, shift, row) => {
		// start off with the existing state
		let selection = [ ...this.state.selection ];
		const keyIndex = selection.indexOf(key);

		// check to see if the key exists
		if (keyIndex >= 0) {
			// it does exist so we will remove it using destructing
			selection = [ ...selection.slice(0, keyIndex), ...selection.slice(keyIndex + 1) ];
		} else {
			// it does not exist so add it
			selection.push(key);
		}
		// update the state
		this.setState({ selection });
	};

	/**
	   * Toggle all checkboxes for select table
	   */
	toggleAll = () => {
		const { keyField } = this.props;
		const selectAll = !this.state.selectAll;
		const selection = [];

		if (selectAll) {
			// we need to get at the internals of ReactTable
			const wrappedInstance = this.checkboxTable.getWrappedInstance();
			// the 'sortedData' property contains the currently accessible records based on the filter and sort
			const currentRecords = wrappedInstance.getResolvedState().sortedData;
			// we just push all the IDs onto the selection array
			currentRecords.forEach((item) => {
				selection.push(`select-${item._original[keyField]}`);
			});
		}
		this.setState({ selectAll, selection });
	};

	/**
	   * Whether or not a row is selected for select table
	   */
	isSelected = (key) => {
		return this.state.selection.includes(`select-${key}`);
	};

	rowFn = (state, rowInfo, column, instance) => {
		const { selection } = this.state;

		return {
			onClick: (e, handleOriginal) => {
				console.log('It was in this row:', rowInfo);

				// IMPORTANT! React-Table uses onClick internally to trigger
				// events like expanding SubComponents and pivots.
				// By default a custom 'onClick' handler will override this functionality.
				// If you want to fire the original onClick handler, call the
				// 'handleOriginal' function.
				if (handleOriginal) {
					handleOriginal();
				}
			},
			style: {
				background: rowInfo && selection.includes(`select-${rowInfo.original.id}`) && 'lightblue'
			}
		};
	};

	state = {
		startDate: new Date(),
		sd: '',
		ed: '',
		endDate: new Date(),
		data: [],
		dataToDownload: [],
		selectAll: false,
		selection: []
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
        this.gettodayDate();
        console.log(this.props)
        if(!isEmpty(this.props.query)) {
            this.setState({name : this.props.query.q})
        }else{
            this.setState({name : false})
        }
	}
	Db(e) {
        const xmlrequest = ledger(e);
        console.log(xmlrequest)
		axios.post(this.props.ip, xmlrequest).then((res) => {
            let a = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 1 }));
            console.log(a)
			// a = a.ENVELOPE.BODY.IMPORTDATA.REQUESTDATA.TALLYMESSAGE;
            
			// this.setState({ detail: a });
			 this.Parsing(a);
		});
	}
	download = (event) => {
		console.log(this.state.detail);
		exportToCSV(this.state.data, 'Daybook');
	};

	Parsing(a) {
		if (Array.isArray(a.ENVELOPE.DSPEXPLVCHNUMBER)) {
			const data = [];
			a.ENVELOPE.DSPEXPLVCHNUMBER.forEach((element, i) => {
				data.push({ 
                    id: element._text, 
                    date:a.ENVELOPE.DSPVCHDATE[i]._text, 
                    ledgername : a.ENVELOPE.DSPVCHLEDACCOUNT[i]._text, 
                    VOUCHERTYPE : a.ENVELOPE.DSPVCHTYPE[i]._text, 
                    VOUCHERid : element._text.substring(6,element._text.length-1) ,
                     da : a.ENVELOPE.DSPVCHDRAMT[i] ? a.ENVELOPE.DSPVCHDRAMT[i]._text : "",
                     ca : a.ENVELOPE.DSPVCHCRAMT[i] ? a.ENVELOPE.DSPVCHCRAMT[i]._text : ""
               
                    });
			
            });
            console.log(data)
			this.setState({ data });
		}
	}

	onRowClick = (rowInfo) => {
        console.log(this.state.data)
        console.log(rowInfo.original.VOUCHERid)
      const a = search(rowInfo.original.VOUCHERid,this.state.data)
    //   console.log(a.VOUCHERid)
		Router.push(`/invoice?id=${a.VOUCHERid}`, `/invoice/${a.VOUCHERid}`);

		// Router.push({
		// 	pathname: '/Invoice/${a[0].VOUCHER.VOUCHERNUMBER._text}' ,query : {data : a[0].VOUCHER.VOUCHERNUMBER._text }
		// });
	};

	print = () => {
		if (this.state.selectAll) {
			this.printExtend();
		} else {
			if (this.state.selection.length != 0) {
				this.printExtend();
			}
		}
	};
	printExtend = () => {
		const print = [];
		this.state.selection.map((e) => {
			const a = e.substring(7);
			print.push(a);
		});
		const detail = this.state.detail.filter((f) => f.VOUCHER);
		const res = detail.filter((f) => print.includes(f.VOUCHER.VOUCHERNUMBER._text));
		res.forEach((e) => {
			this.PrintingRequest(e.VOUCHER);
		});
	};
	PrintingRequest = (data) => {
		const a = data;
		let al = '';
		let ledger = '';
		if (a['ALLLEDGERENTRIES.LIST']) {
			al = a['ALLLEDGERENTRIES.LIST'].length;
			ledger = 'ALLLEDGERENTRIES.LIST';
		} else {
			al = a['LEDGERENTRIES.LIST'].length;
			ledger = 'LEDGERENTRIES.LIST';
		}
		const VoucherType = a.VOUCHERTYPENAME._text;
		const VoucherId = a.VOUCHERNUMBER._text;
		const Account = a.PARTYLEDGERNAME._text;
		const children = [];
		console.log(a[ledger]);
		a[ledger]
			? a[ledger].map((e, i) => {
					if (e.LEDGERNAME._text == a.PARTYLEDGERNAME._text) {
					} else {
						children.push({ ledgername: e.LEDGERNAME._text, Amount: Math.abs(e.AMOUNT._text) });
					}
				})
			: console.log('');
		const amount = Math.abs(parseInt(a[ledger][al - 1].AMOUNT._text));
		const narration = a.NARRATION._text;
		const objec = { VoucherId, VoucherType, amount, Account, narration, children };
		axios.post(this.props.ip2, objec).then((res) => {
			console.log(res);
		});
	};

	render() {
        if(this.state.name == false){
            return (<div>
                <div className="alert alert-warning" role="alert">
				<h1>HMM 🤔🤔</h1>
				<p>
					Session Expired X"D i guess
				</p>
			</div>
            </div>)
        }else{
            return (
                <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800">Ledger 😎</h1>
                    <p className="mb-4">Here You will be shown records from Ledger OF tally .</p>
                    <DatePicker selected={this.state.startDate} onChange={this.handleChange} />{' '}
                    <DatePicker selected={this.state.endDate} onChange={this.handleChange1} />
                    <button
                        style={{ marginLeft: 10 }}
                        onClick={() => this.Db([ this.state.sd, this.state.ed,this.state.name ])}
                        className="btn btn-primary btn-icon-split"
                    >
                    <span className="icon text-white-50">
                        <i className="fas fa-check" />
                    </span>
                        <span className="text"> SearchAgain</span>
                    </button>
                    <br />
                    <br />
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                        </div>
                        <div className="card-body">
                            <button
                                style={{ margin: 10 }}
                                onClick={this.download}
                                className="btn btn-danger btn-circle btn-lg"
                            >
                                <i className="fas fa-arrow-down" />
                            </button>
                            <button
                                style={{ margin: 10 }}
                                onClick={this.print}
                                className="btn btn-primary btn-circle btn-lg"
                            >
                                <i className="fas fa-copy" />
                            </button>
    
                            <div className="table-responsive">
                                <SelectTable
                                    ref={(r) => (this.checkboxTable = r)}
                                    filterable
                                    keyField="id"
                                    //  getTrProps={this.onRowClick}
                                    data={this.state.data}
                                    toggleSelection={this.toggleSelection}
                                    selectAll={this.state.selectAll}
                                    selectType="checkbox"
                                    toggleAll={this.toggleAll}
                                    isSelected={this.isSelected}
                                    getTrProps={this.rowFn}
                                    columns={header(this.onRowClick)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
		
	}
}
const header = (onRowClick) => [
	{
		header: '',
		accessor: '[row identifier to be passed to button]',
		Cell: (row) => (
			<button
				onClick={() => {
					onRowClick(row);
				}}
				className="btn btn-danger btn-icon-split"
			>
				<span className="text">View Detail</span>
			</button>
		)
	},
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
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state);
	return {};
};
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].VOUCHERid === nameKey) {
            return myArray[i];
        }
    }
}

export default connect(mapStateToProps)(Ledger);
