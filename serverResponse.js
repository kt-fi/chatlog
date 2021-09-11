let ChatMessage = require("./models/chatModel")

// Array to collect responses for personalised final message
let responses = []

//preset server replies
let questions = [
    {q: 0,
    question: "Hi How Are You?"},
    {q: 1,
    question: "What is your email Address?"},
    {q: 2,
    question: "What would you like to talk about?",
     answers: ["Our Products","Our Services","Work With Us"]},
    {q: 3,
    question: "When is a good day to contact you?",
    answers: ["Monday","Tuesday","Wednesday","Thursday", "Friday"]},
    {q: 4,
        question: "What time should we message you?",
        answers: ["9am-11am","11am-2pm","2pm-6pm","6pm-8pm"]},
    {q: 5,
        question: "Thankyou for contacting us we will be in touch shortly!!"
        }
]



let i = 0;
let length = questions.length;

//provide the responses to the app.js
let askQuestion = async () => {

    let d = new Date()
    let dateTime = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`
    let message = {
        uname: "Server",
        dateTime,
        message: questions[i]
    }

    let signOffMessage = {
        uname: "Server",
        dateTime,
        message: {question: `Thankyou for contacting us ${responses[0]} we will contact you at ${responses[5]} on ${responses[4]}, thankyou for your time!!`}
    }
    
    if(responses.length == 6){
        io.emit("signoff", signOffMessage)
    }
   let newMessage = await new ChatMessage({
        uname: "Server",
        dateTime,
        message: questions[i].question
    })
    newMessage.save()

    io.emit("serverResponse", message)
        
    i = i + 1;  
}

module.exports = {askQuestion, responses}