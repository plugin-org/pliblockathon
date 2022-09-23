const submitGetData =  async (contract, account) => {
    let _patientId;
    let _hashValue;

    await contract.methods.getPatientData(_patientId, _hashValue).send({from: account[0]}).then(async (data) => {
        return {"status" : 200, "message": "SUCCESS", "data" : data}
    })
}



async function App() {
    const web3 = await loadWeb3();
    
    const accounts = await web3.eth.getAccounts();
    
    const hashContarct = await getFarmChainContract(web3);     
   
    submitGetData(hashContarct, accounts); 
  }
  
App();