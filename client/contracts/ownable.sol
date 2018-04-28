pragma solidity ^0.4.18;

contract ownable {
  // state variables
  address owner;

  // modifiers
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // constructor
  function ownable() public {
    owner = msg.sender;
  }
}
