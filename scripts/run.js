const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); // get fake accounts?
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy(); // this deploys to local blockchain
  await waveContract.deployed();


  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);



  // testing/playing with WavePortal's functions below
  let waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
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