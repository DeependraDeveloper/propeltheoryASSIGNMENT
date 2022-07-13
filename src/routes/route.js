const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/profile", profileController.createProfile);        // create
router.get("/profile/:id", profileController.getProfile);        // read
router.patch("/profile/:id", profileController.updateProdfile);  // update
router.delete("/profile/:id", profileController.deleteProfile);  // delete

module.exports = router;
