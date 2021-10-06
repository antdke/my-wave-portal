// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    /*
     * Key-value pair to keep track of who sent a wave
     */
    mapping(address => uint256) public addressToWaves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved
        string message; // The message the user sent
        uint256 timestamp; // The timestamp of when the user waved
    }

    /*
     * An array to hold all the wave structs -- track every wave
     */
    Wave[] waves;

    constructor() {
        console.log(
            "This is my smart contract. There are many like this. But, this one is mine."
        );
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        addressToWaves[msg.sender] += 1;
        console.log("%s has waved w/ message: %s", msg.sender, _message);

        /*
         * Storing the wave data in an array
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    /*
     * Returns the array of wave structs
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    // return amount of waves for an address
    function getAddressToWaves(address _address) public view returns (uint256) {
        console.log(
            "%s waved at us %d times!",
            _address,
            addressToWaves[_address]
        );
        return addressToWaves[_address];
    }
}
