let mongoose = require("mongoose");

// MODEL FOR Questions MESSAGES

let Schema = mongoose.Schema;

let questionsSchema = new Schema({
    question: {type: String, require: true},
    answers: [{type: String, require: true}]
    
})

let Questions = mongoose.model("questions", questionsSchema);

module.exports = Questions;