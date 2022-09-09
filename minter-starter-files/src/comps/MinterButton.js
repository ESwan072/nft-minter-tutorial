import { useEffect, useState } from "react";
import { 
  connectWallet, 
  getCurrentWalletConnected, 
  mintNFT } from "../utils/interact";
import {FileUpload} from 'react-ipfs-uploader';
import UploadComp from "./UploadComponent";
//PROBLEMS:
//ConnectWallet might be broken, could also be a hardware issue my side - E


const Minter = ({url,name,description,takeStatus}) => {
  const Url = url;
  const Name = name;
  const Description = description

  //check to see if data is passed
  console.log(Url);
  console.log(Name);
  console.log(Description);
  //

  //this function will be called to mint the user's NFT.
  const onMintPressed = async () => { //TODO: implement (largely done, changes need to be made)
    const { status } = await mintNFT(Url,Name,Description);
    takeStatus(status);
    console.log(status);
    console.log(Url);
    console.log(Name);
    console.log(Description);
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
