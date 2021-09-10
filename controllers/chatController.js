let fs = require("fs")
let ChatMessage = require("../models/chatModel");




// DELETE ALL MESSAGES FROM DATABASE

let deleteAllMessages = async (req, res)=>{

    try{
       ChatMessage.deleteMany({}, (err)=>{
            if(err){
             res.json("Delete Unsuccesful")
            }else{
             res.json("Delete Succesful")
            }
        })
    }catch(err){
        res.json({"msg": "An Error Has Occured"})
    }
}

// FORMAT AND DOWNLOAD CHAT HISTOY TO .TXT FILE DOWLOADED THROUGH BROWSER

let downloadChat = async (req, res) =>{
   ChatMessage.find({}, (err, doc)=>{
       if(!err){
           let data = doc.map(item => `Date/Time: ${item.dateTime}, UserName: ${item.uname}, Message: ${item.message} \n \n`)
            fs.writeFile(__dirname  + '/chatHistory.txt', data.toString(), (err)=>{
              if(err){
                  console.log(err);
              }else{
                 res.download(__dirname  + '/chatHistory.txt')
              }
          }) 
       } else{
           res.send("Fail")
       }
    })
}



module.exports = {  downloadChat, deleteAllMessages }