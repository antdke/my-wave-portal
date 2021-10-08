// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    /*
     * A variable to help generate a random number
     */
    uint256 private seed;

    /*
     * Key-value pair to keep track of who sent a wave
     */
    mapping(address => uint256) public addressToWaves;

    /*
     * Key-value pair to keep track of the last time each user waved
     * -- they have to wait 15m between each wave to prevent spamming
     */
    mapping(address => uint256) public lastWavedAt;

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

    constructor() payable {
        console.log(
            "This is my smart contract. There are many like this. But, this one is mine."
        );
    }

    function wave(string memory _message) public {
        // Make sure that the user has waited at least 15 between their waves
        require(
            lastWavedAt[msg.sender] + 1 minutes < block.timestamp,
            "Must wait 1 minute before waving again!"
        );

        // Update this user's last wave timestamp
        lastWavedAt[msg.sender] = block.timestamp;

        // increment total wave count by 1
        totalWaves += 1;
        // attribute that wave to the address that waved and store that data in the map
        addressToWaves[msg.sender] += 1;
        // console log who waved and their wave message
        console.log("%s has waved w/ message: %s", msg.sender, _message);
        // Storing the wave message in an array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Generates a psuedo random number between 0 and 100.
        uint256 randomNumber = (block.timestamp + block.difficulty + seed) %
            100;
        console.log("Random # generate: %d", randomNumber);

        // Sets the random generated number as the seed for the next random number -- clever
        seed = randomNumber;

        // Gives the user a 25% chance that they'll win the 0.0001 ETH
        if (randomNumber < 25) {
            console.log("%s won!", msg.sender);

            // GIVING PEOPLE FREE $ FOR WAVING AT ME
            uint256 prizeAmount = 0.0001 ether; // about $0.31
            // Requires that the free money is only given out if this contract has enough funds
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than this contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}(""); // this pays the user
            require(success, "Failed to withdraw money from contract.");
        }

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
