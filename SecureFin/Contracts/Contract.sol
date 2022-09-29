pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SecureFin is ERC20 {

	constructor() ERC20("SecureFin Token", "SKFIN") {
		_mint(msg.sender, 10000000 * 10 ** 18);
	}

    struct Bid {
        address BidderId;
        uint256 Amount;
        uint256 Interest;
        uint256 BidDate;
        bool SelectStatus;
    }

	struct Asset {
        address BorrowerId;
        string AssetName;
        string AssetFileName;
        string AssetHash;
        uint256 CreatedDate;
        address Validator;
        bool ValidationStatus;
        uint256 ValidationAmount;
        uint256 ValidationDate;
        Bid[] Bids;
	}

	mapping(string => Asset) internal AssetMap;

	function CreateAsset(string memory AssetId, string memory AssetName, string memory AssetFileName, string memory AssetHash) public returns (bool){
        AssetMap[AssetId].BorrowerId=msg.sender;
        AssetMap[AssetId].AssetName=AssetName;
        AssetMap[AssetId].AssetFileName=AssetFileName;
        AssetMap[AssetId].AssetHash=AssetHash;
        AssetMap[AssetId].CreatedDate=block.timestamp;
		return true;
	}

	function ValidateAsset(string memory AssetId, bool ValidationStatus, uint256 ValidationAmount) public returns (bool){
        AssetMap[AssetId].Validator=msg.sender;
        AssetMap[AssetId].ValidationStatus=ValidationStatus;
        AssetMap[AssetId].ValidationAmount=ValidationAmount;
        AssetMap[AssetId].ValidationDate=block.timestamp;
		return true;
	}

        
	function BidLoan(string memory AssetId, uint256 Amount, uint256 Interest) public returns (bool){
		Bid memory ThisBid = Bid(msg.sender, Amount, Interest, block.timestamp, false);
        AssetMap[AssetId].Bids.push(ThisBid);
        return true;
	}

	function FinaliseBid(string memory AssetId, address BidderId) public returns (bool){

		for(uint256 i=0; i<AssetMap[AssetId].Bids.length; i++)
        {
            if(AssetMap[AssetId].Bids[i].BidderId == BidderId) {
                require(balanceOf(BidderId) >= AssetMap[AssetId].Bids[i].Amount , "Bidder do not have enough balance");
                transferFrom(BidderId, AssetMap[AssetId].BorrowerId, AssetMap[AssetId].Bids[i].Amount);
                AssetMap[AssetId].Bids[i].SelectStatus=true;
                break;
            }
        }

        return true;
	}

}
