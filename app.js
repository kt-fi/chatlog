let express = require("express");
let app = express();
let http = require("http").Server(app);
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let io = require('socket.io')(http);

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(__dirname + "/public"))


// Set Up and connect to Database
let dbUrl = "mongodb://localhost:27017/chatDev"

mongoose.connect(dbUrl, ()=>{
    console.log("Mongo db connected");
})


//Get Home Page
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
})



// CONNECT to socket.io
io.on("connection", (socket)=>{
    console.log("Connected Client")
})




// Listen for server port
http.listen(9090, ()=>{
    console.log("Listening on Port: 9090");
})
