const getWeb3 = () => {
  console.log("Iam here 1")
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          console.log("Iam here 2")
          try {
              // Request account access if needed
              await ethereum.enable();
              // Acccounts now exposed
              await window.ethereum.request({ method: "eth_requestAccounts" });
              console.log("Iam here 3")

              resolve(web3);
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log("Iam here 3")

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

const getFarmChainContract = async (web3) => {
  var ABI=[
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "pnum",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "Teamname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "addIdea",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "Teamname",
        "type": "string"
      }
    ],
    "name": "getIdea",
    "outputs": [
      {
        "internalType": "int256",
        "name": "array",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
  // const data = await $.getJSON("./contracts/abi.json");

  console.log('data',data);
  const eco1 = new web3.eth.Contract(
   ABI,
    "0x0cf6ecbcd42191d6240e9c3229b2308846256e474f97bdc9535835761f7ec7f4"
  );
  console.log("eco1",eco1)
  return eco1;
};
