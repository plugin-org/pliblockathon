const submitGetData = (farmcontract, accounts) => {
  let _aadhar;
  let _type;
  let _country;
  let _state;
  let _city;
  let _zip;
  let _date;
  let _description;

  _date = "hsdghdshd";
  console.log("Date : ", _date)
  _month = "hsdghdshdhsdghdshd";
  console.log("Month : ", _month)
  _year = "hsdghdshd";
  console.log("Year : ", _year)

  $("#complain-id").on("change", (e) => {
    _aadhar = e.target.value;
    console.log("AadharNo: ", _aadhar)

  });
  $("#dropdown-id").on("change", () => {
    _type ="sgsdgds";
    console.log("Type : ", _type)

  });
  $("#country").on("change", (e) => {
    _country = e.target.value;
    console.log("Country : ", _country)

  });
  $("#state").on("change", (e) => {
    _state = e.target.value;
    console.log("State : ", _state)

  });
  $("#city").on("change", (e) => {
    _city = e.target.value;
    console.log("City : ", _city)

  });
  $("#zip").on("change", (e) => {
    _zip = e.target.value;
    console.log("Zipcode : ", _zip)

  });
  $("#date").on("change", () => {
    var date = new Date($(this).val());
    _date = date.getDate();
    console.log("Date : ", _date)
  });
  $("#complain-desc").on("change", (e) => {
    _description = e.target.value;
    console.log("Description : ", _description)

  });
  $("#complainBtn").on("click", async (e) => {
    console.log("Iam at approve", farmcontract._address)
    e.preventDefault();
    const values = [_aadhar,_type,_country,_state,_city,_zip,_date,_month,_year]
    await farmcontract.methods.addComplaint(_aadhar,_type,_country,_state,_city,_zip,_date,_description)
      .send({ from: accounts[0] })
      .then(async () => {
        console.log('testing');
      });
  });
};

const weatherXDCBalance = (ecocontract)=>{
  $("#weatherDefiXDCBalance").on("click", async (e) => {
    e.preventDefault();
    const rate = await ecocontract.methods.getXDCBalance().call().then(res => {
      const xdc = web3.utils.fromWei(res, 'ether');
      console.log(xdc);
    });
  });
}

async function incidentReportApp() {
  const web3 = await loadWeb3();
  console.log("Web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  console.log("Web3", accounts);
  const farmcontract = await getFarmChainContract(web3);     //Crowdsale Contract
  console.log("farmcontract", farmcontract);
  submitGetData(farmcontract, accounts); // should be called by customer
 // addComp();
}

incidentReportApp();
