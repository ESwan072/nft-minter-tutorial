//this file is functionally the backend of the mintung function of the app

//BE AWARE:
//objects being returned are json objects

//POTENTIAL PROBLEMS:
//currently configured for eth, needs to be updated to work with polygon.
//connectWallet only has status and FIRST wallet address (may need a fix, might just be how to handle metamask connections)

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

//this may need a change with a new contract
const contractABI = require('../contract-abi.json')
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

//image (or image data) hosting
//may need to be changed after sponsor feedback
import { pinJSONToIPFS } from './pinata';

//handles wallet connection
export const connectWallet = async () => {
    if (window.ethereum) { //check if user has metamask installed
      try {
        const addressArray = await window.ethereum.request({ method: "eth_requestAccounts",});
        //function that opens metamask and prompts user to connect their wallet, method returns an array of account addresses
        const obj = {
          status: "Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) { //error in case something goes wrong or user decides not to connect
        return {
          address: "",
          status: "Error: " + err.message,
        };
      }
    } else { //this is if there is no metamask connection, get user to install metamask
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              {" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  //gets the currently connected account
  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });// main difference from connectWallet
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: " Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "Connect to Metamask first by using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "Error" + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  //This function is responsible for minting the NFT
  export const mintNFT = async (url,name,description) => {
    //error catching
    if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
      return {
       success: false,
       status: "Please complete all fields before minting",
      }
    }
    //format the data into a JSON object for pinJSONtoIPFS
    //may need a change with different image hosting format
    const metadataObject = new Object();
    metadataObject.name = name;
    metadataObject.image = url;
    metadataObject.description = description;

    //call to pinata
    const pinataResponse = await pinJSONToIPFS(metadataObject);
    //check for errors
    if (!pinataResponse.success) {
      return{
        success: false, status: "Something went wrong while uploading your TokenURI",
      }
    }
    const TokenURI = pinataResponse.pinataUrl;
    
    //loading the smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);

    //set up transaction (currently configured for ETH)
    const transactionParameters = {
      //required except in publications
      to: contractAddress,
      //needs to match the active address of the user
      from: window.ethereum.selectedAddress, 
      //make a call to the smart contract
      'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, TokenURI).encodeABI() 
    };

    //sign transaction via metamask
    try{
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
      return{
        success: true,
        //need to change from ropsten (deprecated) to goerli
        status: "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
      }
    }catch (error) {
      return{success: false, status: "Something went wrong: "+error.message}
    }
  }