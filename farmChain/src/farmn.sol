// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FarmerModule{
    address farmer=0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    struct FarmerDetails{
        string name;
        uint256 adhar;
        uint256 mobile;
        string state;
        string city;
        uint256 pincode;
        string crops;

        uint256 price;

    }
    FarmerDetails user;
    bytes32 hash;
    event log(uint Bolck,uint TIME);


    modifier condition(){
        require(msg.sender == farmer,"Farmer Only Acessable!!");
        _;
    }
    function getData(string memory Name,uint256 Adhar,uint256 Mobile,string memory State,string memory City,uint256 Pincode,string memory Crops,uint256 Price) public condition returns(bool){
        user.name = Name;
        user.adhar = Adhar;
        user.mobile = Mobile;
        user.state = State;
        user.city = City;
        user.pincode = Pincode;
        user.crops = Crops;
        user.price = Price;

        emit log(block.number,block.timestamp);
        return true;
    }
    

    function generateHash()public condition returns(bytes32){
        hash = keccak256(abi.encodePacked(user.name,uint256(user.adhar),uint256(user.mobile),user.state,user.city,uint256(user.pincode),uint256(user.pincode),user.crops,uint256(user.price)));
        
        return hash;
    }
}