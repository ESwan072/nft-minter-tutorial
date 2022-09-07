import './App.css';
import Minter from './Minter'
//import SendFileToIPFS from './utils/cheekyUploadComponent';
import UploadComp from './utils/cheekyUploadComponent';

//this is the main component (acts as a container for all other components)
function App() {
  return ( //minter component injected below
    <div className="App">
      <Minter></Minter>
    </div>
  );
}

export default App;
