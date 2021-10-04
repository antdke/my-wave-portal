/*
* This script deploys to a persistent network. Rinkeby, Mainnet, Localhost
* If localhost, then with 20 usable account with 1000 ETH.
*/

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contract with account: ", deployer.address);
  console.log("Deployer balance: ", accountBalance.toString());

  const Token = await hre.ethers.getContractFactory('WavePortal');
  const portal = await Token.deploy();

  console.log("WavePortal address: ", portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();