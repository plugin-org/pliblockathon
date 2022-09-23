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
 
  $("#addvehicle").on("click", async (e) => {
    e.preventDefault();
    console.log("Iam at approve")
    await farmcontract.methods.getData(_registrationNo,_obdId, _vehicleType,_yearOfManufacture,_fuelType)
      .send({ from: accounts[0] })
      .then(async () => {
        console.log('testing');
      });
  });
};

// const weatherXDCBalance = (ecocontract)=>{
//   $("#weatherDefiXDCBalance").on("click", async (e) => {
//     e.preventDefault();
//     const rate = await ecocontract.methods.getXDCBalance().call().then(res => {
//       const xdc = web3.utils.fromWei(res, 'ether');
//       console.log(xdc);
//     });
//   });
// }

async function famChainFunctionApp() {
  const web3 = await loadWeb3();
  
  const accounts = await web3.eth.getAccounts();
  
  const hashContarct = await getFarmChainContract(web3);     
 
  submitGetData(hashContarct, accounts); 
}

famChainFunctionApp();
