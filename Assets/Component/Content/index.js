import Daybook from '../Content/Daybook';
import Invoice from '../Content/Invoice';
import SalesRegs from '../Content/SalesReg';
import PurchaseReg from '../Content/PurchaseReg';
import Ledger from '../Content/Ledger';
import LedgerG from '../Content/LedgerG';
import Account from '../Content/Accounts';
import Receivables from '../Content/Receivables';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
// import firebase from '../../Firebase';
// import 'firebase/auth';
// import 'firebase/firestore';

import { useRouter } from 'next/router';
const Content = (props) => {
	if (isEmpty(props.PG)) {
		return (
			<div className="alert alert-warning" role="alert">
				<h1>Please Wait ✋✋✋✋✋ ✌😊😁😎</h1>
				<p>
					If nothing this doesnot goes away, that can be because either your are not logged in or the data
					source is not responding.
				</p>
			</div>
		);
	} else {
		const router = useRouter();
		const ip = isEmpty(props.PG) ? 'http://110.37.224.158:5000/Tally' : 'http://' + props.PG.Ip + ':5000/Tally';
		const ip2 = isEmpty(props.PG)
			? 'http://110.37.224.158:5000/GetExcelData'
			: 'http://' + props.PG.Ip + ':5000/GetExcelData';
		switch (router.pathname) {
			case '/Dashboard/salesreg':
				return <SalesRegs ip2={ip2} ip={ip} />;
				break;
			case '/Dashboard/daybook':
				return <Daybook ip2={ip2} ip={ip} />;
				break;
			case '/Dashboard':
				return <Dashboard ip={ip} />;

			case '/Dashboard/pruchaseReg':
				return <PurchaseReg />;

			case '/Dashboard/Receivables':
				return <Receivables ip={ip} />;

			case '/Dashboard/Accounts':
				return <Account ip={ip} />;
		}

		if (router.pathname.includes('/Dashboard/LedgerV')) {
			const { AccountN } = router.query;
			return <Ledger query={AccountN} ip={ip} />;
		}
		if (router.pathname.includes('/Dashboard/GLedgerV')) {
			const { AccountN } = router.query;
			return <LedgerG query={AccountN} ip={ip} />;
		}

		if (router.pathname.includes('/Dashboard/invoice')) {
			let { invoiceNumber } = router.query;
			if (typeof invoiceNumber === 'undefined') {
				invoiceNumber = router.query.id;
			}
			return <Invoice query={invoiceNumber} ip2={ip2} ip={ip} />;
		} else {
			return (
				<div className="alert alert-warning" role="alert">
					<h1>No Page Exist with That URL BOI 🤷‍ 🤷‍</h1>
				</div>
			);
		}
	}
};
const mapStateToProps = (states) => {
	// console.log(states)
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
export default connect(mapStateToProps)(Content);
