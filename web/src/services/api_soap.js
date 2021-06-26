import axios from 'axios'

export let xmls = 
 `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:web="http://www.webserviceX.NET/">\
  <soapenv:Header/>\
  <soapenv:Body>\
    <web:soma>\
      <web:op1>5</web:op1>\
      <web:op2>4</web:op2>\
    </web:soma>\
  </soapenv:Body>\
  </soapenv:Envelope>`;

  // export let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
  //                           xmlns:web="http://www.webserviceX.NET/">\
  //           <soapenv:Header/>\
  //           <soapenv:Body>\
  //             <web:ConversionRate>\
  //               <web:FromCurrency>INR</web:FromCurrency>\
  //               <web:ToCurrency>USD</web:ToCurrency>\
  //             </web:ConversionRate>\
  //           </soapenv:Body>\
  //         </soapenv:Envelope>';

export const URI = '/?wsdl'

export const api_soap = axios.create({
  baseURL: 'http://localhost:8000',
})

