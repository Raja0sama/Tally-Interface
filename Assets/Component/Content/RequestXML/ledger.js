const ledger = (props) => {
    return `<ENVELOPE>
    <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
    <EXPORTDATA>
    <REQUESTDESC>
    <STATICVARIABLES>
    <!-- Specify the Period here -->
    <SVFROMDATE>`+props[0]+`</SVFROMDATE>
    <SVTODATE>`+props[1]+`</SVTODATE>
    <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    <!--  F12 @ Show billwise is set to Yes  -->
    <DBBILLEXPLODEFLAG>YES</DBBILLEXPLODEFLAG>
    <!--  Option Show Voucher Numbers also = Yes  -->
    <EXPLODEVNUM>YES</EXPLODEVNUM>
    <!--   Show Running Balance = Yes  -->
    <SHOWRUNBALANCE>Yes</SHOWRUNBALANCE>
    <!--  Specify the Ledger Name here  -->
    <LEDGERNAME>`+props[2]+`</LEDGERNAME>
    </STATICVARIABLES>
    <REPORTNAME>Ledger Vouchers</REPORTNAME>
    </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default ledger
