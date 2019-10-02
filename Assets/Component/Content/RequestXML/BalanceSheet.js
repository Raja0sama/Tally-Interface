const balanceSheet = (props) => {
    return `<ENVELOPE>
    <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
    <EXPORTDATA>
    <REQUESTDESC>
    <STATICVARIABLES>
    <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
    </STATICVARIABLES>
    <REPORTNAME>Balance Sheet</REPORTNAME>
    </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default balanceSheet