var Amsterdam = artifacts.require("./Amsterdam.sol");

module.exports = function(deployer) {
  deployer.deploy(Amsterdam, 60, "Key 1", "IFPS 1", "descrip 1");
}
