const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

const startupContract = artifacts.require("startupContract");

module.exports = function (deployer) {
  deployer.deploy(startupContract);
};