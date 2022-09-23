const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const owners = ["0xbfed167b20b6a31cd2d7996582bad9f9f8864f13","0xdf0ff33d14afdb1694d14838289c7dac27fad567"]
    const eventTypeName = "TempName"
    // console.log("Hello World")
    // console.log(owners)
    // owners = owners.split(",")
    // log("----------------------------------------------------")
    // log("Deploying Multisig and waiting for confirmations...")
    const multiSig = await deploy("MultiSignatureWallet", {
        from: deployer,
        args: [owners,eventTypeName],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`###${multiSig.address}###`)
}

module.exports.tags = ["all", "multiSig"]
