let ChatMessage = require("./models/chatModel")

let questions = [
    {q: 1,
    question: "What is your email?"},
    {q: 2,
    question: "What would you like to talk about?",
     answers: ["Our Products","Our Services","Work With Us"]},
    {q: 3,
    question: "When should we contact you?",
    answers: ["Monday","Tuesday","Wednesday","Thursday", "Friday"]},
    {q: 4,
        question: "Thankyou we will be in touch shortly!!"
        }
]
let i = 0;
let askQuestion = async () => {
  
    let d = new Date();
    let message = {
        uname: "Server",
        dateTime: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`,
        message: questions[i]
    }

   let newMessage = await new ChatMessage({
        uname: "Server",
        dateTime: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`,
        message: questions[i].question
    })
    newMessage.save()

    io.emit("serverResponse", message)
    if(i > questions.length){
        io.emit("serverResponse", "We will be in touch shortly")
    }else{
         i = i + 1; 
    }
        
}

module.exports = {askQuestion}