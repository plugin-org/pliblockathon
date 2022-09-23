const getWeb3 = () => {
  
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(ethereum);
        
          try {
              // Request account access if needed
              await ethereum.enable();
              // Acccounts now exposed
              await window.ethereum.request({ method: "eth_requestAccounts" });
             

              resolve(web3);
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        

          window.web3 = new Web3(web3.currentProvider);
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });
};

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return window.web3;
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return window.web3;
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

var address =  "0xd9145CCE52D386f254917e481eB44e9943F39138"

const getFarmChainContract = async (web3) => {
  const data = await $.getJSON("./contracts/abi.json");
  
  const eco1 = new web3.eth.Contract(
    data,
    address
  );
 
  return eco1;
};


