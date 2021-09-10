let mongoose = require("mongoose");

// MODEL FOR CHAT MESSAGES

let Schema = mongoose.Schema;

let chatMessageSchema = new Schema({
    uname: {type: String, require: true},
    dateTime: {type: String, require: true},
    message: {type: String, require: true}
})

let ChatMessage = mongoose.model("chatMessage", chatMessageSchema);

module.exports = ChatMessage;