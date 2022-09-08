import { useState } from "react";


const NameDescrip = (props) => {
    const [name, setName] = useState(""); //string Stores the NFT name
    const [description, setDescription] = useState(""); //string stores description 

    return(
        <div className="NameDescrip">
            <h2>Name: </h2>
            <input
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => setName(event.target.value)}
            />
            <h2>Description: </h2>
            <input
            type="text"
            placeholder="e.g. Even cooler than cryptokitties ;)"
            onChange={(event) => setDescription(event.target.value)}
            />
        </div>  
    )
}

export default NameDescrip;