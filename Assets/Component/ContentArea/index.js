import React from 'react';
import NavBar from '../Nav'
import Head from 'next/head';
import Content from '../Content/index'
const  ContentArea = () => 

    {return (
    <div id="content-wrapper" className="d-flex flex-column">

      <div id="content">

        <NavBar/>

      <Content/>
   
      </div>

 
      <Head>
      <script src="https://use.fontawesome.com/c41db8aaac.js"></script>

  <script src="static/vendor/jquery/jquery.min.js"></script>
  <script src="static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="static/vendor/jquery-easing/jquery.easing.min.js"></script>
  <script src="static/vendor/jquery/jquery.min.js"></script>
  <script src="static/js/sb-admin-2.min.js"></script>    </Head>
    </div>
)
}
export default ContentArea