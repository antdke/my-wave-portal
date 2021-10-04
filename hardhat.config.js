require("@nomiclabs/hardhat-waffle");

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
      url: 'https://eth-rinkeby.alchemyapi.io/v2/8LJ50qkZ_qAze1W0wJxzo7o7K6VqonMm',
      accounts: ['31a7b35103c6a75aab1dc67c08e4c4274121445e9409fe69102239de2cd10463'],
    },
  },
};

// WavePortal contract address: 0x0A02d3F51CF74161877BFDe332F96dFa5B46975E
