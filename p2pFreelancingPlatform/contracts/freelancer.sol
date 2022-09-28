//SPDX-License-Identifier: MECHsquad

pragma solidity ^0.8.7;

contract freelance {

    address public owner;
    uint private id;

    constructor() {
        owner = msg.sender;
        id = 0;
    }

    struct freelancer {
        address freelancer;
        string skills;
        string bio;
        string name;
        string f1;
        string f2;
    }

    event details (
        address freelancer,
        string skills,
        string bio,
        string name,
        string f1,
        string f2
    );

    mapping(uint256 => freelancer) freelancers;

    function addToDatabase(
        string memory skills,
        string memory bio,
        string memory name,
        string memory f1,
        string memory f2
    ) public payable {
        freelancer storage newlancers = freelancers[id];
        newlancers.skills = skills;
        newlancers.bio = bio;
        newlancers.freelancer = msg.sender;
        newlancers.f1 = f1;
        newlancers.f2 = f2;

        emit details(
                msg.sender,
                skills,
                bio,
                name,
                f1,
                f2
            );

        payable(owner).transfer(msg.value);


    }

    function getDetails() public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        address
    ) {
          freelancer storage t = freelancers[id];
          return(t.skills, t.bio, t.name, t.f1, t.f2, t.freelancer);
    }

}