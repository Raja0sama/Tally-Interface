const Groups = (props) => {
	return (
		`
    <ENVELOPE>
<HEADER>
<TALLYREQUEST>Export Data</TALLYREQUEST>
</HEADER>
<BODY>
<EXPORTDATA>
<REQUESTDESC>
<STATICVARIABLES>
<!-- Specify the period here -->
<SVFROMDATE>` +
		props[0] +
		`</SVFROMDATE>
<SVTODATE>` +
		props[1] +
		`</SVTODATE>
<!-- Specify the Ledger Name here -->
<GROUPNAME>` +
		props[2] +
		`</GROUPNAME>
<!--  Display Narration  -->
<EXPLODENARRFLAG>Yes</EXPLODENARRFLAG>
<!-- Specify the Export format here  HTML or XML or SDF -->
<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
</STATICVARIABLES>
<!-- Specify the Report Name here -->
<REPORTNAME>Group Vouchers</REPORTNAME>
</REQUESTDESC>
</EXPORTDATA>
</BODY>
</ENVELOPE>`
	);
};

export default Groups;
