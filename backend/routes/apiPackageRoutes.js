/*
File containing routes for our RESTful API endpoints for A2.
*/
const express = require("express");
const packageCont = require("../controllers/apiPackageCont");
const authMiddleware = require("../utils/apiAuthMiddleware");

const router = express.Router();

router.get("/", authMiddleware, packageCont.listPackages);

router.post("/add", authMiddleware, packageCont.addPackage);

router.delete("/delete", authMiddleware, packageCont.deletePackage);

router.put("/update", authMiddleware, packageCont.updatePackage);

module.exports = router;