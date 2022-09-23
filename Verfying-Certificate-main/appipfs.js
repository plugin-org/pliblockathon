const { create } = require("ipfs-http-client"); //import create function , require library
const fs=require("fs")  //require local file system
async function ipfsClient() {      //async will have a return value(promise)
    const ipfs = await create(
        {
            host: "ipfs.infura.io",  //remote ipfs node
            port: 5001,
            protocol: "https"
        }
    ); //await - used inside async which makes program wait until Promise returns
    return ipfs
}

async function saveText() { 
    let ipfs = await ipfsClient();  //instance of ipfs
   // let hello = await ipfs.add("hello");
    let result = await ipfs.add(`welcome ${new Date()} hello`);   //store data to ipfs   
    console.log(result);
}
saveText();
/*
async function saveFileTXT(){
    let ipfs = await ipfsClient();
    let result = await ipfs.add({path:"abc.txt",content:"hello ipfs"}); //content : content inside file
    console.log(result)
}
//saveFileTXT()
//saveFileJSON()
async function saveFileJSON() {
    let ipfs = await ipfsClient();
    let data = fs.readFileSync("./package.json");
    let options = {
        //wrapWithDirectory:true,
        wrapWithDirectory: false, //for fs
        progress: (prog) => console.log(`Saved :${prog}`) //profress:function (returns progress - how much file has been uploaded)
    };
    //let result = await ipfs.add({path:"abc.json",content:JSON.stringify(data)}); 
    //let result = await ipfs.add({ path: "abc.json", content: JSON.stringify(data) }, options);
    let result = await ipfs.add(data, options);
    console.log(result);
}
//saveFileJSON()
    

async function getData(hash){
    let ipfs = await ipfsClient();
    let asyncitr = ipfs.get(hash) //ipfs.cat(hash)
    for await(const itr of asyncitr){
        //console.log(itr)
        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}
//getData("QmXgNuhD2Jo8KFHCkuXLnfuHsG6ZubgB5yqinro6XekN6p")//("....copy the hash") 
*/
