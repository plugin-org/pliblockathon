# 8Lives.

8Lives is a Blockchain Organ Donation prototype created as a proof-of-concept for a decentralized solution. The application is built on Ethereum, more specifically on Remix where the smart contract is compiled and deployed. XDCpay serves as a wallet for managing the fake XDC coins. A front-end interface application is built in JavaScript and interacts with the back-end via Web3.js. 

[![Watch the video](https://raw.githubusercontent.com/Bogeshwararao/8Lives/main/ytpicture.png)](https://www.youtube.com/watch?v=mFzQlzk_bKU)


# 8 different organs can be donated from human body.

## Getting Started

The following instructions will create a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- XDCPay Chrome extension needs to be installed. (https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo)

### Installing

Clone the 8Lives. repository onto local machine.
```
git clone https://github.com/Bogeshwararao/8Lives.git
```
Open the index.html file and ensure it displays the following:
 <img src="https://raw.githubusercontent.com/dharshini78/8Lives/main/UI%20of%20the%20dApp/dApp's%20UI/1.png" data-canonical-src="https://raw.githubusercontent.com/dharshini78/8Lives/main/UI%20of%20the%20dApp/dApp's%20UI/1.png" width="756" height="406"/>
 
## Setting up the Environment
- Go to https://remix.ethereum.org and import the OrganDonation.sol file.

### Compile and Deploy Smart Contract
- Compile Solidity file.
- Select Injected Web3 under Environment.
- Deploy and confirm in XDC Apothem testnet
- Ensure that the smart contract address matches the one in the web3.js file (line 437)
- Otherwise, update the address.

```
const contractAddress = 'insert smart contract address';
```

### Testing the Application
The website should now show that is it online.

## Other pages:


# Donor registration form

 <img src="https://raw.githubusercontent.com/Bogeshwararao/8Lives/main/UI%20of%20the%20dApp/dApp's%20UI/2.png" data-canonical-src="https://raw.githubusercontent.com/Bogeshwararao/8Lives/main/UI%20of%20the%20dApp/dApp's%20UI/2.png" width="756" height="406"/>
 
 # Authorize XDCPay

  <img src="https://raw.githubusercontent.com/Bogeshwararao/8Lives/main/UI%20of%20the%20dApp/dApp's%20UI/3.png" data-canonical-src="https://raw.githubusercontent.com/Bogeshwararao/8Lives/main/UI%20of%20the%20dApp/dApp's%20UI/3.png" width="756" height="406"/>
  
  # Transaction made successfully

   <img src="https://github.com/Bogeshwararao/8Lives/blob/main/UI%20of%20the%20dApp/dApp's%20UI/4.png?raw=true" data-canonical-src="https://github.com/Bogeshwararao/8Lives/blob/main/UI%20of%20the%20dApp/dApp's%20UI/4.png?raw=true" width="756" height="406"/>

