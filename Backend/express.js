const express = require("express");
const port = 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const rootRouter = require("./routes/index")



app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true
}));
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1",rootRouter);


app.get("/",(req,res)=>{
    res.send("testing");
})

app.listen(port,()=>{
    console.log(`Port is listening at ${port}`);
    
})