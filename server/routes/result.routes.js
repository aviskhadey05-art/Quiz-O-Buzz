const express = require("express");

const router = express.Router();

const resultController = require("../controllers/result.controller");

router.post("/", resultController.saveResult);
router.get("/", resultController.getResults);

module.exports = router;