require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.MAINNET_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};


// WavePortal contract address: 0xcb245b9A55E320219A1B33Ef019691fC9D4c2493
/*
* WHENEVER I UPDATE CONTRACT:
*
* 1) Redeploy: npx hardhat run scripts/deploy.js --network rinkeby
*
* 2) Update the contract address (above and in App.js) with new address shown in terminal
*
* 3) Use this terminal command FROM FRONTEND FOLDER to replace ABI:
* cp ../artifacts/contracts/WavePortal.sol/WavePortal.json ./src/utils/
*/