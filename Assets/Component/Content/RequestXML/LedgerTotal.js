const LedgerTotal = (props) => {
    return `<ENVELOPE>
    <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
    <EXPORTDATA>
    <REQUESTDESC>
    <STATICVARIABLES>
    <!-- Specify the FROM DATE here -->
    <SVFROMDATE>`+props[0]+`</SVFROMDATE>
    <!-- Specify the TO DATE here -->
    <SVTODATE>`+props[1]+`</SVTODATE>
    <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    <!-- Specify the LedgerName here -->
    <LEDGERNAME>`+props[2]+`</LEDGERNAME>
    </STATICVARIABLES>
    <!-- Report Name -->
    <REPORTNAME>Ledger Vouchers</REPORTNAME>
    </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default LedgerTotal