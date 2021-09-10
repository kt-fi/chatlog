
let questions = [
    {q: 1,
    question: "What is your email?"},
    {q: 2,
    question: "What would you like to talk about?",
    a1: "Our Products?",
    a2: "Our Services?",
    a3:  "Work With Us?"},
    {q: 3,
    question: "When should we contact you?",
    a1: "Monday?",
    a2: "Tuesday?",
    a3:  "Wednesday?",
    a4:  "Thursday?",
    a5:  "Friday?"},
]
let i = 0;
let askQuestion = () => {
   
    let d = new Date();
    let message = {
        uname: "Server",
        dateTime: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${d.toLocaleTimeString()}`,
        message: questions[i]
    }

    io.emit("serverResponse", message)
    i = i + 1;
}

module.exports = {askQuestion}