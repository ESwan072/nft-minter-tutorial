const NameDescrip = ({takeName,takeDescrip}) => {
    return(
        <div className="NameDescrip">
            <h2>Name: </h2>
            <input
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => takeName(event.target.value)}
            />
            <h2>Description: </h2>
            <input
            type="text"
            placeholder="e.g. Even cooler than cryptokitties ;)"
            onChange={(event) => takeDescrip(event.target.value)}
            />
        </div>  
    )
}

export default NameDescrip;