const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/profile", profileController.createProfile);
router.get("/profile/:id", profileController.getProfile);
router.delete("/profile/:id",profileController.deleteProfile)
module.exports = router;
