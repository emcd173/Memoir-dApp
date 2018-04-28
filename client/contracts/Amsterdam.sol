pragma solidity ^0.4.19;

import "./ownable.sol";

contract Amsterdam is ownable {

  // custom types
  struct Entry {
    uint id;
    uint unlockTime;
    address owner;
    string ipfs;
    string title;
    string descrip;
    uint entryType;
    uint[] enc_msg;
  }

  struct PK {
      uint id;
      uint[] key;
  }

  // state variables
  mapping (uint => Entry) public entries;
  mapping (uint => PK) private privateKeys;
  uint counter;

  // Event declaration
  event EvtRelease(
    address indexed _owner,
    uint[] _key,
    string _ipfs
    );

  event EventEncMsg(
    uint[] _enc_msg
    );

  event EventDecMsg(
    uint[] _dec_msg
    );

  function Amsterdam() public {
  }

  // add an entry to the blockchain
  function appendEntry(uint _unlockTime, string _ipfs, string _title, string _description, uint _entryType, uint[] _file, uint _rand) public {
    // a new entry
    counter++;
   // adding info to Entry struct
   entries[counter] = Entry(
       counter,
       _unlockTime + block.timestamp,
       msg.sender,
       _ipfs,
       _title,
       _description,
       _entryType,
       encrypt(counter, _file, _rand)
       );

    privateKeys[counter] = PK(
      counter,
      get_key(counter, _file)
      );
  }

  function encrypt(uint _id, uint[] _message, uint _rand) private returns(uint[]) {
        uint[] memory mssg = _message;
        uint len = mssg.length;
        uint[] memory enc_msg = new uint[](len);
        privateKeys[_id].key = new uint[](len);

        for (uint i = 0; i < len; i++) {
            privateKeys[_id].key[i] = _rand % 26;
            if (mssg[i] >= 65 && mssg[i] <= 90)
                enc_msg[i] =  (mssg[i] - 65 + privateKeys[_id].key[i]) % 26;
            else if (mssg[i] >= 97 && mssg[i] <= 122)
                enc_msg[i] =  (mssg[i] - 97 + privateKeys[_id].key[i]) % 26;
            else
                enc_msg[i] = mssg[i];
        }

        // tigger the event
        EventEncMsg(entries[_id].enc_msg);

        return(enc_msg);

    }

  function release(uint _id) public{
    // check if it is time to release
    require(now >= entries[_id].unlockTime);
    decrypt(_id);
    EvtRelease(entries[_id].owner, privateKeys[_id].key, entries[_id].ipfs);
  }

  function get_key(uint _id, uint[] _message) private view returns(uint[]){

          uint len = _message.length;
          uint[] memory temp = new uint[](len);

          for (uint i = 0; i < len; i++) {
              temp[i] = privateKeys[_id].key[i] + 65;
          }
          return temp;
      }

  function decrypt(uint _id) private returns(uint[]){
    uint len = entries[_id].enc_msg.length;
    uint[] memory dec_msg = new uint[](len);
          for (uint i = 0; i < len; i++) {
              if ((entries[_id].enc_msg[i] - privateKeys[_id].key[i]) < 0)
                  dec_msg[i] =  entries[_id].enc_msg[i] - privateKeys[_id].key[i] + 26;
              else if ((entries[_id].enc_msg[i] - privateKeys[_id].key[i]) >= 0)
                  dec_msg[i] =  entries[_id].enc_msg[i] - privateKeys[_id].key[i];
              else
                  dec_msg[i] =  entries[_id].enc_msg[i];
          }
          // trigger the event
          EventDecMsg(dec_msg);

          return(dec_msg);
      }


  /* function eventTestRelease(uint _id) public {
    EvtRelease(entries[_id].owner, privateKeys[_id].key, entries[_id].ipfs);
  }

  function eventTestEnc(uint[] _enc_msg) public {
    EventEncMsg(_enc_msg);
  }

  function eventTestDec(uint[] _dec_msg) public {
    EventDecMsg(_dec_msg);
  } */


  // some getter functions

  function getIPFS(uint _id) constant public returns (string x) {
      return entries[_id].ipfs;
  }

  function getTotalentries() public view returns (uint x){
      return counter;
  }

  function getDescrip(uint _id) constant public returns (string x) {
    return entries[_id].descrip;
  }

  function getTitle(uint _id) constant public returns (string x) {
      return entries[_id].title;
  }

  function getUnlockTime(uint _id) constant public returns(uint x) {
      return entries[_id].unlockTime;
  }

}

