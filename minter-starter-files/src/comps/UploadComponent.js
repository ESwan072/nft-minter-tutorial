import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import "./comps.css"


function UploadComp({takeImageUrl}) {

  const [file, setFile] = useState()
  const [myipfsHash, setIPFSHASH] = useState('')
  const [imgURL, setURL] = useState("");// a string that is the link to the digital asset (image)
  const handleFile=async (fileToHandle) =>
    {
        console.log('starting')
        // initialize the form data
        const formData = new FormData()
        // append the file form data to 
        formData.append("file", fileToHandle)
        // call the keys from .env
        //issue calling data from .env
        const API_KEY =    process.env.REACT_APP_PINATA_KEY      //'8217ce55e5b493cd1a12' 
        const API_SECRET = process.env.REACT_APP_PINATA_SECRET   //'f508c142723acf68dde5b044416d62b093fe9394fae891d4dac2f60a60a0a5d8' 
        // the endpoint needed to upload the file
        const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`
        const response = await axios.post(
            url,
            formData,
            {
                maxContentLength: "Infinity",
                headers: {
                    "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': API_SECRET

                }
            }
        )
        console.log(response)
        console.log(myipfsHash)
        // get the hash
        setIPFSHASH(response.data.IpfsHash)
        let a = "https://gateway.pinata.cloud/ipfs/";
        let thissolutionisdumb = a.concat(myipfsHash);
        setURL(thissolutionisdumb);
        takeImageUrl(imgURL)
    }
  return (
    <div className="CompUploader">
      <input type="file" onChange={(event)=>setFile(event.target.files[0])}/>
      <button onClick={()=>handleFile(file)}>Pin</button>
      <br></br>
    {
      //  render the hash
      myipfsHash.length > 0 && <img height='200' src={`https://gateway.pinata.cloud/ipfs/${myipfsHash}`} alt='not loading'/>
    }
    <br></br>
    <a href= {imgURL}>Link to your Asset</a>
    </div>
  );
}

export default UploadComp;