pragma solidity ^0.4.20;

import "./ownable.sol";

contract Amersterdam is ownable {

  // custom types
  struct Entry {
    uint id;
    uint unlockTime;
    address owner;
    string key;
    string ipfs;
    string decrip;
  }

  Entry thisEntry;


  // state variables
  mapping (uint => Entry) public entries;
  uint counter;

  constructor(uint _unlockTime, string key, string _ipfs, string _description) {
     thisEntry.unlockTime = _unlockTime;
     thisEntry.key = _key;
     thisEntry.ipfs = _ipfs;
     thisEntry.descrip = _description;

  }


  // add an entry to the blockchain
  function appendEntry() public {
    // a new entry
    counter++;

    // adding info to constructor
    thisEntry.id = counter;
    thisEntry.owner = msg.sender;


    // store this entry
    entries[counter] = thisEntry;

    // lock it
    lock(thisEntry.unlockTime);

  }

if (entries[msg.sender].unlockTime <= now) {
    function release() {
        entries[].key;
    }
}


// some getter functions
function getDescrip() constant returns (uint x) {
    return entries[msg.sender].descrip;
  }

function getCountDown() constant returns (uint x) {
  return entries[msg.sender].unlockTime;
  }

function getNow() constant returns (uint x) {
    return now;
  }



}
