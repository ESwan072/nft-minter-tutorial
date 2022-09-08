import './App.css';
import Minter from './comps/MinterButton'
import UploadComp from './comps/UploadComponent';
import NameDescrip from './comps/NameDescrip';

//this is the main component (acts as a container for all other components)
function App() {
  state = 
      {
        nftName:"",
        nftDescription:"",
        nftUrl:""
      }


  return ( //all components injected below and some visuals (like status) are handled below
    <div className="App">
      {/*<Minter></Minter>*/}
      {/*<UploadComp></UploadComp>*/}
      {/*<NameDescrip></NameDescrip>*/}
    </div>
  );
}

export default App;
