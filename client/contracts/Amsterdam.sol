pragma solidity ^0.4.19;

import "./ownable.sol";

contract Amsterdam is ownable {

  // custom types
  struct Entry {
    uint id;
    uint unlockTime;
    address owner;
    string key;
    string ipfs;
    string descrip;
  }

  Entry thisEntry;

  // state variables
  mapping (uint => Entry) public entries;
  uint counter;
  bool released = false;

  // Event declaration
  event EvtRelease(
    address indexed _owner,
    string indexed _key,
    string indexed _ipfs
    );

    // Event declaration
    event EvtRelease2(
      address _owner
      );

  function Amsterdam(uint _unlockTime, string _key, string _ipfs, string _description) public {
     thisEntry.unlockTime = now + _unlockTime;
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

    check();
    //release(thisEntry.id);
    EvtRelease2(entries[thisEntry.id].owner);
  }

  function check() internal view {
    while(now <= entries[thisEntry.id].unlockTime) {
      //do nothing
    }
  }


  function release(uint _id) public {
    // check if it is time to release
    //while(now <= entries[_id].unlockTime) {
      //do nothing
    //}

    //require(now >= entries[_id].unlockTime);
    // the function has already been called
    //require(!released);

    // now change value
    //released = true;
    // trigger an event
    EvtRelease(entries[_id].owner, entries[_id].key, entries[_id].ipfs);
  }

  function eventTest(uint _id) public {
    EvtRelease(entries[_id].owner, entries[_id].key, entries[_id].ipfs);
  }

  // some getter functions
  function getDescrip(uint _id) constant public returns (string x) {
    return entries[_id].descrip;
  }

  function getCountDown(uint _id) constant public returns (uint x) {
    if (entries[_id].unlockTime > now) {
        return (entries[_id].unlockTime - now);
    } else {
        return 0;
    }
  }

  function getNow() constant public returns (uint x) {
    return now;
  }

  function getUnlockTime(uint _id) constant public returns(uint x) {
      return entries[_id].unlockTime;
  }

}
