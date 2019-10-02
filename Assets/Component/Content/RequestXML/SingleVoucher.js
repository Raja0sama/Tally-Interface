const singleV = (props) => {
    return `<ENVELOPE>  
    <HEADER>  
      <VERSION>1</VERSION>  
      <TALLYREQUEST>  EXPORT</TALLYREQUEST>  
      <TYPE>COLLECTION</TYPE>  
      <ID>  RTSAllVouchers_FilterForVchNoAndVchType</ID>  
    </HEADER>  
    <BODY>  
      <DESC>  
        <STATICVARIABLES>  
          <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>  
          <!-- TODO : Specify the VoucherNo -->  
          <RTS_KEY>`+props[0]+`</RTS_KEY>  
          <!-- TODO : Specify the VoucherType here -->  
          <RTS_VOUCHERTYPENAME>`+props[1]+`</RTS_VOUCHERTYPENAME>  
        </STATICVARIABLES>  
        <TDL>  
          <TDLMESSAGE>  
            <!-- Retrieve all Vouchers for specified VoucherNo and VoucherType -->  
            <COLLECTION NAME="RTSAllVouchers_FilterForVchNoAndVchType" ISINITIALIZE="Yes">  
                <TYPE>Voucher</TYPE>  
                <FETCH>ALLLEDGERENTRIES.*</FETCH>  
                <FETCH>LEDGERENTRIES.*</FETCH>  
                <FETCH>NARRATION.*</FETCH>  
                <FETCH>PARTYLEDGERNAME.*</FETCH>  
                
                <FETCH>ALLINVENTORYENTRIES.*</FETCH>  
                <FILTER>RTS_FilterForVchNoAndVchType</FILTER>  
            </COLLECTION>  
            <VARIABLE NAME="RTS_KEY">  
              <TYPE> String</TYPE>  
            </VARIABLE>  
            <VARIABLE NAME="RTS_VOUCHERTYPENAME">  
              <TYPE>String</TYPE>  
            </VARIABLE>  
            <SYSTEM TYPE="FORMULAE" NAME="RTS_FilterForVchNoAndVchType">  
              $VoucherNumber = $$String:##RTS_KEY and $VoucherTypeName = $$String:##RTS_VOUCHERTYPENAME
            </SYSTEM>  
          </TDLMESSAGE>  
        </TDL>  
      </DESC>  
    </BODY>  
  </ENVELOPE>  `
}

export default singleV