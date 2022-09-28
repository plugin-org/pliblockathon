pragma solidity ^0.8.16;
contract deed {
 
  mapping (uint => address) public previousDeeds;
  mapping (uint => address) public nextDeeds;
  address public owner;
  address public registry;
  deed_status public status;
  uint public numNextDeeds;
  uint public numPreviousDeeds;
  bytes32 public url_to_claim;
  bytes32 public claim_hash;
  uint public live_time;
  uint public provisional_time;
  uint public dead_time;
  bytes32 public deed_name;
  enum  deed_status { provisional, live, dead }
  
  function deed (address _previousDeed, address _owner, bytes32 _deed_name) {
    previousDeeds[0] = _previousDeed;
    numPreviousDeeds = 1;
    owner = _owner;
    deed_name = _deed_name;
    registry = msg.sender;
    status = deed_status.provisional;
    provisional_time = now;
    live_time = 0 ;
    dead_time = 0;
    numNextDeeds = 0;
    url_to_claim = '';
    claim_hash = '';
  }

  function addParent(address _parent) {
    if (status != deed_status.provisional) throw;
    if (msg.sender != registry) throw;
    previousDeeds[numPreviousDeeds] = _parent;
    numPreviousDeeds++;
  }

  function configure_deed (bytes32 _url, bytes32 _hash) {
    if (status != deed_status.provisional) throw;
    url_to_claim = _url;
    claim_hash = _hash; 
  } 

  function commit (){
    if (status != deed_status.provisional) throw;
    status = deed_status.live;
    live_time = now; 
  }

  function transferSingle(address _newDeed) {
    if (status != deed_status.live) throw;
    if (msg.sender != registry) throw;
    nextDeeds[0] = _newDeed;
    numNextDeeds = 1;
  } 

  function addChild(address _child) {
    if (status != deed_status.live) throw;
    if (msg.sender != registry) throw;
    nextDeeds[numNextDeeds] = _child;
    numNextDeeds++;
  }
 
  function expire() {
    if (status != deed_status.live) throw;
    if (msg.sender != registry) throw;
    if (numNextDeeds == 0) throw;
    status = deed_status.dead;
    dead_time = now;
  }
}


contract landregister {
  mapping (uint => deed) public theRegister;
  uint public deedCount;

  function landregister () {
    deedCount=0;
  }
   
  event Log_CreateDeed(address _deedid);
  event Log_TransferSingle(address _deedid);
  event Log_Split(address _deedid1, address _deedid2);
  event Log_Join(address _deedid);

  function createDeed(bytes32 _url, bytes32 _hash, bytes32 _deed_name) {
    vard = new deed(0x0, msg.sender, _deed_name)
    [deedCount++] = d; 
    deed newdeed = deed(d);
    newdeed.configure_deed (_url, _hash);
    newdeed.commit();
    Log_CreateDeed(d);
  }

  function transferSingle(address _existing_deedid, address _newowner) {
    deed existing_deed = deed(_existing_deedid);
    if (existing_deed.owner() != msg.sender) throw;
    var newdeed_address = new deed(_existing_deedid, _newowner, existing_deed.deed_name());
    theRegister[deedCount++] = newdeed_address;
    deed newdeed = deed(newdeed_address);
    newdeed.configure_deed(existing_deed.url_to_claim(), existing_deed.claim_hash());
    newdeed.commit();
    existing_deed.transferSingle(newdeed_address);  
    existing_deed.expire();
    Log_TransferSingle(newdeed_address);
  }

  function split(address _existing_deedid, bytes32 _url1, bytes32 _url2, bytes32 _hash1, bytes32 _hash2, bytes32 _deed_name1, bytes32 _deed_name2) {
    deed existing_deed = deed(_existing_deedid);
    if (existing_deed.owner() != msg.sender) throw;
    var newdeed1 = new deed(_existing_deedid, msg.sender, _deed_name1);
    var newdeed2 = new deed(_existing_deedid, msg.sender, _deed_name2);
    newdeed1.configure_deed(_url1, _hash1);
    newdeed2.configure_deed(_url2, _hash2);
    newdeed1.commit();
    newdeed2.commit();
    theRegister[deedCount++] = newdeed1;
    theRegister[deedCount++] = newdeed2;
    existing_deed.addChild(newdeed1);
    existing_deed.addChild(newdeed2);
    existing_deed.expire();
    Log_Split(newdeed1, newdeed2);
  }
  
  function join(address _existing_deedid1, address _existing_deedid2, bytes32 _url, bytes32 _hash, bytes32 _deed_name) {
    deed existing_deed1 = deed(_existing_deedid1);
    if (existing_deed1.owner() != msg.sender) throw;
    deed existing_deed2 = deed(_existing_deedid2);
    if (existing_deed2.owner() != msg.sender) throw;
    var newdeed = new deed(_existing_deedid1, msg.sender, _deed_name);
    newdeed.addParent(_existing_deedid2);
    newdeed.configure_deed(_url, _hash);
    existing_deed1.addChild(newdeed);
    existing_deed2.addChild(newdeed);
    theRegister[deedCount++] = newdeed;
    newdeed.commit();
    existing_deed1.expire();
    existing_deed2.expire();  
    Log_Join(newdeed);
  }

}
