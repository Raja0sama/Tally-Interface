import { Provider } from 'react-redux'
import store from '../Assets/Redux/Store'
import Auth from '../Assets/Component/Auth/'

const Authe = () => (
  <Provider store={store}> 
<Auth/>
  </Provider>
);

export default Authe;