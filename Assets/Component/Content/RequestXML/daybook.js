const daybookxml = (props) => {
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
    </STATICVARIABLES>
    <!-- Specify the Report Name here -->
    <REPORTNAME>Voucher Register</REPORTNAME>
    </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default daybookxml
