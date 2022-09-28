// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";

contract OrganDonation {

    using Counters for Counters.Counter;
    Counters.Counter private patientCount;
    Counters.Counter private donorCount;
    
    struct Patient {
        uint id;
        string firstname;
        string lastname;
        string medid;
        string bloodtype;
        string height;
        string weight;
        string status;
    }
    
    struct Donor {
        uint id;
        string firstname;
        string lastname;
        string medid;
        string bloodtype;
        string height;
        string weight;
        string status;
    }
    
    mapping(uint256 => Patient) public patients;
    mapping(uint256 => Donor) public donors;
    
    constructor() {
        patientCount.increment();
        donorCount.increment();
    }

    function validateMedicalData(string memory _medid) public pure returns (string memory) {
        if (bytes(_medid).length > 0) {
            // In real life, would use oracle to access healthcare institution data for validation
            string memory _status = 'eligible';
            return _status;
        }
    }
    
    function addPatient(string memory _firstname, string memory _lastname, string memory _medid, string memory _bloodtype, string memory _height, string memory _weight) public {
        
        // Set parameters as required
        require(bytes(_firstname).length > 0);
        require(bytes(_lastname).length > 0);
        require(bytes(_medid).length > 0);
        require(bytes(_bloodtype).length > 0);
        require(bytes(_height).length > 0);
        require(bytes(_weight).length > 0);
        
        string memory _status = validateMedicalData(_medid);
        uint256 _patientid = patientCount.current();
        // Check if requirements satisfied
        if (bytes(_firstname).length > 0 && bytes(_lastname).length > 0 && bytes(_medid).length > 0 && bytes(_bloodtype).length > 0 && bytes(_height).length > 0 && bytes(_weight).length > 0) {
            patients[_patientid] = Patient(_patientid, _firstname, _lastname, _medid, _bloodtype, _height, _weight, _status);
        }
        patientCount.increment();
    }
    
    function addDonor(string memory _firstname, string memory _lastname, string memory _medid, string memory _bloodtype, string memory _height, string memory _weight) public {
        // Set parameters as required
        require(bytes(_firstname).length > 0);
        require(bytes(_lastname).length > 0);
        require(bytes(_medid).length > 0);
        require(bytes(_bloodtype).length > 0);
        require(bytes(_height).length > 0);
        require(bytes(_weight).length > 0);
        string memory _status = validateMedicalData(_medid);
        uint256 _donorid = donorCount.current();
        // Check if requirements satisfied
        if (bytes(_firstname).length > 0 && bytes(_lastname).length > 0 && bytes(_medid).length > 0 && bytes(_bloodtype).length > 0 && bytes(_height).length > 0 && bytes(_weight).length > 0) {
            donors[_donorid] = Donor(_donorid, _firstname, _lastname, _medid, _bloodtype, _height, _weight, _status);
        }
        donorCount.increment();
    }
    
    function getPatient(uint _index) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        return (patients[_index].firstname, patients[_index].lastname, patients[_index].medid, patients[_index].bloodtype, patients[_index].height, patients[_index].weight, patients[_index].status);
    }
    
    function getDonor(uint _index) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        return (donors[_index].firstname, donors[_index].lastname, donors[_index].medid, donors[_index].bloodtype, donors[_index].height, donors[_index].weight, donors[_index].status);
    }

    /* Returns all Patient Records */
    function fetchAllPatients() public view returns (Patient[] memory) {
        uint256 itemCount = patientCount.current() - 1;
        uint256 currentIndex = 0;
        Patient[] memory pat = new Patient[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
                uint256 currentId = i + 1;
                Patient storage currentItem = patients[currentId];
                pat[currentIndex] = currentItem;
                currentIndex += 1;
        }
        return pat;
    }
    /* Returns all Donors Records */
    function fetchAllDonors() public view returns (Donor[] memory) {
        uint256 itemCount = donorCount.current() - 1;
        uint256 currentIndex = 0;

        Donor[] memory don = new Donor[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
                uint256 currentId = i + 1;
                Donor storage currentItem = donors[currentId];
                don[currentIndex] = currentItem;
                currentIndex += 1;
        }
        return don;
    }
    
}