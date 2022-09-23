import { useState } from 'react'
import { create as ipfsHttpClient } from "ipfs-http-client";
import './App.css';


// insert your infura project crediental you can find 
// easily these your infura account in API key management section
const projectId = "2EqUYbenG4nsIcKlBLxnsDkm0vB"
const projectSecretKey = "85811c6157e70693179976335020d1d7"
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

function App() {

  const [images, setImages] = useState([])
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
  })
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);
    console.log(result.path);
    console.log(result.cid);
   
    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);
    
    form.reset();
  };

  return (
    <div className="App">
      {ipfs && (
        <>
          <h3>Upload file to IPFS</h3>
          <form onSubmit={onSubmitHandler}>
            <input type="file" name="file" />
            <button type="submit">Upload file</button>
          </form>
        </>
      )}

      <div>
        {images.map((image, index) => (
          <img
            alt={Uploaded #${index + 1}}
            src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
        ))}
      </div>
    </div>
  )
}

export default App