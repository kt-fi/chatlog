let express = require("express");

let chatController = require("../controllers/chatController");

let router = express.Router();

// ROUTERS FOR CHAT RELATED ENDPOINTS

router.delete("/deleteAllMessages", chatController.deleteAllMessages)
router.get("/downloadChatHistory", chatController.downloadChat)


module.exports = router;