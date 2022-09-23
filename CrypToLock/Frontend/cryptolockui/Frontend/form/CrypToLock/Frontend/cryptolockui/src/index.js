const submitGetData = (farmcontract, accounts) => {
    let _ownadd;
    let _timetolock;
    let _nooftoken;
    let _recptadd;
    
    $("#ownadd").on("change", (e) => {
      _ownadd = e.target.value;
      console.log("_ownadd", _ownadd)
  
    });
    $("#timelock").on("change", (e) => {
      _timetolock = e.target.value;
      console.log("_timelock", _timelock)
  
    });
    $("#recptadd").on("change", (e) => {
      _recptadd = e.target.value;
      console.log("_recptadd", _recptadd)
  
    });
    $("#nooftoken").on("change", (e) => {
      _nooftoken = e.target.value;
      console.log("_nooftoken", _nooftoken)
  
    });
   
    $("#lockbtn").on("click", async (e) => {
      console.log("Iam at approve", ecocontract._address)
      e.preventDefault();
      await farmcontract.methods.lock()
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
        
    
  async function cryptolock() {
    const web3 = await loadWeb3();
    console.log("Web3", web3);
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);
    // console.log("Web3", accounts);
    // const farmcontract = await getFarmChainContract(web3);     //Crowdsale Contract
    // console.log("farmcontract", farmcontract);
    // submitGetData(farmcontract, accounts); // should be called by customer
  }
  
  cryptolock()
  