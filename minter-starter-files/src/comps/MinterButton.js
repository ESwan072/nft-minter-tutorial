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
  const url = props.url;
  const name = props.name;
  const description = props.description

  //this function will be called to mint the user's NFT.
  const onMintPressed = async () => { //TODO: implement (largely done, changes need to be made)
    const { status } = await mintNFT(url,name,description);
    //setStatus(status);
  };


  //ui component
  return (
    <div className="Minter">
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
    </div>
  );
};

export default Minter;
