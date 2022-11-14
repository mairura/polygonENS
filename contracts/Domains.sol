// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Domains {
    //A mapping data type to store their names
    mapping(string => address) public domains;

    constructor () {
        console.log("Domain contract here");
    }

    //A register function that adds their names to our mapping
    function register(string calldata name) public {
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    //This would give us domains owners' address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }
}