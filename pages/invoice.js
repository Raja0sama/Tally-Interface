import Link from 'next/link';
import {Sidebar,ContentArea} from '../Assets/Component'
import '../Assets/Headers/index'
import store from '../Assets/Redux/Store'
import { Provider } from 'react-redux'

const Invoice = () => (
  <Provider store={store}> 
  <div>
  <div id="wrapper">
    <Sidebar/>
    <ContentArea/>
    </div>
  </div>
  </Provider>
);

export default Invoice;