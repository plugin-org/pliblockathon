// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Sharpid {

  mapping (address => string) message;
  

  struct id {
        string name;
        uint256 regno;
        string dob;
        uint256 phone;
        string dept;
        string valid;
  }

  struct result{
      string msg;
      bool error;
  }

  struct verification{
      address from;
      address to;
      uint256 block;
      uint256 time;
  }

  bytes32 chash;

  string data;

  mapping (address => id) ids;
  mapping (address => verification[]) verified;

  address[]  fac = new address[](10);

  function isFaculty() public view returns(bool){
      address cs = msg.sender; 
      for(uint i = 0; i < fac.length; i ++){
          if(fac[i] == cs ){
              return true;
          }
      }
      return false;
  }

  function sendMessage(address _recipient , string memory _message) public {
    message[_recipient] = _message;
  }

  function readMessage() public view returns(string memory){
      return message[msg.sender];
  }

  function issueID(address _recipient,string memory name,uint256 regno,string memory dob,uint256 phone,string memory dept,string memory valid) public returns(result memory)  {
            bool flag = false;
            address cs = msg.sender; 
            for(uint i = 0; i < fac.length; i ++){
                if(fac[i] == cs ){
                    flag = true;
             }
            }
            if(flag){
                id memory _id;
                _id.name = name;
                _id.regno = regno;
                _id.dob = dob;
                _id.phone = phone;
                _id.dept = dept;
                _id.valid = valid;
                ids[_recipient] = _id;
                
                result memory res;
                res.msg = "Successfully issued";
                res.error = false;
                return res;
            } else {
                result memory res;
                res.msg = "Faculty verification Failed!";
                res.error = true;
                return res;
                
            }
  }

  function viewID() public view returns(id memory) {
      return ids[msg.sender];
  }

  function isfaculty() public view returns(bool){
      return isFaculty();
  }

  function sendVerification(address _recipient) public  {
      verification memory _v;
      _v.from = msg.sender;
      _v.to = _recipient;
      _v.time = block.timestamp;
      _v.block = block.number;
      verified[msg.sender].push(_v);
      verified[_recipient].push(_v);
  }

  function getVerifications() public view returns (verification[] memory){
      return  verified[msg.sender];
  }


  constructor(){
      fac[0] = (0x24f343adB0159BDA0AE12808Fd67FdD68E6C8154);
  }
  
}