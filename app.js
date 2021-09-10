let express = require("express");
let app = express();
let http = require("http").Server(app);
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
global.io = require('socket.io')(http);

let askQuestion = require("./serverResponse")
let ChatMessage = require("./models/chatModel.js")

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
    let d = new Date()
    let n = 0;
    socket.on("msgClient", async (message)=>{
        let newMessage = await new ChatMessage({ 
            uname: "You",
            dateTime: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`,
            message
    })
        await newMessage.save((err, doc)=>{
            if(!err){
                io.emit("addToChat", doc);
                
                setTimeout(()=>{
                    askQuestion.askQuestion()
                },2000)
            }else{
            console.log({"msg":"This Message could not be sent, please try again!!"})
        }
    })
})
})





// Listen for server port
http.listen(9090, ()=>{
    console.log("Listening on Port: 9090");
})
