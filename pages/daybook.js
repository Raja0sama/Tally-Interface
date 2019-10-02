import {Sidebar,ContentArea} from '../Assets/Component'
import '../Assets/Headers/index'
import { Provider } from 'react-redux'
import store from '../Assets/Redux/Store'

const Daybook = () => (
  <Provider store={store}> 
  <div>
  <div id="wrapper">
    <Sidebar/>
    <ContentArea/>
    </div>
  </div>
  </Provider>
);

export default Daybook;