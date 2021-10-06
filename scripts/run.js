/* 
* This script creates a temp local network to run the code line by line
* to see how it works. Then it destroys that local network immediately after.
*/

const main = async () => {

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy(); // this deploys to local blockchain
  await waveContract.deployed();


  console.log("Contract deployed to:", waveContract.address);



  // testing/playing with WavePortal's functions below
  let waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  let waveTxn = await waveContract.wave('A message!');
  await waveTxn.wait();

  const [_, randomPerson] = await hre.ethers.getSigners(); // get fake accounts?
  waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

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