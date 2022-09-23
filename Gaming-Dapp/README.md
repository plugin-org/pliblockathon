# PLI BLOCKCHAIN HACKATHON
<br>

This is a project which is based on blockchain integration inside unity. Now adays unity is used to create metaverse and p2e games. By Which bigger crypto compnaies are selling the crypto's world wide. But there are only 10% of whole blockchain developers do P2E based games. So, me and my team used this chance to create a developer friendly SDK which use's NODE API for Backend for connecting wallets insdie Apothem Network. We have initiated this project based on real life SDK like ChainSafe which is use in ethereum network.

# How to use it:
<br>

So, First create a unity project inside the Unity hub. Once created import the TestVersion0.0.2.unity package inside it. After that run the node server and index.html at 4000 and 5500.


# Function Call's:
<br>

where ever you want first integrate the namespace ``` using XDC3;```. Then we can use those easy function's to intreact with blockchin. We are also able to Upload and Download Data inside blockchain.

# WALLET MANAGER FUNCTION's:
<br>
**XDC3.WalletManager.CreateWallet(string words, string password):**
  - By using this function we can able to create wallet inside unity. It will also save the memonic key phrase. when we want we can use this menomic to get he privatekey using password.


**XDC3.WalletManager.GenerateMemonic()**
  - By using this function we can create memonic key phrase. it will be a 12 strings hash. by which we can generate a new private key


**XDC3.WalletManager.ConnectWallet(string memonic, string password);**
  - By using this function we can connect existing wallet inside the unity using menomic and password. it will give us the Privatekey of the wallet by combing the menomic and password.

**XDC3.WalletManager.GetXDCBalance(string account);**

  - By Using this function we can get the XDC balance in wei. we want to pass address inorder to get the balance from the XDC apothem network.

**XDC3.WalletManager.GetMenomicFromTxt();**

  - By using this function we can select the menomic file from the computer and store the menomic for temp in local storage for one time use. Once you used it the menomic will automatically get cleared.


# XRC20 FUNCTION:
<br>
**await XDC20.GetXDC20Balance(string account, string contract)**
  - By using this function we can get any XRC20 standard balance by sending wallet address to the blockchain.

**XDC20.TransferXDC(string account, string password, value)**
  - By using this function we can transfer XDC value from unity without any support of any wallets using menomics and passwords.


# API CALLED FUNCTION:

**XDC20.TransferXRC20API(string toAddress, string ContractAddress, string value, this)**
  - By using this function we can transfer any erc20 you have using the XinPay Wallet. It will send a API request IMRS(Intermidate Redirect Server) which will create a pattern with a single session to the Game Dapp. the Game Dapp SDK will open the URL in the browser where the XDCPay wallet is located.

**XDC20.TransferXDCAPI(string toAddress, string value, this)**
  - By using function we can transfer XDC with API. Like before **XDC20.TransferXRC20API(string toAddress, string ContractAddress, string value, this)** there will be IMRS server create a pattern and returns to Gaming Dapp. It will inject the url into browser then it will do the transaction in the XdcPay.

<br>

## How and Why we build it:

First of all, we started with building smart contracts in the XinFin network. We used Xinpay wallet to get funds and deploy those contracts. then we created REST APIs to interact with the blockchain and Implemented them in the P2E game. We created a small shooter game in unity. We created a lobby area in which users can exchange ERC20 and ERC721 tokens between themselves. We used web3 in REST API. using the same REST API user can purchase NFTs.

In Node JS, For REST API we have used resources of the Xinfin network which is used to access the main functions to get and upload data to the blockchain. we have used express.js for porting and mapped to google cloud.

And we also building a Unity package that will help developers for developing metaverse-based games easier and developer friendly. By building this unity package we can have good communication between unity-based games and the Xinfin network. And we are also trying to link the Xinfin wallet to the unity game engine via the unity package.

## What is the Next of Gaming Dapp:

Some of the best companies like ETH, EOS, TRON, and ASTAR who are experts in blockchain say gaming will be the first actual use case for blockchain, revamping the industry and making games more immersive than ever. How gaming navigates the remaining hurdles will become a case study for other industries considering mass blockchain adoption. The adoption of these industries would be hard now in times but would be more scalable in the coming days. This is a DAPP(Decentralized Application) based game. Gaming DAPP is using an API specifically developed for the Xinfin network. This will make Game development on Xinfin network easier. 


## Thank you
