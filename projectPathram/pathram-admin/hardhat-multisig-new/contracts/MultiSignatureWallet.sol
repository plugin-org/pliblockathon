//SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

//for xdcpay apothem
// ["0x00280c5a941f151db957a80d57388fec339dddeb","0x5c170619944fd791bcefe300c924b8f2889093a2"]

contract MultiSignatureWallet {
    
  //enum test{Accepted,Rejected,Pending} 
  //executed bool is to check whether all owners have seen the transaction(event)
    struct Transaction {
      bool executed;
      bool accepted;
      address destination;
      uint value;
      string data;
    }

    event Received(address a, uint i);

    event Deposit(address indexed sender, uint value);
    event Submission(uint indexed transactionId);
    event Confirmation(address indexed sender, uint indexed transactionId);
    event Execution(uint indexed transactionId);
    event ExecutionFailure(uint indexed transactionId);

    /// @dev Fallback function allows to deposit ether.
    fallback()
    	external
        payable
    {
        if (msg.value > 0) {
            emit Deposit(msg.sender, msg.value);
	}
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }


    address[] public owners;
    uint public required;
    mapping (address => bool) public isOwner;
    mapping (address => bool) public isDeployer;


    uint public transactionCount;
    mapping (uint => Transaction) public transactions;

    mapping (uint => mapping (address => bool)) public confirmations;

    mapping (uint => mapping (address => bool)) public acceptance;
    //temp
    
    string public eventTypeName;
    address public deployer;

    constructor(address[] memory _owners,string memory _eventTypeName) public 
        {
        for (uint i=0; i<_owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        required = _owners.length;
        eventTypeName = _eventTypeName;
        deployer = msg.sender;
        isDeployer[deployer] = true;
    }

    // modifier validRequirement(uint ownerCount, uint _required) {
    //     if (_required > ownerCount || _required == 0 || ownerCount == 0)
    //         revert();
    //     _;
    // }  

    //submit transaction - eventId, value=0, admin address
    function submitTransaction(address destination, string memory eventId) 
        public payable
        returns (uint transactionId) 
    {
        require(isOwner[msg.sender] || isDeployer[deployer]);
        transactionId = addTransaction(destination, 0, eventId);
        // confirmTransaction(transactionId);
    }


    /// @dev Allows an owner to confirm a transaction.
    /// @param transactionId Transaction ID.
    function confirmTransaction(uint transactionId)
        public
    {
        require(isOwner[msg.sender]);
        require(transactions[transactionId].destination != address(0));
        require(confirmations[transactionId][msg.sender] == false);
        confirmations[transactionId][msg.sender] = true;
        acceptance[transactionId][msg.sender] = true;
        emit Confirmation(msg.sender, transactionId);
        executeTransaction(transactionId);
    }

function confirmTransactionReject(uint transactionId)
        public
    {
        require(isOwner[msg.sender]);
        require(transactions[transactionId].destination != address(0));
        require(confirmations[transactionId][msg.sender] == false);
        confirmations[transactionId][msg.sender] = true;
        acceptance[transactionId][msg.sender] = false;
        emit Confirmation(msg.sender, transactionId);
        executeTransaction(transactionId);
    }

    /// @dev Allows an owner to revoke a confirmation for a transaction.
    /// @param transactionId Transaction ID.
    function revokeConfirmation(uint transactionId) public {}

    /// @dev Allows anyone to execute a confirmed transaction.
    /// @param transactionId Transaction ID.
    function executeTransaction(uint transactionId)
        public
    {
        require(transactions[transactionId].executed == false);
        if (isConfirmed(transactionId)) {
            uint flag=0;
            for(uint i=0;i<required;i++)
            {
                if(acceptance[transactionId][owners[i]] == false)
                    flag=1;
            }           

            Transaction storage t = transactions[transactionId];
            if(flag==0)
                t.accepted = true;
            t.executed = true;

            (bool success,) = t.destination.call.value(t.value)("");
            if (success)
                emit Execution(transactionId);
            else {
                emit ExecutionFailure(transactionId);
                t.executed = false;
            }
        }
    }
		/*
		 * (Possible) Helper Functions
		 */
    /// @dev Returns the confirmation status of a transaction.
    /// @param transactionId Transaction ID.
    /// @return Confirmation status.
    function isConfirmed(uint transactionId)
        public
        view
        returns (bool)
    {
        uint count = 0;
        for (uint i=0; i<owners.length; i++) {
            if (confirmations[transactionId][owners[i]])
                count += 1;
            if (count == required)
                return true;
        }
    }


    function addTransaction(address destination, uint value, string memory eventId)
        internal
        returns (uint transactionId)
    {
        transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination: destination,
            value: value,
            data: eventId,
            executed: false,
            accepted:false
        });
        transactionCount += 1;
        emit Submission(transactionId);
    }
}