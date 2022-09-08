import { useEffect, useState } from "react";
import { 
  connectWallet, 
  getCurrentWalletConnected, 
  mintNFT } from "../utils/interact";
import {FileUpload} from 'react-ipfs-uploader';
import UploadComp from "./UploadComponent";
//PROBLEMS:
//ConnectWallet might be broken, could also be a hardware issue my side - E


const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState(""); //string that stores user's wallet address
  const [status, setStatus] = useState(""); //contains a message to display at the bottom of the UI
  const [name, setName] = useState(""); //string Stores the NFT name
  const [description, setDescription] = useState(""); //string stores description 
  const [url, setURL] = useState("");// a string that is the link to the digital asset (image)
  const [fileUrl, setFileUrl] = useState('') 
 
  // react hook called after component is rendered, only on 1st render
  //call our wallet listener and another wallet function to update our UI to reflect whether a wallet is already connected
  useEffect(async () => { //TODO: implement (done?) 
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 

    //wallet listener call
    addWalletListener();
  }, []);
  //this function will be called to connect the user's Metamask wallet to our dApp.
  const connectWalletPressed = async () => { //TODO: implement (DONE?)
    const walletResponse = await connectWallet(); //walletResponse takes function output
    setStatus(walletResponse.status);
    setWallet(walletResponse.address); //call specific attribute from 
  };
  //this function will be called to mint the user's NFT.
  const onMintPressed = async () => { //TODO: implement (largely done, changes need to be made)
    const { status } = await mintNFT(url,name,description);
    setStatus(status);
  };

  //add a wallet listener
  function addWalletListener() {
    if (window.ethereum) { //if metamask is installed
      window.ethereum.on("accountsChanged", (accounts) => { //when accounts change
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else { //if metamask not installed
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  //ui component
  return (
    <div className="Minter">
       <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>
      <h1 id="title">NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <p id="status">
        {status}
      </p>
      {/* <form>
        <h2>Asset Upload</h2>
        <UploadComp></UploadComp>
        <h2>Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form> */}
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
    </div>
  );
};

export default Minter;
