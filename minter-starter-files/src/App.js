import './App.css';
import Minter from './comps/MinterButton'
import UploadComp from './comps/UploadComponent';
import NameDescrip from './comps/NameDescrip';
import ConnWall from './comps/ConnectWallet';
import { useState } from 'react';


//this is the main component (acts as a container for all other components)
//parent
function App() {
    //to interact with NameDescrip
    const [nftName, setNftName] = useState('');
    const [NftDescription, setNftDescription] = useState('');
    //to interact with uploader
    const [assetURL,setUrl] = useState('');
    //result of the minting press and some other functions
    const [Status,setStatus] = useState('');

    //pulling data from NameDescrip (seems to work)
    const takeName = (name) => {
      setNftName(name);
      console.log(nftName);
    }
    const takeDescrip = (description) => {
      setNftDescription(description);
      console.log(NftDescription);
    }

    //pulling data from UploadComponent
    const takeImageUrl = (imgURL) => {
      setUrl(imgURL);
      console.log(assetURL);
    }

    //getting the status from the minting button
    const takeStatus = (status) =>{
        setStatus(status);
        console.log(Status)
    }

      //The order of children
      //1:connect
      //heading
      //2:uploader
      //3:name & description
      //4:mint
  return ( //all components injected below and some visuals (like status) are handled below
    <div className="App">
      <div className="AppBody">
        {/*child 1*/}
        <ConnWall/>
        <br></br>
        <h1>NFT Minter</h1>
        {/*child 2*/}
        <UploadComp takeImageUrl = {takeImageUrl}/>
        {/*child 3*/}
        <NameDescrip takeName={takeName} takeDescrip={takeDescrip}/>
        {/*child 4*/}
        <Minter url = {assetURL} name = {nftName} description = {NftDescription} takeStatus={takeStatus} />
        {Status}
      </div>
    </div>
  );
}

export default App;
