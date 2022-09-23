const submitGetData = (farmcontract, accounts) => {
  let _registrationNo;
  let _obdId;
  let _vehicleType;
  let _yearOfManufacture;
  let _fuelType;
  $("#registrationNo").on("change", (e) => {
    _registrationNo = e.target.value;
    console.log("_vehicleNo", _registrationNo)

  });
  $("#obdId").on("change", (e) => {
    _obdId = e.target.value;
    console.log("obdId", _obdId)

  });
  $("#vehicleType").on("change", (e) => {
    _vehicleType = e.target.value;
    console.log("_vehicleType", _vehicleType)

  });
  $("#yearOfManufacture").on("change", (e) => {
    _yearOfManufacture = e.target.value;
    console.log("_yearOfManufacture", _yearOfManufacture)

  });
  $("#fuelType").on("change", (e) => {
    _fuelType = e.target.value;
    console.log("_fuelType", _fuelType)

  });
  $("#addvehicle").on("click", async (e) => {
    console.log("Iam at approve", ecocontract._address)
    e.preventDefault();
    await farmcontract.methods.getData(_registrationNo,_obdId, _vehicleType,_yearOfManufacture,_fuelType)
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

async function famChainFunctionApp() {
  const web3 = await loadWeb3();
  console.log("Web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  console.log("Web3", accounts);
  const farmcontract = await getFarmChainContract(web3);     //Crowdsale Contract
  console.log("farmcontract", farmcontract);
  submitGetData(farmcontract, accounts); // should be called by customer
}

famChainFunctionApp();
