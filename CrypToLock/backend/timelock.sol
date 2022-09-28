//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract cryptolock{


    address owner;
    uint locktime;


    address reciptantaddress;


    constructor(){
        owner = msg.sender;
    }
      
    mapping(address => uint) balance;
    mapping(address => uint256)  LOCKTIME;
    mapping(address => uint) LOCKFUND;


    function showbalance() public view returns( uint ){
        return balance[msg.sender];
    }


    function getlocktime(uint _locktime) public {
        LOCKTIME[msg.sender] = _locktime; 
    }


    function getlockdata(uint _lockdata) public {
        require(balance[msg.sender]>0);
        LOCKFUND[msg.sender] = _lockdata;
    }


    function recptaddress (address recpaddress) public{
        reciptantaddress = recpaddress;
    }

    function lock() public view {
        require(LOCKFUND[msg.sender] >0,"Enter fund to be locked");
        require(block.timestamp > 0);

        revert("he funds are successfully locked");
    }

    function afterlocktime() public  {
        require(balance[msg.sender] > 0, "No Funds Availabe");
        require(block.timestamp > LOCKTIME[msg.sender], "Dude!!! The time hasn't expired yet"); 
        require(msg.sender == owner, "You are not the owner of the contract!! dude "); 

        if(reciptantaddress == owner){
            uint256 amount = balance[msg.sender]; 

        //balance[msg.sender] = 0;

            (bool sent,) = msg.sender.call{value: amount}(""); 
            require(sent, "Failed To Send Ether");
        }
        else{
            revert("Tokens sent successfully");
        }
        
        
     }




}