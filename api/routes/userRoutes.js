const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.post("/addChannelToFavorite", userController.addChannelToFavorite);
router.post("/addProgramToFavorite", userController.addProgramToFavorite);
router.get("/getFavoriteChannels", userController.getFavoriteChannels);
router.get("/getFavoritePrograms", userController.getFavoritePrograms);
router.delete("/deleteFavorite/:id", userController.deleteFavorite);
router.delete("/deleteFavoriteProgram/:id", userController.deleteFavoriteProgram);


module.exports = router;
