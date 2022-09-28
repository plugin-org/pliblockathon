//SPDX-License-Identifier: MECHsquad 

pragma solidity ^0.8.17;

contract _address {
    address public to;

    function getAddress(address _to) public payable {
        to = _to;
    }
}