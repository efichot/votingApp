var Voting = artifacts.require("./Voting.sol");
var ProofOfExistence = artifacts.require("./ProofOfExistence.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting);
  deployer.deploy(ProofOfExistence);
};
