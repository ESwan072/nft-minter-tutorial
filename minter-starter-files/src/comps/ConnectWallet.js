import { useState,useEffect } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import "../index.css";

const ConnWall = (props) => {
    const [walletAddress, setWallet] = useState(""); //string that stores user's wallet address
    const [status, setStatus] = useState(""); //contains a message to display at the bottom of the UI

    useEffect(async () => { //TODO: implement (done?) 
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status); 
    
        //wallet listener call
        addWalletListener();
    }, []);

    const connectWalletPressed = async () => { //TODO: implement (DONE?)
        const walletResponse = await connectWallet(); //walletResponse takes function output
        setStatus(walletResponse.status);
        setWallet(walletResponse.address); //call specific attribute from 
    };

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


    return (
        <div className="ConnWall">
            <button height="15" id="walletButton" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
            ) : (<span>Connect Wallet</span>)}
            </button>
        </div>
    )
}

export default ConnWall;