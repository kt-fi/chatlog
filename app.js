let express = require("express");
let app = express();
let http = require("http").Server(app);
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
global.io = require('socket.io')(http);

let chatRouter = require("./routers/chatRouter");
let serverResponse = require("./serverResponse")

let ChatMessage = require("./models/chatModel.js")

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(__dirname + "/public"))


// Set Up and connect to Database
let dbUrl = "mongodb://localhost:27017/chatDev"

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Mongo db connected");
})


//Get Home Page
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

app.use("/chat", chatRouter)



// CONNECT to socket.io, On newMessage.save() starts a loop for the conversation
io.on("connection", (socket)=>{
    let d = new Date()
    let message = {
        uname: "Server",
        dateTime: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`,
        message: {question:"Hi welcome to our website!! What is your name?"}
    }
    socket.emit("serverConnected", message )

    socket.on("msgClient", async (message)=>{
        let newMessage = await new ChatMessage({ 
            uname: "You",
            dateTime: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`,
            message
    })
        await newMessage.save((err, doc)=>{
            if(!err){
                io.emit("addToChat", doc);
                serverResponse.responses.push(message)
                setTimeout(()=>{
                    serverResponse.askQuestion()
                },1500)
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


