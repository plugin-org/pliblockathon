// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import "./Lottery.sol";
import "./CrowdSale.sol";

contract CryptoLottery is Lottery, CrowdSale {
    uint private _price = 100000 * 10 ** 15;
    uint private _interval = 86400;
    uint private _t_price = 1 * 10 ** 15;
    uint private _f = 10;
    
    constructor() Lottery(_interval, _t_price, _f) CrowdSale(_price) {}
} 
