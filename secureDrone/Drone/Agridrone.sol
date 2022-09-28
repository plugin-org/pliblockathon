//SPDX-License-verifier:MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SecureDrone is ERC20 {

	constructor() ERC20("SK Token", "SK") {
		_mint(msg.sender, 10000000 * 10 ** 18);
	}

	using SafeMath for uint256;
	uint8 private _decimals=18;
	uint256 _tokensperphr=1;

	struct order {
		address buyer;
		address seller;
		uint256 datavalue;
		uint requestdate;
		uint deliverydate;
		string requesttype;
	}
	
	event datarequest(string requestid, address indexed Farmer);

	mapping(string => order) internal orders;

	function placeOrder(string memory Farmerid, string memory datahash, uint256 datavalue, address seller, uint requestdate, uint deliverydate) public returns (bool){
		uint256 _datavalue = datavalue.mul(10**_decimals);
		require(balanceOf(msg.sender) >= _datavalue, "Do NOT have enough SK Tokens");
		approve(msg.sender, _datavalue);
		transferFrom(msg.sender, seller, _datavalue);
		orders[Farmerid] = order(msg.sender, seller, _datavalue, requestdate, deliverydate, "gen");
		emit datarequest(Farmerid, msg.sender);
		return true;
	}	

	function buydata(string memory Farmerid, uint256 datavalue, address seller, uint requestdate, uint deliverydate) public returns (bool){
		uint256 _datavalue = datavalue.mul(10**_decimals);
		require(balanceOf(msg.sender) >= _datavalue, "Do NOT have enough SK Tokens");
		approve(msg.sender,_datavalue);
		getdata(seller);
		orders[Farmerid] = order(msg.sender, seller, _datavalue, requestdate, deliverydate, "phr");
		emit datarequest(Farmerid, msg.sender);
		return true;
	}

	function getdata(address seller) private returns (bool) {
        uint256 tokensperphr = _tokensperphr.mul(10**_decimals);
		require(transferFrom(msg.sender, seller, tokensperphr));
    }

    function getOrder(string memory Farmerid) public view returns (order memory){
        return (orders[Farmerid]);
    }

    function checkOrder(string memory Farmerid) public view returns (bool){
        if(orders[Farmerid].buyer == msg.sender)
		{
			return true;
		}
		return false;
    }


}


