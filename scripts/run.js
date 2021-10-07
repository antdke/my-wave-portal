/* 
* This script creates a temp local network to run the code line by line
* to see how it works. Then it destroys that local network immediately after.
*
* It's like a testing ground
*/

const main = async () => {

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  }); // this deploys to local blockchain
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);



  // testing/playing with WavePortal's functions below

  /*
  * Get contract balance
  */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    'Contract Balance',
    hre.ethers.utils.formatEther(contractBalance)
  )

  /*
  * Send wave
  */
  let waveTxn = await waveContract.wave("A message from Anthony! :)");
  waveTxn.wait();

  /*
  * Get wave contract balance to see what happens
  */
  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    'Contract Balance',
    hre.ethers.utils.formatEther(contractBalance)
  )

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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