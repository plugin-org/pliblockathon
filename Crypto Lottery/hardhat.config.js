require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('dotenv').config();

module.exports = {
  etherscan: {
    apiKey: {
      coinex: process.env.COINEX_API_KEY,
    },
    customChains: [
      {
        network: "coinex",
        chainId: 53,
        urls: {
          apiURL: "https://testnet.coinex.net/api/v1",
          browserURL: "https://testnet.coinex.net"
        }
      },
      {
        network: "evmos",
        chainId: 9000,
        urls: {
          apiURL: "",
          browserURL: ""
        }
      }
    ],
  },
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 80001,
      gasPrice: 'auto'
    },
    coinex: {
      url: "https://testnet-rpc.coinex.net",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 53,
      gasPrice: 'auto',
    },
    evmos: {
      url: "https://eth.bd.evmos.dev:8545",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 9000,
      gasPrice: 'auto'
    },
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 1287,
      gasPrice: 'auto'
    },
    celo: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 44757,
      gasPrice: 'auto'
    },
    klaytn: {
      url: "https://public-node-api.klaytnapi.com/v1/baobab",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 1001,
      gasPrice: 'auto'
    },
    cube: {
      url: "https://http-testnet-jp.cube.network",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 1819,
      gasPrice: 20000000000
    },
    aurora: {
      url: "https://testnet.aurora.dev",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 1313161555,
      gasPrice: 'auto'
    },
  },
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 60000
  },
  abiExporter: {
    path: './data/abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  }
};