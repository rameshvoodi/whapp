//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract white{

    uint8 public maxWhiteListedAccounts;

    mapping(address => bool) public whiteListedAccounts;

    uint8 public noOfWhiteListedAccounts;

    constructor(uint8 _maxWhiteListedAccounts){

        maxWhiteListedAccounts = _maxWhiteListedAccounts;
        
    }

    function addToWhiteList() public {

        require(!whiteListedAccounts[msg.sender], "Sender has already been whitelisted!");

        require(noOfWhiteListedAccounts < maxWhiteListedAccounts, "limit reached, more addresses cannot be added");

        whiteListedAccounts[msg.sender] = true;

        noOfWhiteListedAccounts+= 1;

    }

}