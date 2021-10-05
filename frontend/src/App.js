import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  /*
  * State variable to store our user's public wallet
  */
  const [currentAccount, setCurrentAccount] = useState("");

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
          Wave at Me
        </button>)}
      </div>
    </div>
  );
}
