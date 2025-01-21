/*
Router for our authentication stuff for our API endpoints.
*/

const express = require("express");
const router = express.Router();
const authController = require("../controllers/apiAuthCont");

// Sending a sign up message
router.get("/signin", async (req, res) => {
    res.send("Sign Up Please.");
});

router.post("/login", authController.login);

router.post("/signup", authController.signUp);

module.exports = router;