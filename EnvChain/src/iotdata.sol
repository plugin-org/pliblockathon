// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract IOTData{

    uint256 public _storeid;

    struct Chain{
       string dataHash;
        address storedBy;
        uint256 storedOn;
    }

    mapping(uint256 => Chain) public chains;

    Chain user;
    event log(uint Block,uint TIME);

    constructor(){
        _storeid=1;
    }

    function pushData(string memory _hash) public returns(bool){
        user.dataHash = _hash;
        user.storedBy = msg.sender;
        user.storedOn = block.timestamp;
        chains[_storeid] = user;
        _storeid = _storeid + 1 ;
        return true;
    }

    function getData(uint256 _pullbyId) public returns(string memory,address,uint256){
        Chain memory c = chains[_pullbyId];
        return (c.dataHash,c.storedBy,c.storedOn);
    }

}