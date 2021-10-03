// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 public totalWaves;

    mapping(address => uint256) public addressToWaves;

    constructor() {
        console.log(
            "This is my smart contract. There are many like this. But, this one is mine."
        );
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved", msg.sender);
    }

    // repetetive, will delete
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getAddressToWaves() public view returns (uint256) {}
}
