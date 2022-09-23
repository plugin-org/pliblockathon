const ethers = require("ethers")

export default async function createEvent(req, res) {
  try {
    const pubKey = req.body.publicKey;
    const eventID = req.body.eventID;
    // const secret = req.body.secret;
    const adminPubKey = "0xb4b2fb126b0e055012d53a6718134b6eaee3b5de"
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address[]",
            "name": "_owners",
            "type": "address[]"
          },
          {
            "internalType": "string",
            "name": "_eventTypeName",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "Confirmation",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "Execution",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "ExecutionFailure",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "a",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "i",
            "type": "uint256"
          }
        ],
        "name": "Received",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "Submission",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "acceptance",
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
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "confirmTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "confirmTransactionReject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "confirmations",
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
        "name": "deployer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "eventTypeName",
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
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "executeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "isConfirmed",
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
            "name": "",
            "type": "address"
          }
        ],
        "name": "isDeployer",
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
            "name": "",
            "type": "address"
          }
        ],
        "name": "isOwner",
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
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "owners",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "required",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "revokeConfirmation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "destination",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "eventId",
            "type": "string"
          }
        ],
        "name": "submitTransaction",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "transactionCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "bool",
            "name": "executed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "accepted",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "destination",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ]

    const contract_address = pubKey

    let rpcProvider = "https://erpc.apothem.network"
    let privateKey = "" //deployer private key

    const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    const signer = new ethers.Wallet(privateKey,provider)
    const contract = new ethers.Contract(contract_address,abi, signer);
    let sequenceNum
    async function callContract(){
        // const tokenBalance = await contract.required();
        // console.log(tokenBalance.toString());
        // const trx = await contract.transactionCount();
        // console.log(trx.toString());

        // const isOwner = await contract.isOwner("0xb4b2fb126b0e055012d53a6718134b6eaee3b5de");
        // console.log(isOwner);
        const contract_address = ""
        const sendTrxt = await contract.submitTransaction(adminPubKey, eventID)
        console.log(sendTrxt);
        sequenceNum = await contract.transactionCount()

        // const transactions = await contract.transactions(1)
        // const transactionsZero = await contract.transactions(0)

        // console.log(transactions)
        // console.log(transactionsZero)
    }

    await callContract()

    res.status(200).json({ message: "Event Created", seq : sequenceNum.toString()});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
