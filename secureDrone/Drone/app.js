import Web3 from "xdc3";
const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Xinfin browser detected. You should consider trying XDCpay"
      );
    }
  };
//Call the above function in useEffect() or componentdidmount() so to create window.web3 
loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        //
    } else {
        let accountBalance = await web3.eth.getBalance(accounts[0]);
        accountBalance = web3.utils.fromWei(accountBalance, "Ether");
        console.log("accountBalance", accountBalance)
        const contractInstance = new web3.eth.Contract(
            abi,
            "xdcf0F8549D441611F2c81D219C1F40F2c28371089C"
        );
    }
}

