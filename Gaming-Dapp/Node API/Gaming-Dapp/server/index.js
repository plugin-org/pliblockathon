const express = require("express")
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors())

app.post("/sendEth", (req,res,next)=>{
    res.send({url: "http://localhost:5500/index.html?toaccount="+req.body.account+"&value="+req.body.value});
    next();
})
app.listen(4000, ()=>{
    console.log("This is the REDIRECT server at 4000");
})