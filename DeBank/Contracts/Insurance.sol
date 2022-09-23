// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Insurance{

    enum Outcome {
        NONE, DISASTER_HAPPEN, DISASTER_NOT_HAPPEN
    }
    uint public principal;
    uint public coupon;
    address public oracle;
    address payable public company;
    address payable public investor;
    uint public end;
    Outcome outcome;

    constructor(address _oracle, uint _principal, uint duration)public payable{
        oracle=_oracle;
        principal=_principal;
        coupon = msg.value;
        company = payable(msg.sender);
        end = block.timestamp + duration;
    }

    function invest()external payable {
        require(investor == address(0), 'investor already registered');
        require(msg.value == principal, 'not enough money sent');
        require(block.timestamp<end,'too late');
        investor = payable(msg.sender);
        investor.transfer(coupon);
    }

    function reportOutcome(Outcome _outcome) external {
        require(msg.sender == oracle, 'only oracle');
        require(investor != address(0), 'no investor registered');
        require(block.timestamp<end, 'too late');
        outcome = _outcome;

        if(_outcome == Outcome.DISASTER_HAPPEN){
            company.transfer(principal);

        }else {
            investor.transfer(principal);
        }
    }
}

