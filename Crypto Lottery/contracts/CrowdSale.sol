// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import "./Token.sol";
import "./Events.sol";

contract CrowdSale is Token, Events {

   address payable _owner;
   uint public tokenPrice;
   uint public raisedAmount;
   uint public withdrawAmount;
   bool public inProgress;

   constructor(uint _tokenPrice) {
     tokenPrice = _tokenPrice;
     inProgress = true;
     _owner = payable(msg.sender);
   }

   function invest () external payable {
     require(inProgress == true, 'Presale is over');

     raisedAmount += msg.value;

     uint tokens = msg.value / tokenPrice;

     _mint(msg.sender, tokens);
     
     emit InvestEvent(msg.value, tokens);
   }

   function winthdraw (uint amount) external {
     require(msg.sender == _owner, 'You are not an owner');
     require(withdrawAmount + amount <= raisedAmount, 'Contract is empty');
     
     withdrawAmount += amount;

     _owner.transfer(amount);

     emit WithdrawEvent(amount);
   }
   

   function setInProgress (bool value) external {
     require(msg.sender == _owner, 'You are not an owner');
     inProgress = value;
     emit InProgressEvent(value);
   }
   
}