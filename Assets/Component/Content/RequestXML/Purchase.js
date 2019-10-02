const Purchase = (props) => {
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
    <SVTODATE>`+props[0]+`</SVTODATE>
    <VOUCHERTYPENAME>Purchase</VOUCHERTYPENAME>
    <!-- Detailed or Condensed Format -->
    <EXPLODEFLAG>Yes</EXPLODEFLAG>
    <!-- Displays Bill-wise details -->
    <DBBILLEXPLODEFLAG>Yes</DBBILLEXPLODEFLAG>
    <!-- Display Stock Item details -->
    <DBINVEXPLODEFLAG>Yes</DBINVEXPLODEFLAG>
    <!-- Specify the Report FORMAT here -->
    <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    </STATICVARIABLES>
    <!-- Specify the Report Name here -->
    <REPORTNAME>Voucher Register</REPORTNAME>
    </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default Purchase