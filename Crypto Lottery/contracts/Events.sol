// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Events {
  event ClaimTicketRewardEvent(uint tier, bool free_ticket, uint token_reward, uint eth_reward );
  event InvestEvent(uint value, uint tokens);
  event WithdrawEvent(uint amount);
  event InProgressEvent(bool value);
}