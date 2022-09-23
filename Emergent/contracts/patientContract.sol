
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract HashValue {
    string public hash;

    function getHash() external view returns (string memory) {
        return hash;
    }

    function putHash(string calldata _hash) external {
        hash = _hash;
    }
}
