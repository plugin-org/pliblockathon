// const express = require("express");
// const app = express();
// const cors = require("cors")

// app.use(cors());
// app.use(express.json());

async function loadWeb3(){
    // console.log(window.ethereum);

    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0];
    // console.log(account);

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
}

async function startapp(){
    const web3 = await loadWeb3();
    console.log("Web3", web3);
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);

    const provider = new Web3(window.web3.currentProvider);

    const message = "Hello I am King";

    let signature = await web3.eth.personal.sign(message, accounts[0], '');
    console.log(signature);
}

async function Getaccounts(){
    const web3 = await loadWeb3();
    console.log("Web3", web3);
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);

    console.log(urlParams.get("toaccount"), urlParams.get("value"));
    let isvalidaddress = web3.utils.isAddress(urlParams.get("toaccount"))
    if(!isvalidaddress == false)
    {
        sendrawtransaction(urlParams.get("toaccount"), urlParams.get("value"));
    }
}

async function sendrawtransaction(toaccount, eth)
{
    const web3 = await loadWeb3();
    console.log("Web3", web3);
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    var count = await web3.eth.getTransactionCount(toaccount);
    const gasAmount = await web3.eth.estimateGas({
        to: toaccount,
        from: accounts[0],
        value: eth
    });
    web3.eth.sendTransaction(
        {
            from:accounts[0],
            to:toaccount,
            value:  eth, 
            data: "0xdf",
            gasPrice: web3.utils.toHex(1000000000),
            gasLimit: web3.utils.toHex(220000),
            noce: web3.utils.toHex(count)
        }, function(err, transactionHash) {
      if (!err)
        console.log(transactionHash + " success"); 
        return transactionHash;
    });
}

// app.get("/sendeth", async (req, res, next) => {
//     let trans = sendrawtransaction(req.body.account, req.body.eth);
//     res.send({"txhash":trans});
//     next();
//   });

// app.listen(3000);

Getaccounts();