//SPDX-License-Identifier: MECHsquad

pragma solidity ^0.8.7;

contract freelance {

    address public owner;
    uint private id;

    constructor() {
        owner = msg.sender;
        id = 0;
    }

    struct customer {
        address client;
        string skillRequirement;
        string job;
    }

    event customerDetails (
        address client,
        string skillRequirement,
        string job
    );

    mapping(uint256 => customer) customers;

    function addToDatabase(
        string memory skillRequirement,
        string memory job
    ) public payable {
        customer storage clients = customers[id];
        clients.skillRequirement = skillRequirement;
        clients.job = job;
        clients.client = msg.sender;

        emit customerDetails(
                msg.sender,
                skillRequirement,
                job
            );

        payable(owner).transfer(msg.value);


    }

    function getDetails() public view returns (
        string memory,
        string memory,
        address
    ) {
          customer storage t = customers[id];
          return(t.skillRequirement, t.job, t.client);
    }

}