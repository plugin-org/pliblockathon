
pragma solidity ^0.8.17;

contract startupContract {
    uint256 public startupCount = 0;
    struct startup {
        uint256 id;
        string title;
        string description;
    }
    mapping(uint256 => startup) public startups;
    event startupCreated(uint256 id, string title, string description);
    function createStartup(string memory _title, string memory _description) public
    {
        startups[startupCount] = startup(startupCount, _title, _description);
        emit startupCreated(startupCount, _title, _description);
        startupCount++;
    }
}