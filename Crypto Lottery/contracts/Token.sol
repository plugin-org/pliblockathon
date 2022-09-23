// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./ERC20.sol";

contract Token is ERC20 {
  constructor() ERC20("Crypto Lottery", "CL") {}
}