import { useEffect, useState } from "react";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState(""); //string that stores user's wallet address
  const [status, setStatus] = useState(""); //contains a message to display at the bottom of the UI
  const [name, setName] = useState(""); //string Stores the NFT name
  const [description, setDescription] = useState(""); //string stores description 
  const [url, setURL] = useState("");// a string that is the link to the digital asset (image)
 
  // react hook called after component is rendered, only on 1st render
  //call our wallet listener and another wallet function to update our UI to reflect whether a wallet is already connected
  useEffect(async () => { //TODO: implement
    
  }, []);
  //this function will be called to connect the user's Metamask wallet to our dApp.
  const connectWalletPressed = async () => { //TODO: implement
   
  };
  //this function will be called to mint the user's NFT.
  const onMintPressed = async () => { //TODO: implement
    
  };

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
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)} //when new stuff is typed in, set url to that string value 
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
