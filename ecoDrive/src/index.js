const convertTokens = async (n) => {
  b = new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));
  return b;
}

const addVehicle = (ecocontract, accounts) => {
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
  $("#chasisnumber").on("change", (e) => {
    _chasisNo = e.target.value;
    console.log("chasisNo", _chasisNo)

  });
  $("#addvehicle").on("click", async (e) => {
    console.log("Iam at approve", ecocontract._address)
    e.preventDefault();
    await ecocontract.methods.addVehicle(_registrationNo, _obdId, _vehicleType, _yearOfManufacture, _fuelType, _chasisNo)
      .send({ from: accounts[0] })
      .then(async () => {
        console.log('add vehicle testing');
      });
  });
};

// buy insurance
const buyInsurance = (ecocontract, accounts) => {
  let _period;

  $("#period").on("change", (e) => {
    _period = e.target.value;
    console.log("_period", _period)
  });

  $("#buyInsurance").on("click", async (e) => {
    console.log("buyInsurance", ecocontract._address)
    e.preventDefault();
    const tokens = await convertTokens("5");
    console.log("buyInsurance Token: ", tokens);
    await ecocontract.methods.buyInsurance(_period)
      .send({
        from: accounts[0],
        value: tokens
      })
      .then(async () => {
        console.log('buy insurance testing');
      });
  });
}


const getReward = (ecocontract, accounts) => {
  $("#getReward").on("click", async (e) => {
    e.preventDefault();

    await ecocontract.methods.getReward(1, 40, 100)
      .send({
        from: accounts[0],
      })
      .then(async () => {
        console.log('get reward  testing');
      });

  });
}

// // const connectWalletBtn = async () => {
// $("#connectToWallet").on("click", async (e) => {
//   e.preventDefault();

//   const accounts = await window.web3.eth.getAccounts()
//   if (accounts.length > 0) {
//     console.log("accounts", accounts);
//     $("#wallet-btn-nav").hide();
//     $("#connectToWallet").hide();

//     // $('#wallet').hide();

//   } else {
//     alert("Please login XDC pay")
//   }

// });
// // }


async function ecoFunctionApp() {
  const web3 = await loadWeb3();
  console.log("Web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  console.log("Web3", accounts);
  const ecocontract = await getEcoContract(web3);
  console.log("ecocontract", ecocontract);
  addVehicle(ecocontract, accounts);
  buyInsurance(ecocontract, accounts);
  getReward(ecocontract, accounts);
}

ecoFunctionApp();
