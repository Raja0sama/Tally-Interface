const daybookxml = (props) => {
    return `<ENVELOPE>
    <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
    <EXPORTDATA>
    <REQUESTDESC>
    <STATICVARIABLES>
    <!-- Specify the period here -->
    <SVFROMDATE>`+props[0]+`</SVFROMDATE>
    <SVTODATE>`+props[1]+`</SVTODATE>
    <SHOWOPBILLAMT>Yes</SHOWOPBILLAMT>
    
    <!-- Specify the Export format here  HTML or XML or SDF -->
    <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    </STATICVARIABLES>
    <!-- Specify the Report Name here -->
    <REPORTNAME>Bills Receivable</REPORTNAME>
    </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default daybookxml
