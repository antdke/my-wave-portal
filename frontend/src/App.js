import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal.json'

export default function App() {
  /*
  * State variable to store our user's public wallet
  */
  const [currentAccount, setCurrentAccount] = useState("");

  /*
  * State variable to store count of total waves
  */
  const [waveCount, setWaveCount] = useState(0);

  /*
  * State variable to track loading
  */
  const [isLoading, setIsLoading] = useState(false);

  /*
  * Address of my WavePortal contract on the Rinkeby testnet
  */
  const contractAddress = '0x0A02d3F51CF74161877BFDe332F96dFa5B46975E';

  /*
  * A variable that references to the ABI
  */
  const contractABI = abi.abi;

  /*
  * This function tells us, in the console, if a wallet with eth accounts exists
  */
  const checkIfWalletIsConnected = async () => {
    try {
      /*
      * First, make sure we have access to window.ethereum
      */
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!")
        return
      } else {
        console.log("We have the ethereum object:", ethereum)
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*
  * Connect wallet method
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * This makes MetaMask pop up - Requests user connect wallet to site
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      // Check if MetaMask is in the browser
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        /*
        * Contract address and ABI are used here
        */
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        // Send trx to contract and log results to console to test
        let count = await wavePortalContract.getTotalWaves();
        setWaveCount(parseInt(count));
        console.log("Recieved total wave count...", count.toNumber());

        /*
        * Execute a wave from the smart contract
        */
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        setIsLoading(true); // mining is happening

        await waveTxn.wait();
        console.log("Mined --", waveTxn.hash);
        setIsLoading(false);

        count = await wavePortalContract.getTotalWaves();
        setWaveCount(parseInt(count));
        console.log("Recieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!")
      }

    } catch (error) {
      console.log(error)
    }
  }

  /*
  * This is for the text under the button when the transaction is loading/being mined
  */
  let waveText;
  if (isLoading) {
    waveText = (<div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>)
  } else {
    waveText = (<div className="waveCountText">(Total # of waves: {waveCount})</div>)
  }


  /*
  * Run function when page loads
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I'm Anthony :)
        </div>

        {/*
        * If there is no current wallet, then render this button
        */}
        {!currentAccount && (<button className="waveButton" onClick={connectWallet}>
          Connect Wallet
        </button>)}
        <button className="connectWalletButton" onClick={wave}>Wave at Me</button>
        {waveText}
      </div>
    </div>
  );
}
