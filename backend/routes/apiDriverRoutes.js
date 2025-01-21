/*
File containing routes for our RESTful API endpoints for A2.
*/
const express = require("express");
const driverCont = require("../controllers/apiDriverCont");
const authMiddleware = require("../utils/apiAuthMiddleware");

const router = express.Router();

router.get("/", authMiddleware, driverCont.listDrivers);

router.post("/add", authMiddleware, driverCont.addDriver);

router.delete("/delete", authMiddleware, driverCont.deleteDriver);

router.put("/update", authMiddleware, driverCont.updateDriver);

router.get("/get", authMiddleware, driverCont.getDriver);

module.exports = router;