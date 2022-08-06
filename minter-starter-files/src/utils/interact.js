//this file is functionally the backend of the mintung function of the app

//BE AWARE:
//objects being returned are json objects

//POTENTIAL PROBLEMS:
//currently configured for eth, needs to be updated to work with polygon.
//connectWallet only has status and FIRST wallet address

export const connectWallet = async () => {
    if (window.ethereum) { //check if user has metamask installed
      try {
        const addressArray = await window.ethereum.request({ method: "eth_requestAccounts",});//function that opens metamask and prompts user to connect their wallet, method returns an array of account addresses
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) { //error in case something goes wrong or user decides not to connect
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else { //this is if there is no metamask connection, get user to install metamask
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