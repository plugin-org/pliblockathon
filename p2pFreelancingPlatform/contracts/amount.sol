//SPDX-License-Identifier: MECHsquad 

pragma solidity ^0.8.17;

contract _address {
    uint public amt;

    function getAmount(uint _amt) public payable {
        amt = _amt;
    }
}