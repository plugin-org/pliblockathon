const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getVerifications",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "block",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "internalType": "struct Sharpid.verification[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isFaculty",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isfaculty",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "regno",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "phone",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "dept",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "valid",
        "type": "string"
      }
    ],
    "name": "issueID",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "msg",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "error",
            "type": "bool"
          }
        ],
        "internalType": "struct Sharpid.result",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "readMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "sendVerification",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewID",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "regno",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "dob",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phone",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "dept",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "valid",
            "type": "string"
          }
        ],
        "internalType": "struct Sharpid.id",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

// const contractAddress = "0xCbd1759c4C810207b328eA33495284Ee3aF1aDf1"
const contractAddress = "0x4419324ff6c7B6edCc0cAc9F4A768527b2203EBc"
const RPCURL = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
var accounts, web3, contract, w3;

const onLoad = async () => {
  if (window.xdc) {
    window.web3 = new Web3(window.xdc);
    window.xdc.enable();
    accounts = await web3.eth.getAccounts();
    w3 = new Web3(RPCURL);
    contract = new web3.eth.Contract(contractABI, contractAddress);

  } else {
    alert("Please install XDC Pay extension!");
  }
}

onLoad();