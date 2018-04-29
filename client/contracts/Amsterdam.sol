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
    uint pub_key;
    bool isReleased;
  }

  struct PK {
    uint id;
    uint priv_key;
}

  struct Temp {
    uint id;
    uint pubKey;
    uint privKey;
  }

// state variables
mapping (uint => Entry) public entries;
mapping (uint => PK) private privateKeys;
mapping (uint => Temp) private temperary;
uint counter;
uint[] primes;

// Event declaration
event EvtRelease(
  address indexed _owner,
  uint _key,
  string _ipfs
  );

event EventPubKey(
  uint _pubkey
  );

event EventEnty(
  string title,
  uint id
  );

function getKeyPair() public {
  // generate psdeudo random large primes
  uint p;
  uint q;
  p = genPrimes()[0];
  q = genPrimes()[1];

  //delcare variable
  uint[] memory returnValues = new uint[](2);
  uint pubKey;
  uint privKey;
  pubKey = generateKeyPair(p, q)[0];
  privKey = generateKeyPair(p, q)[1];
  counter++;
  temperary[counter] = Temp(
    counter,
    pubKey,
    privKey
    );
  EventPubKey(returnValues[0]);
}

  function Amsterdam(uint[] _primes) public {
    primes = _primes;
  }

// add an entry to the blockchain
function appendEntry(uint _unlockTime, string _ipfs, string _title, string _description, uint _entryType) public {
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
     temperary[counter].pubKey,
     false
     );

  privateKeys[counter] = PK(
    counter,
    temperary[counter].privKey
    );

    EventEnty(_title, counter);
}

  function generateKeyPair(uint _p, uint _q) public returns(uint[]) {
    uint e;
    uint d;
    uint[] memory returnValues = new uint[](2);
    // step one: multiple the primes together
    uint n = _p * _q;
    // step two: calculate the Carmicheal's totient function
    uint pminus = _p - 1;
    uint qminus = _q - 1;
    uint lamda = lcm(pminus, qminus);
    // step three: pick a number e, such that 1 < e < lamda and gcd(e, lamda) = 1
    // this is done by simply choosing a prime number that is not a divisor of lamda
    for (uint i = 11; i < lamda; i++) {
      if(isPrime(i) && lamda % i > 0)
        e = i;
        break;
    }
    // step 4: calculate d, such that d is 1/e mod lamda
    //d = modinv(lamda, e);
    // step 5: return public key (e) and private key (d)
    //returnValues[0] = e; - to be edited
    //returnValues[1] = d; - to be edited
    returnValues[0] = 17;
    returnValues[1] = 413;
    return(returnValues);
  }

  function release(uint _id) public{
    // check if it is time to release
    // require(now >= entries[_id].unlockTime);
    // change isReleased value
    entries[_id].isReleased = true;
    // trigger an event
    EvtRelease(entries[_id].owner, privateKeys[_id].priv_key, entries[_id].ipfs);
  }


// some mathematical functions

  function random() public view returns (uint16) {
    return uint16(uint256(keccak256(block.timestamp, block.difficulty)) % 100);
  }

  function lcm(uint _x, uint _y) public returns(uint){
    uint greater;
    uint _lcm;
    if (_x > _y)
      greater = _x;
    else
      greater = _y;

    while(true) {
      if((greater % _x == 0 && greater % _y == 0))
        _lcm = greater;
        break;
      greater++;

    return(_lcm);
    }

  }

  function isPrime(uint _n) public returns(bool x) {
     if (_n <= 1)
         return(false);
     else if (_n <= 3)
         return(true);
     else if (_n % 2 == 0 || _n % 3 == 0)
         return(false);
     uint i = 5;
     while(i * i <= _n)
         if (_n % i == 0 || _n % (i+2) == 0)
             return(false);
         i = i++;
     return(true);
  }

   function genPrimes() public returns (uint[]){
    uint[] memory returnValues = new uint[](2);
    uint rand1 = random();
    uint rand2 = random();
    returnValues[0] = primes[rand1];
    returnValues[1] = primes[rand2];
    return(returnValues);

  }

  function egcd(uint a, uint b) public constant returns(uint[]) {
    uint g;
    uint y;
    uint x;
    uint calc;
    uint[] memory returnValues = new uint[](3);
    if (a == 0) {
      returnValues[0] = b;
      returnValues[1] = 0;
      returnValues[2] = 1;
      return(returnValues);
    } else {
      uint mod;
      mod = b % a;
      g = egcd(mod, a)[0];
      x = egcd(mod, a)[1];
      y = egcd(mod, a)[2];
      calc = (y - div(b,a) * x);
      returnValues[0] = g;
      returnValues[1] = calc;
      returnValues[2] = x;
      return(returnValues);
    }
  }

  function modinv(uint a, uint m) public constant returns(uint) {
    uint g;
    uint x;
    uint y;
    uint temp;
    g = egcd(a,m)[0];
    x = egcd(a,m)[1];
    y = egcd(a,m)[2];
    if (g == 1)
      temp = x % m;
      return(temp);
  }

  /* function div(uint256 a, uint256 b) public returns (uint256[]) {
    uint256 a2;
    uint256[] memory returnValues = new uint256[](2);
    returnValues[0] = a;
    uint256 c = a / b;
    a2 = b * c - a % b;
    returnValues[1] = a2;
    return(returnValues);
  } */

  function div(uint256 n, uint256 d) public returns(uint) {
    if (n < d) {
      return(0);
    } else (n >= d); {
      uint diff;
      diff = n-d;
      return(div(diff, d) + 1);
    }
  }

  /* def quotient( n , d ):

    if (0<=n<d):
        return 0
    if (n >= d):
        return quotient(n - d, d) + 1
    if n<0:
        return quotient(n + d, d) - 1 */

  // some getter functions

  function getIPFS(uint _id) constant public returns (string x) {
      return entries[_id].ipfs;
  }

  function getTotalEntries() public view returns (uint x){
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
