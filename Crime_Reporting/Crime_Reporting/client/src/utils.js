const contract_addr = 'xdc1d9942468558d71a93af2d6f4de2d606921d361e';


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
  const data = await $.getJSON("./contracts/abi.json");
  console.log('data',data);
  const eco1 = new web3.eth.Contract(
    data,
    "0xde1564946748D573e9309f7bEc68AB6c5253Bc5D"
  );
  console.log("eco1",eco1)
  return eco1;
};


// async function addComp() {


//   console.log("I am in addCompm")

//   const accounts = await web3.eth.getAccounts();

//   const IncidentContract = new web3.eth.Contract(abivar);

//   await IncidentContract.methods
//     .addComplaint(values)
//     .send({
//       from: accounts[0]
//     })
//     .then(() => {
//       console.log("Added Successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }
