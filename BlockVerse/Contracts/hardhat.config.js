// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config({ path: ".env" });

// const XINFIN_NETWORK_URL = process.env.XINFIN_NETWORK_URL;
// const XINFIN_PRIVATE_KEY = process.env.XINFIN_PRIVATE_KEY;

// module.exports = {
//   solidity: "0.8.9",
//   networks: {
//     xinfin: {
//       url: XINFIN_NETWORK_URL,
//       accounts: [XINFIN_PRIVATE_KEY],
//     },
//   },
// };


require('dotenv').config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
console.log("ashdogahsdgsd", process.env.PRIVATE_KEY)
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    local: {
      url: 'http://localhost:8545'
    },
    xdcapothem: {
      url: 'https://erpc.apothem.network',
      accounts: [process.env.XINFIN_PRIVATE_KEY],
    }
  },
  paths: {
    artifacts: "./app/src/artifacts"
  }
};