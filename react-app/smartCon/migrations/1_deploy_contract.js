// const { artifacts } = require("truffle");
const Registry = artifacts.require("../contracts/Registry.sol");
// const Fundraiser = artifacts.require("FundRaiser.sol");

module.exports = function (deployer) {
  deployer.deploy(Registry);
};
