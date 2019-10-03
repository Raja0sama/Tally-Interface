import React,{useState} from 'react';
import Link from 'next/link';
import { useRouter  } from 'next/router'
import firebase  from '../../Firebase'
import 'firebase/auth';
import 'firebase/firestore';

const  Sidebar = () => {
  const router = useRouter()
  const a = 0
  router.pathname == "/" ? 1 : 0
  
  const [state, setstate] = useState({})

return( 
  
     <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
<a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
  <div className="sidebar-brand-icon rotate-n-15">
 <h1>😎</h1></div>
  <div className="sidebar-brand-text mx-3">SUPER TALLY<sup>1</sup></div>
</a>

<hr className="sidebar-divider my-0"/>


<li className={"" +router.pathname == "/Dashboard"? "nav-item active" : "nav-item" }>
<Link href="/Dashboard">
  <a className="nav-link" >
    <i className="fas fa-fw fa-people">🏡</i>
    <span>Dashboard</span></a>
    </Link>
</li>


<hr className="sidebar-divider"/>

<div className="sidebar-heading">
  Interface
</div>

 <li className="nav-item">
  <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
    <i className="fas fa-fw fa">📃</i>
    <span>Registers</span>
  </a>
  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
    <div className="bg-white py-2 collapse-inner rounded">
      <h6 className="collapse-header">Register of Tally</h6>
      <Link href="/Dashboard/salesreg"><a className="collapse-item">Sales Register</a></Link>
      <Link href="/Dashboard/pruchaseReg"><a className="collapse-item">Pruchase Register</a></Link>
    </div>
  </div>
</li> 


<li className={"" +router.pathname == "/Dashboard/Accounts"? "nav-item active" : "nav-item" }>
<Link href="/Dashboard/Accounts">
  <a className="nav-link" >
    <i className="fas fa-fw fa-people">🤓</i>
    <span>Accounts</span></a>
    </Link>
</li>

<li className={"" +router.pathname == "/Dashboard/daybook"? "nav-item active" : "nav-item" }>
<Link href="/Dashboard/daybook">
  <a className="nav-link" >
    <i className="fas fa-fw fa-">📕</i>
    <span>Daybook</span></a>
    </Link>
</li>

<hr className="sidebar-divider d-none d-md-block"/>
<li className={"nav-item " }>
  <a data-toggle="modal" data-target="#exampleModal" className="nav-link" >
    <i className="fas fa-fw fa-">⚙</i>
    <span>Settings</span></a>
</li>
<li className={"nav-item "}>
  <a  onClick={()=> { firebase.auth().signOut().then(function() {
console.log("Successfully Loged out 🤞✌")
router.push('/auth')
}).catch(function(error) {
});}} style={{backgroundColor : '#e74a3b'}} className="nav-link" >
    <i className="fas fa-fw fa-pow">☠</i>
    <span>Logout</span></a>
</li>
{/* <li className={"" +router.pathname == "/salesreg"? "nav-item active" : "nav-item" }>
<Link href="/salesreg">
  <a className="nav-link" >
    <i className="fas fa-fw fa-table"></i>
    <span>Sales Register</span></a>
</Link>
</li>
<li className={"" +router.pathname == "/pruchaseReg"? "nav-item active" : "nav-item" }>
<Link href="/pruchaseReg">
  <a className="nav-link" >
    <i className="fas fa-fw fa-table"></i>
    <span>Pruchase Register</span></a>
</Link>
</li> */}

<hr className="sidebar-divider d-none d-md-block"/>

{/* <div className="text-center d-none d-md-inline">
  <button className="rounded-circle border-0" id="sidebarToggle"></button>
</div> */}

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Your Static IP</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Add An ip that can be used to access your tally over internet.</label>
        <input onChange={(e)=> setstate({ad : e.target.value})} className="form-control" id="exampleFormControlInput1" placeholder="Enter IP "/>
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={()=> isEmpty(state) ? console.log("Address is Empty 🤔") : firestoree(state)} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</ul>

)}
function firestoree(state){
  var db = firebase.firestore();
  const id = firebase.auth().currentUser.uid
  db.collection("users").doc(id).set({
    url: state.ad 
   
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
export default Sidebar