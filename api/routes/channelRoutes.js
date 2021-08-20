const express = require("express");
const router = express.Router();
const radioController = require("../controllers/radioController");




router.get("", radioController.getAllChannels);
router.get("/schedule/:channelId", radioController.getSchedule);
router.get("/category/:channelId", radioController.getCategoryById);
router.get("/channels/:channelId", radioController.getChannelById);
router.get("/programs/:channelId", radioController.getProgramById);

module.exports = router;
