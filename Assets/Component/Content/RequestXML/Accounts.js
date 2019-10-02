const accounts = (props) => {
    return `
    <ENVELOPE>
    <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>List of Accounts</REPORTNAME>
        <STATICVARIABLES>
           <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
           <ACCOUNTTYPE>Ledgers</ACCOUNTTYPE>
        </STATICVARIABLES>
      </REQUESTDESC>
    </EXPORTDATA>
    </BODY>
    </ENVELOPE>`
}

export default accounts