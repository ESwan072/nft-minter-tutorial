import './App.css';
import Minter from './comps/MinterButton'
import UploadComp from './comps/UploadComponent';
import NameDescrip from './comps/NameDescrip';
import ConnWall from './comps/ConnectWallet';


//this is the main component (acts as a container for all other components)
function App() {
  const state = 
      {
        nftName:"",
        nftDescription:"",
        nftUrl:""
      }


      //order
      //connect
      //heading
      //uploader
      //name & description
      //mint
  return ( //all components injected below and some visuals (like status) are handled below
    <div className="App">
      <div className="AppBody">
      <ConnWall></ConnWall>
      <br></br>
      <h1> heading </h1>
      <UploadComp></UploadComp>
      <NameDescrip></NameDescrip>
      <Minter></Minter>
      </div>
    </div>
  );
}

export default App;
