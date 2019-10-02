import '../../../static/invoice.css'
import React from 'react'

const Invoice = () => {
    return (<div className="container" id="invoice"><main style={{margin:40}}>
        <div id="details" className="clearfix">
          <div id="client">
            <div className="to">INVOICE TO:</div>
            <h2 className="name">John Doe</h2>
            <div className="address">796 Silver Harbour, TX 79273, US</div>
            <div className="email"><a href="mailto:john@example.com">john@example.com</a></div>
          </div>
          <div id="invoice">
            <h1>INVOICE 3-2-1</h1>
            <div className="date">Date of Invoice: 01/06/2014</div>
            <div className="date">Due Date: 30/06/2014</div>
          </div>
        </div>
        <table border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th className="no">#</th>
              <th className="desc">DESCRIPTION</th>
              <th className="unit">UNIT PRICE</th>
              <th className="qty">QUANTITY</th>
              <th className="total">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="no">01</td>
              <td className="desc"><h3>Website Design</h3>Creating a recognizable design solution based on the company's existing visual identity</td>
              <td className="unit">$40.00</td>
              <td className="qty">30</td>
              <td className="total">$1,200.00</td>
            </tr>
            <tr>
              <td className="no">02</td>
              <td className="desc"><h3>Website Development</h3>Developing a Content Management System-based Website</td>
              <td className="unit">$40.00</td>
              <td className="qty">80</td>
              <td className="total">$3,200.00</td>
            </tr>
            <tr>
              <td className="no">03</td>
              <td className="desc"><h3>Search Engines Optimization</h3>Optimize the site for search engines (SEO)</td>
              <td className="unit">$40.00</td>
              <td className="qty">20</td>
              <td className="total">$800.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"></td>
              <td colspan="2">SUBTOTAL</td>
              <td>$5,200.00</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td colspan="2">TAX 25%</td>
              <td>$1,300.00</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td colspan="2">GRAND TOTAL</td>
              <td>$6,500.00</td>
            </tr>
          </tfoot>
        </table>
        <div id="thanks">Thank you!</div>
        <div id="notices">
          <div>NOTICE:</div>
          <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
        </div>
      </main></div>
      )
}
export default Invoice